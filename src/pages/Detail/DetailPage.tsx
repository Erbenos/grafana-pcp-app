import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup, Themeable, withTheme, Spinner } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css, cx } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { connect } from 'react-redux';

import {
  DetailPageContainer, DetailPageItem, DetailPageHeader, DetailPageTitle,
  DetailPageDescription, DetailPageFooter, DetailPageBtn, DetailPageSpinnerContainer, OtherMetaItemList, OtherMetaItem, OtherMetaItemTitle, OtherMetaItemValue
} from './styles';
import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers';
import { FetchStatus, EntityType } from 'actions/types';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.detail,
  isBookmarked: state.search.bookmarks.some(x => x.id === state.search.detail.item?.name)
});

const dispatchProps = {
  addBookmark,
};

type DetailPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & Themeable;

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
};

interface DetailPageState {
  selectedOption: EntityTabOpt,
  options: Array<SelectableValue<EntityTabOpt>>,
};

class DetailPage extends React.Component<DetailPageProps, DetailPageState> {
  state: DetailPageState = this.initialState;

  get initialState() {
    return {
      selectedOption: EntityTabOpt.OtherMeta,
      options: [
        { label: 'Other Meta', value: EntityTabOpt.OtherMeta },
        { label: 'Instance Domains', value: EntityTabOpt.InstanceDomains },
        // TODO: will we even render Labels
        // { label: 'Labels', value: EntityTabOpt.Labels },
      ],
    }
  }

  constructor(props: DetailPageProps) {
    super(props);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  get hasInstanceDomains() {
    const { entity } = this.props;
    if (entity.item !== null) {
      return entity.item.indom !== undefined;
    }
    return false;
  }

  handleBookmark() {
    const { props } = this;
    const { item } = props.entity;
    if (item) {
      const { name: id } = item;
      props.addBookmark({ id, type: EntityType.Metric });
    }
  }

  handlePreview() {
    console.log('previewEntity not implemented.');
  }

  renderSpinner() {
    if (this.props.entity.status === FetchStatus.PENDING) {
      console.log(this.props.theme.palette.black);
      return (
        <div className={cx(
          DetailPageSpinnerContainer,
          css`background-color: ${this.props.theme.colors.bg1}8f`
        )}>
          <Spinner size={40}/>
        </div>
      );
    }
    return;
  }

  renderDesc() {
    const { item } = this.props.entity;
    let description;
    if (item === null) {
      return;
    }
    if (item["text-help"]) {
      description = item["text-help"];
    } else if (item["text-oneline"]) {
      description = item["text-oneline"];
    }
    return (
      <div className={DetailPageDescription}>
        {description && <p>{description}</p>}
      </div>
    );
  }

  renderDetail() {
    const {
      props, state, renderEntityInfoTab,
      handleBookmark, handlePreview, setSelected,
      hasInstanceDomains, renderDesc
    } = this;
    const { isBookmarked, entity } = props;
    const { status, item } = entity;

    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (item !== null) {
          return (
            <article className={DetailPageItem}>
              <header className={DetailPageHeader}>
                <h2 className={DetailPageTitle}>
                  {item.name}
                </h2>
              </header>
              {renderDesc()}
              <footer className={DetailPageFooter}>
                <VerticalGroup spacing="lg">
                  <HorizontalGroup spacing="lg">
                    {!isBookmarked &&
                      <Button
                        variant="link"
                        size="md"
                        icon="save"
                        className={DetailPageBtn}
                        onClick={handleBookmark}>
                        Bookmark This Result
                      </Button>
                    }
                    <Button
                      variant="link"
                      size="md"
                      icon="chart-line"
                      className={DetailPageBtn}
                      onClick={handlePreview}>
                      Preview
                    </Button>
                  </HorizontalGroup>
                  {hasInstanceDomains &&
                    <div className={css`width: 100%`}>
                      <RadioButtonGroup
                        options={state.options}
                        disabled={false}
                        value={state.selectedOption}
                        onChange={setSelected}
                        size="md"
                        fullWidth
                      />
                    </div>
                  }                  
                  {renderEntityInfoTab()}
                </VerticalGroup>
              </footer>
            </article>
          );
        }
        if (status === FetchStatus.PENDING) {
          return (
            <p>Loading&hellip;</p>
          );
        }
        return (
          <p>Entity not found.</p>
        );
      }
      case FetchStatus.ERROR: {
        return (
          <p>Error fetching entity.</p>
        );
      };
    }
    return;
  }

  renderEntityInfoTab() {
    const { hasInstanceDomains, state, props } = this;
    const { selectedOption } = state;
    switch (selectedOption) {
      case EntityTabOpt.InstanceDomains:
        if (hasInstanceDomains) {
          return <InstanceDomainsTab/>;
        }
        break;
      case EntityTabOpt.Labels:
        if (hasInstanceDomains) {
          return <LabelsTab/>;
        }
        break;
      case EntityTabOpt.OtherMeta:
        if (props.entity.item === null) {
          return;
        }
        const { pmid, type, sem, units } = props.entity.item;
        return <OtherMetaTab pmid={pmid} type={type} sem={sem} units={units}/>;
    }
    return;
  }

  setSelected(selectedOption?: EntityTabOpt) {
    if (selectedOption) {
      this.setState({ selectedOption });
    };
  }

  render() {
    const {
      renderSpinner,
      renderDetail,
    } = this;
    return (
      <div className={DetailPageContainer}>
        {renderSpinner()}
        {renderDetail()}
      </div>
    );    
  }
}

class InstanceDomainsTab extends React.Component<{}, {}> {

  render() {
    return (
      <VerticalGroup spacing="lg">
        <h4>Instance Domains</h4>
        <ReactPlaceholder type="text" rows={3} ready={false}>
        </ReactPlaceholder>
      </VerticalGroup>
    );
  }
}

class LabelsTab extends React.Component<{}, {}> {

  render() {
    return (
      <VerticalGroup spacing="lg">
        <h4>Labels</h4>
        <ReactPlaceholder type="text" rows={5} ready={false}>
        </ReactPlaceholder>
      </VerticalGroup>
    );
  }
}

interface OtherMetaTabProps {
  pmid: string,
  type: string,
  sem: string,
  units: string,
}

class OtherMetaTab extends React.Component<OtherMetaTabProps, {}> {

  render() {
    const { pmid, type, sem, units } = this.props;
    return (
      <VerticalGroup spacing="lg">
        <h4>Other Meta</h4>
        <div className={OtherMetaItemList}>
          <div className={OtherMetaItem}>
            <span className={OtherMetaItemTitle}>
              PMID:
            </span>
            <span className={OtherMetaItemValue}>
              {pmid}
            </span>
          </div>
          <div className={OtherMetaItem}>
            <span className={OtherMetaItemTitle}>
              Type:
            </span>
            <span className={OtherMetaItemValue}>
              {type}
            </span>
          </div>
          <div className={OtherMetaItem}>
            <span className={OtherMetaItemTitle}>
              Semantics:
            </span>
            <span className={OtherMetaItemValue}>
              {sem}
            </span>
          </div>
          <div className={OtherMetaItem}>
            <span className={OtherMetaItemTitle}>
              Units:
            </span>
            <span className={OtherMetaItemValue}>
              {units}
            </span>
          </div>
        </div>
      </VerticalGroup>
    );
  }
}

export default withTheme(connect(
  mapStateToProps,
  { addBookmark }
)(DetailPage));

export { DetailPageProps };

import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup, Themeable, withTheme, Spinner } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css, cx } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { connect } from 'react-redux';

import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers/reducers';
import { FetchStatus, EntityType } from '../../actions/types';
import {
  otherMetaItem,
  otherMetaItemTitle,
  detailPageSpinnerContainer,
  detailPageDescription,
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageFooter,
  detailPageBtn,
  detailPageContainer,
  otherMetaItemList,
  otherMetaItemValue,
} from './styles';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.detail,
  isBookmarked: state.search.bookmarks.some(x => x.id === state.search.detail.item?.name),
});

const dispatchProps = {
  addBookmark,
};

type DetailPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & Themeable;

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
}

interface DetailPageState {
  selectedOption: EntityTabOpt;
  options: Array<SelectableValue<EntityTabOpt>>;
}

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
    };
  }

  constructor(props: DetailPageProps) {
    super(props);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  get hasInstanceDomains() {
    const { entity } = this.props;
    if (entity.item !== null) {
      return entity.item.indom !== undefined;
    }
    return false;
  }

  onBookmark() {
    const { props } = this;
    const { item } = props.entity;
    if (item) {
      const { name: id } = item;
      props.addBookmark({ id, type: EntityType.Metric });
    }
  }

  onPreview() {
    console.log('previewEntity not implemented.');
  }

  renderSpinner() {
    if (this.props.entity.status === FetchStatus.PENDING) {
      console.log(this.props.theme.palette.black);
      return (
        <div
          className={cx(
            detailPageSpinnerContainer,
            css`
              background-color: ${this.props.theme.colors.bg1}8f;
            `
          )}
        >
          <Spinner size={40} />
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
    if (item['text-help']) {
      description = item['text-help'];
    } else if (item['text-oneline']) {
      description = item['text-oneline'];
    }
    return <div className={detailPageDescription}>{description && <p>{description}</p>}</div>;
  }

  renderDetail() {
    const {
      props,
      state,
      renderEntityInfoTab,
      onBookmark,
      onPreview,
      setSelected,
      hasInstanceDomains,
      renderDesc,
    } = this;
    const { isBookmarked, entity } = props;
    const { status, item } = entity;

    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (item !== null) {
          return (
            <article className={detailPageItem}>
              <header className={detailPageHeader}>
                <h2 className={detailPageTitle}>{item.name}</h2>
              </header>
              {renderDesc()}
              <footer className={detailPageFooter}>
                <VerticalGroup spacing="lg">
                  <HorizontalGroup spacing="lg">
                    {!isBookmarked && (
                      <Button variant="link" size="md" icon="save" className={detailPageBtn} onClick={onBookmark}>
                        Bookmark This Result
                      </Button>
                    )}
                    <Button variant="link" size="md" icon="chart-line" className={detailPageBtn} onClick={onPreview}>
                      Preview
                    </Button>
                  </HorizontalGroup>
                  {hasInstanceDomains && (
                    <div
                      className={css`
                        width: 100%;
                      `}
                    >
                      <RadioButtonGroup
                        options={state.options}
                        disabled={false}
                        value={state.selectedOption}
                        onChange={setSelected}
                        size="md"
                        fullWidth
                      />
                    </div>
                  )}
                  {renderEntityInfoTab()}
                </VerticalGroup>
              </footer>
            </article>
          );
        }
        if (status === FetchStatus.PENDING) {
          return <p>Loading&hellip;</p>;
        }
        return <p>Entity not found.</p>;
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching entity.</p>;
      }
    }
    return;
  }

  renderEntityInfoTab() {
    const { hasInstanceDomains, state, props } = this;
    const { selectedOption } = state;
    switch (selectedOption) {
      case EntityTabOpt.InstanceDomains:
        if (hasInstanceDomains) {
          return <InstanceDomainsTab />;
        }
        break;
      case EntityTabOpt.Labels:
        if (hasInstanceDomains) {
          return <LabelsTab />;
        }
        break;
      case EntityTabOpt.OtherMeta:
        if (props.entity.item === null) {
          return;
        }
        const { pmid, type, sem, units } = props.entity.item;
        return <OtherMetaTab pmid={pmid} type={type} sem={sem} units={units} />;
    }
    return;
  }

  setSelected(selectedOption?: EntityTabOpt) {
    if (selectedOption) {
      this.setState({ selectedOption });
    }
  }

  render() {
    const { renderSpinner, renderDetail } = this;
    return (
      <div className={detailPageContainer}>
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
          &nbsp;
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
          &nsbp;
        </ReactPlaceholder>
      </VerticalGroup>
    );
  }
}

interface OtherMetaTabProps {
  pmid: string;
  type: string;
  sem: string;
  units: string;
}

class OtherMetaTab extends React.Component<OtherMetaTabProps, {}> {
  render() {
    const { pmid, type, sem, units } = this.props;
    return (
      <VerticalGroup spacing="lg">
        <h4>Other Meta</h4>
        <div className={otherMetaItemList}>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>PMID:</span>
            <span className={otherMetaItemValue}>{pmid}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Type:</span>
            <span className={otherMetaItemValue}>{type}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Semantics:</span>
            <span className={otherMetaItemValue}>{sem}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Units:</span>
            <span className={otherMetaItemValue}>{units}</span>
          </div>
        </div>
      </VerticalGroup>
    );
  }
}

export default withTheme(connect(mapStateToProps, { addBookmark })(DetailPage));

export { DetailPageProps };

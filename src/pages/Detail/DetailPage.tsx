import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup, Themeable, withTheme, Spinner } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css, cx } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { connect } from 'react-redux';

import {
  DetailPageContainer, DetailPageItem, DetailPageHeader, DetailPageTitle,
  DetailPageDescription, DetailPageFooter, DetailPageBtn, DetailPageSpinnerContainer
} from './styles';
import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers';
import { FetchStatus } from 'actions/types';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.detail,
  isBookmarked: state.search.bookmarks.some(x => x.entityId === state.search.detail.item?.entityId)
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
        { label: 'Labels', value: EntityTabOpt.Labels },
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
      return entity.item.indom !== 'PM_INDOM_NULL';
    }
    return false;
  }

  handleBookmark() {
    const { props } = this;
    const { item } = props.entity;
    if (item) {
      const { name, entityId } = item;
      props.addBookmark({ name, entityId });
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
    if (item.helptext) {
      description = item.helptext;
    } else if (item.oneline) {
      description = item.oneline;
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
                <h4 className={DetailPageTitle}>
                  {item.name}
                </h4>
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
    const { hasInstanceDomains, state } = this;
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
        return <OtherMetaTab/>;
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

function InstanceDomainsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Instance Domains</h4>
      <ReactPlaceholder type="text" rows={3} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function LabelsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Labels</h4>
      <ReactPlaceholder type="text" rows={5} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function OtherMetaTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Other Meta</h4>
      <ReactPlaceholder type="text" rows={4} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

export default withTheme(connect(
  mapStateToProps,
  { addBookmark }
)(DetailPage));

export { DetailPageProps };

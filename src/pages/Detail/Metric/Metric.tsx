import React from 'react';

import { EntityType, MetricDetailState, FetchStatus } from 'actions/types';
import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup, Spinner, Themeable, withTheme } from '@grafana/ui';
import {
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageFooter,
  detailPageBtn,
  radioBtnGroupContainer,
  detailPageDescription,
  detailPageSpinnerContainer,
} from '../styles';
import { SelectableValue } from '@grafana/data';
import { DetailEntityPageProps } from '../DetailPage';
import InstanceDomainTab from './InstanceDomainTab/InstanceDomainTab';
import OtherMetaTab from './OtherMetaTab/OtherMetaTab';
import { RootState } from 'reducers/reducers';
import { connect } from 'react-redux';
import LabelsTab from './LabelsTab/LabelsTab';
import { cx, css } from 'emotion';

const mapStateToProps = (state: RootState) => ({
  metric: (state.search.entity as MetricDetailState).metric,
  bookmarks: state.search.bookmarks,
});

type MetricDetailPageProps = ReturnType<typeof mapStateToProps> & DetailEntityPageProps & Themeable;

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
}

interface MetricDetailPageState {
  selectedOption: EntityTabOpt;
  options: Array<SelectableValue<EntityTabOpt>>;
}

class MetricDetailPage extends React.Component<MetricDetailPageProps, MetricDetailPageState> {
  state: MetricDetailPageState = this.initialState;

  get initialState() {
    return {
      selectedOption: EntityTabOpt.OtherMeta,
      options: [
        { label: 'Metric Metadata', value: EntityTabOpt.OtherMeta },
        { label: 'Instance Domain', value: EntityTabOpt.InstanceDomains },
        // TODO: will we even render Labels
        // { label: 'Labels', value: EntityTabOpt.Labels },
      ],
    };
  }

  constructor(props: MetricDetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderMetric = this.renderMetric.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  get hasInstanceDomain() {
    const { metric } = this.props;
    const { data } = metric;
    return !!data?.indom;
  }

  get isBookmarked() {
    const { metric, bookmarks } = this.props;
    return bookmarks.some(bookmark => metric.data?.name === bookmark.id && bookmark.type === EntityType.Metric);
  }

  setSelected(selectedOption?: EntityTabOpt) {
    if (selectedOption) {
      this.setState({ selectedOption });
    }
  }

  onBookmark() {
    const { metric } = this.props;
    const { data } = metric;
    if (data) {
      this.props.onBookmark({ id: data.name, type: EntityType.Metric });
    }
  }

  onPreview() {
    this.props.onPreview();
  }

  renderSpinner() {
    const { props } = this;
    const { metric, theme } = props;
    const { status } = metric;
    if (status === FetchStatus.PENDING) {
      return (
        <div
          className={cx(
            detailPageSpinnerContainer,
            css`
              background-color: ${theme.colors.bg1}8f;
            `
          )}
        >
          <Spinner size={40} />
        </div>
      );
    }
    return;
  }

  renderDetail() {
    const { props, renderMetric } = this;
    const { metric } = props;
    const { status, data } = metric;
    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Loading&hellip;</p>;
        }
        if (data === null) {
          return <p>Incorrect response</p>;
        }
        return renderMetric();
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching metric.</p>;
      }
    }
    return;
  }

  renderDesc() {
    const { metric } = this.props;
    const { data } = metric;
    if (!data) {
      return <p>Unable to render description.</p>;
    }
    let description = data['text-oneline'];
    if (data['text-help']) {
      description = data['text-help'];
    }
    return <div className={detailPageDescription}>{description && <p>{description}</p>}</div>;
  }

  renderMetric() {
    const {
      props,
      state,
      renderEntityInfoTab,
      onBookmark,
      onPreview,
      setSelected,
      hasInstanceDomain,
      renderDesc,
      isBookmarked,
    } = this;
    const { metric } = props;
    const { data } = metric;
    if (!data) {
      return <p>No metric.</p>;
    }
    return (
      <article className={detailPageItem}>
        <header className={detailPageHeader}>
          <h2 className={detailPageTitle}>{data.name}</h2>
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
            {hasInstanceDomain && (
              <div className={radioBtnGroupContainer}>
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

  renderEntityInfoTab() {
    const { hasInstanceDomain, state, props } = this;
    const { selectedOption } = state;
    const { metric } = props;
    const { data } = metric;
    if (!data) {
      return <p>Unable to render tab.</p>;
    }
    switch (selectedOption) {
      case EntityTabOpt.InstanceDomains:
        if (hasInstanceDomain) {
          return <InstanceDomainTab />;
        }
        break;
      case EntityTabOpt.Labels:
        if (hasInstanceDomain) {
          return <LabelsTab />;
        }
        break;
      case EntityTabOpt.OtherMeta:
        const { pmid, type, sem, units } = data;
        return <OtherMetaTab pmid={pmid} type={type} sem={sem} units={units} />;
    }
    return;
  }

  render() {
    const { renderSpinner, renderDetail } = this;
    return (
      <>
        {renderSpinner()}
        {renderDetail()}
      </>
    );
  }
}

export default withTheme(connect(mapStateToProps, {})(MetricDetailPage));
export { MetricDetailPageProps };

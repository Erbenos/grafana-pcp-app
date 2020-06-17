import React from 'react';

import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup, Themeable, withTheme } from '@grafana/ui';
import {
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageFooter,
  detailPageBtn,
  radioBtnGroupContainer,
  detailPageDescription,
} from '../styles';
import { SelectableValue } from '@grafana/data';
import { DetailEntityPageProps, DetailPreviewType } from '../DetailPage';
import InstanceDomainTab from './InstanceDomainTab/InstanceDomainTab';
import OtherMetaTab from './OtherMetaTab/OtherMetaTab';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import LabelsTab from './LabelsTab/LabelsTab';
import { MetricDetailState } from 'store/slices/search/slices/entity/state';
import { EntityType, FetchStatus } from 'store/slices/search/shared/state';
import Loader from 'components/Loader/Loader';

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
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderMetric = this.renderMetric.bind(this);
    this.renderBookmarkBtn = this.renderBookmarkBtn.bind(this);
    this.renderPreviewBtn = this.renderPreviewBtn.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onUnbookmark = this.onUnbookmark.bind(this);
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

  onUnbookmark() {
    const { metric } = this.props;
    const { data } = metric;
    if (data) {
      this.props.onUnbookmark({ id: data.name, type: EntityType.Metric });
    }
  }

  onPreview() {
    const { metric } = this.props;
    const { data } = metric;
    if (!data) {
      return;
    }
    switch (data.type) {
      case 'string':
        this.props.onPreview({ id: data.name, type: DetailPreviewType.Table });
        return;
      default:
        this.props.onPreview({ id: data.name, type: DetailPreviewType.Graph });
    }
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

  renderBookmarkBtn() {
    const { isBookmarked, onBookmark, onUnbookmark } = this;
    if (!isBookmarked) {
      return (
        <Button variant="link" size="md" icon="save" className={detailPageBtn} onClick={onBookmark}>
          Bookmark This Result
        </Button>
      );
    } else {
      return (
        <Button variant="destructive" size="md" icon="trash-alt" onClick={onUnbookmark}>
          Unbookmark This Result
        </Button>
      );
    }
  }

  renderPreviewBtn() {
    const { onPreview, props } = this;
    const { metric } = props;
    const { data } = metric;
    if (!data) {
      return;
    }
    return (
      <Button variant="link" size="md" icon="chart-line" className={detailPageBtn} onClick={onPreview}>
        Preview
      </Button>
    );
  }

  renderMetric() {
    const {
      props,
      state,
      renderEntityInfoTab,
      setSelected,
      hasInstanceDomain,
      renderDesc,
      renderBookmarkBtn,
      renderPreviewBtn,
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
              {renderBookmarkBtn()}
              {renderPreviewBtn()}
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
    const { renderDetail, props } = this;
    const { metric } = props;
    return <Loader loaded={metric.status !== FetchStatus.PENDING}>{renderDetail()}</Loader>;
  }
}

export default withTheme(connect(mapStateToProps, {})(MetricDetailPage));
export { MetricDetailPageProps };

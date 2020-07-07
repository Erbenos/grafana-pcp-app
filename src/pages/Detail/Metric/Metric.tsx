import React from 'react';
import { HorizontalGroup, Button, VerticalGroup } from '@grafana/ui';
import {
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageBtn,
  detailPageDescription,
  detailPageActions,
  detailPageProperties,
} from '../styles';
import { DetailEntityPageProps, DetailPreviewType } from '../DetailPage';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { MetricDetailState } from 'store/slices/search/slices/entity/state';
import Loader from 'components/Loader/Loader';
import { FetchStatus } from 'store/slices/search/shared/state';
import Series from './Series/Series';
import { EntityType } from 'models/endpoints/search';

const mapStateToProps = (state: RootState) => ({
  metric: (state.search.entity as MetricDetailState).metric,
  bookmarks: state.search.bookmarks,
});

type MetricDetailPageProps = ReturnType<typeof mapStateToProps> & DetailEntityPageProps;

class MetricDetailPage extends React.Component<MetricDetailPageProps, {}> {
  constructor(props: MetricDetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.description = this.description.bind(this);
    this.renderMetric = this.renderMetric.bind(this);
    this.renderBookmarkBtn = this.renderBookmarkBtn.bind(this);
    this.renderPreviewBtn = this.renderPreviewBtn.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onUnbookmark = this.onUnbookmark.bind(this);
  }

  get isBookmarked() {
    const { metric, bookmarks } = this.props;
    return bookmarks.some(bookmark => metric.data?.name === bookmark.id && bookmark.type === EntityType.Metric);
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
    // either no data or no series
    if (!data || data.series.length === 0) {
      return;
    }
    // lets just assume that all series have same type of value
    const { meta } = data.series[0];
    switch (meta.type) {
      case 'string':
        this.props.onPreview({ id: data.name, type: DetailPreviewType.Table });
        return;
      default:
        this.props.onPreview({ id: data.name, type: DetailPreviewType.Graph });
        return;
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

  description() {
    const { metric } = this.props;
    const { data } = metric;
    if (!data) {
      return <p>Unable to render description.</p>;
    }
    let description = data.oneline ?? 'No help available.';
    if (data.help) {
      description = data.help;
    }
    return description;
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
    const { props, description, renderBookmarkBtn, renderPreviewBtn } = this;
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
        <div className={detailPageDescription}>{description()}</div>
        <div className={detailPageActions}>
          <HorizontalGroup spacing="lg">
            {renderBookmarkBtn()}
            {renderPreviewBtn()}
          </HorizontalGroup>
        </div>
        <div className={detailPageProperties}>
          <VerticalGroup spacing="lg">
            {data.series.map(series => (
              <Series series={series} />
            ))}
          </VerticalGroup>
        </div>
      </article>
    );
  }

  render() {
    const { renderDetail, props } = this;
    const { metric } = props;
    return <Loader loaded={metric.status !== FetchStatus.PENDING}>{renderDetail()}</Loader>;
  }
}

export default connect(mapStateToProps, {})(MetricDetailPage);
export { MetricDetailPageProps };

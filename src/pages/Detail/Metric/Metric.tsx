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
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { MetricDataState } from 'store/slices/search/slices/entity/state';
import Loader from 'components/Loader/Loader';
import { FetchStatus } from 'store/slices/search/shared/state';
import Series from './Series/Series';
import { EntityType } from 'models/endpoints/search';
import Card from 'components/Card/Card';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
});

export interface MetricDetailPageBasicProps {
  metric: MetricDataState;
  onBookmark: (item: BookmarkItem) => void;
  onUnbookmark: (item: BookmarkItem) => void;
  onPreview: (item: MetricDetailPreview) => void;
}

export enum MetricPreviewType {
  Graph,
  Table,
}

export interface MetricDetailPreview {
  id: string;
  type: MetricPreviewType;
}

export type MetricDetailPageReduxStateProps = ReturnType<typeof mapStateToProps>;

export type MetricDetailPageReduxProps = MetricDetailPageReduxStateProps;

export type MetricDetailPageProps = MetricDetailPageReduxProps & MetricDetailPageBasicProps;

export class MetricDetailPage extends React.Component<MetricDetailPageProps, {}> {
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
    // assume that all series have same type of value
    const { meta } = data.series[0];
    switch (meta.type) {
      case 'string':
        this.props.onPreview({ id: data.name, type: MetricPreviewType.Table });
        return;
      default:
        this.props.onPreview({ id: data.name, type: MetricPreviewType.Graph });
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
      return 'Unable to render description.';
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
        <Button
          variant="link"
          size="md"
          icon="star"
          className={detailPageBtn}
          onClick={onBookmark}
          data-test="bookmark-button"
        >
          Bookmark
        </Button>
      );
    } else {
      return (
        <Button variant="destructive" size="md" icon="trash-alt" onClick={onUnbookmark} data-test="unbookmark-button">
          Unbookmark
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
      <Button
        variant="link"
        size="md"
        icon="chart-line"
        className={detailPageBtn}
        onClick={onPreview}
        data-test="preview-button"
      >
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
      <VerticalGroup spacing="lg">
        <Card background="strong">
          <article className={detailPageItem}>
            <header className={detailPageHeader}>
              <h2 className={detailPageTitle} data-test="name">
                {data.name}
              </h2>
            </header>
            <div className={detailPageDescription} data-test="description">
              {description()}
            </div>
            <div className={detailPageActions}>
              <HorizontalGroup spacing="lg" justify="space-between">
                {renderPreviewBtn()}
                {renderBookmarkBtn()}
              </HorizontalGroup>
            </div>
          </article>
        </Card>
        <div className={detailPageProperties}>
          <VerticalGroup spacing="lg">
            {data.series.map((series, i) => (
              <Card background="weak" key={i}>
                <Series series={series} data-test="series" />
              </Card>
            ))}
          </VerticalGroup>
        </div>
      </VerticalGroup>
    );
  }

  render() {
    const { renderDetail, props } = this;
    const { metric } = props;
    return (
      <Loader loaded={metric.status !== FetchStatus.PENDING} data-test="loader">
        {renderDetail()}
      </Loader>
    );
  }
}

export default connect(mapStateToProps, {})(MetricDetailPage);

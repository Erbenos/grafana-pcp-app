import React from 'react';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { Themeable, withTheme, VerticalGroup, HorizontalGroup, Button } from '@grafana/ui';
import { IndomDataState } from 'store/slices/search/slices/entity/state';
import Loader from 'components/Loader/Loader';
import {
  detailPageDescription,
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageBtn,
  instanceDomainItemList,
  detailPageActions,
  detailPageProperties,
} from '../styles';
import { FetchStatus } from 'store/slices/search/shared/state';
import { EntityType } from 'models/endpoints/search';
import Card from 'components/Card/Card';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
});

export interface InstanceDomainDetailPageBasicProps {
  indom: IndomDataState;
  onBookmark: (item: BookmarkItem) => void;
  onUnbookmark: (item: BookmarkItem) => void;
}

export type InstanceDomainDetailPageReduxStateProps = ReturnType<typeof mapStateToProps>;

export type InstanceDomainDetailPageReduxProps = InstanceDomainDetailPageReduxStateProps;

export type InstanceDomainDetailPageProps = InstanceDomainDetailPageReduxProps &
  InstanceDomainDetailPageBasicProps &
  Themeable;

export class InstanceDomainDetailPage extends React.Component<InstanceDomainDetailPageProps, {}> {
  constructor(props: InstanceDomainDetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderBookmarkBtn = this.renderBookmarkBtn.bind(this);
    this.renderIndom = this.renderIndom.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onUnbookmark = this.onUnbookmark.bind(this);
  }

  get isBookmarked() {
    const { indom, bookmarks } = this.props;
    return bookmarks.some(bookmark => indom.data?.indom === bookmark.id && bookmark.type === EntityType.InstanceDomain);
  }

  onBookmark() {
    const { indom } = this.props;
    const { data } = indom;
    if (data) {
      this.props.onBookmark({ id: data.indom, type: EntityType.InstanceDomain });
    }
  }

  onUnbookmark() {
    const { indom } = this.props;
    const { data } = indom;
    if (data) {
      this.props.onUnbookmark({ id: data.indom, type: EntityType.InstanceDomain });
    }
  }

  renderDetail() {
    const { props, renderIndom } = this;
    const { indom } = props;
    const { status, data } = indom;
    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Loading&hellip;</p>;
        }
        if (data === null) {
          return <p>Incorrect response</p>;
        }
        return renderIndom();
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching instance domain.</p>;
      }
    }
    return;
  }

  renderDesc() {
    const { indom } = this.props;
    const { data } = indom;
    if (!data) {
      return <p>Unable to render description.</p>;
    }
    let description = data['text-oneline'];
    if (data['text-help']) {
      description = data['text-help'];
    }
    return <p>{description}</p>;
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
          Bookmark This Result
        </Button>
      );
    } else {
      return (
        <Button variant="destructive" size="md" icon="trash-alt" onClick={onUnbookmark} data-test="unbookmark-button">
          Unbookmark This Result
        </Button>
      );
    }
  }

  renderIndom() {
    const { props, renderBookmarkBtn, renderDesc } = this;
    const { indom } = props;
    const { data } = indom;
    if (!data) {
      return <p>No indom.</p>;
    }
    return (
      <VerticalGroup spacing="lg">
        <Card background="strong">
          <article className={detailPageItem}>
            <header className={detailPageHeader}>
              <h2 className={detailPageTitle} data-test="title">
                {data.indom}
              </h2>
            </header>
            <div className={detailPageDescription} data-test="description">
              {renderDesc()}
            </div>
            <div className={detailPageActions}>
              <HorizontalGroup spacing="lg" justify="space-between">
                {renderBookmarkBtn()}
              </HorizontalGroup>
            </div>
          </article>
        </Card>
        <Card background="weak">
          <div className={detailPageProperties}>
            <VerticalGroup spacing="md">
              <h4>Instances:</h4>
              <ul className={instanceDomainItemList}>
                {data.instances.map((instance, i) => (
                  <li key={i} data-test={`${instance.name}-record`}>
                    <strong data-test="instance-name">{instance.name}</strong>{' '}
                    <span data-test="instance-value">{instance.instance}</span>
                  </li>
                ))}
              </ul>
              <p>Instance Count: {data.instances.length}</p>
            </VerticalGroup>
          </div>
        </Card>
      </VerticalGroup>
    );
  }

  render() {
    const { renderDetail, props } = this;
    const { indom } = props;
    return (
      <Loader loaded={indom.status !== FetchStatus.PENDING} data-test="loader">
        {renderDetail()}
      </Loader>
    );
  }
}

export default withTheme(connect(mapStateToProps, {})(InstanceDomainDetailPage));

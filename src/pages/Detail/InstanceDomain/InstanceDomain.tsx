import React from 'react';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { Themeable, withTheme, VerticalGroup, HorizontalGroup, Button } from '@grafana/ui';
import { DetailEntityPageProps } from '../DetailPage';
import { InstanceDomainDetailState } from 'store/slices/search/slices/entity/state';
import { EntityType, FetchStatus } from 'store/slices/search/shared/state';
import Loader from 'components/Loader/Loader';
import {
  detailPageDescription,
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageFooter,
  detailPageBtn,
  instanceDomainItemList,
} from '../styles';

const mapStateToProps = (state: RootState) => ({
  indom: (state.search.entity as InstanceDomainDetailState).indom,
  bookmarks: state.search.bookmarks,
});

type InstanceDomainDetailPageProps = ReturnType<typeof mapStateToProps> & DetailEntityPageProps & Themeable;

class InstanceDomainDetailPage extends React.Component<InstanceDomainDetailPageProps, {}> {
  constructor(props: InstanceDomainDetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderIndom = this.renderIndom.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
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

  onPreview() {
    this.props.onPreview();
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
    return <div className={detailPageDescription}>{description && <p>{description}</p>}</div>;
  }

  renderIndom() {
    const { props, onBookmark, renderDesc, isBookmarked } = this;
    const { indom } = props;
    const { data } = indom;
    if (!data) {
      return <p>No indom.</p>;
    }
    return (
      <article className={detailPageItem}>
        <header className={detailPageHeader}>
          <h2 className={detailPageTitle}>{data.indom}</h2>
        </header>
        <VerticalGroup spacing="md">
          <div>
            <p>{renderDesc()}</p>
          </div>
          <h4>Instances:</h4>
          <ul className={instanceDomainItemList}>
            {data.instances.map(instance => (
              <li>
                <strong>{instance.name}</strong> ({instance.instance})
              </li>
            ))}
          </ul>
          <p>Instance Count: {data.instances.length}</p>
        </VerticalGroup>
        <footer className={detailPageFooter}>
          <VerticalGroup spacing="lg">
            <HorizontalGroup spacing="lg">
              {!isBookmarked && (
                <Button variant="link" size="md" icon="save" className={detailPageBtn} onClick={onBookmark}>
                  Bookmark This Result
                </Button>
              )}
            </HorizontalGroup>
          </VerticalGroup>
        </footer>
      </article>
    );
  }

  render() {
    const { renderDetail, props } = this;
    const { indom } = props;
    return <Loader loaded={indom.status !== FetchStatus.PENDING}>{renderDetail()}</Loader>;
  }
}

export default withTheme(connect(mapStateToProps, {})(InstanceDomainDetailPage));

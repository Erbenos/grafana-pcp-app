import React from 'react';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { Themeable, withTheme } from '@grafana/ui';
import { DetailEntityPageProps } from '../DetailPage';
import { InstanceDomainDetailState } from 'store/slices/search/slices/entity/state';
import { EntityType } from 'store/slices/search/shared/state';

const mapStateToProps = (state: RootState) => ({
  indom: (state.search.entity as InstanceDomainDetailState).indom,
  bookmarks: state.search.bookmarks,
});

type InstanceDomainDetailPageProps = ReturnType<typeof mapStateToProps> & DetailEntityPageProps & Themeable;

class InstanceDomainDetailPage extends React.Component<InstanceDomainDetailPageProps, {}> {
  constructor(props: InstanceDomainDetailPageProps) {
    super(props);
  }

  get isBookmarked() {
    const { indom, bookmarks } = this.props;
    return bookmarks.some(bookmark => indom.data?.indom === bookmark.id && bookmark.type);
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

  render() {
    return <p>Instance Domain Detail Page.</p>;
  }
}

export default withTheme(connect(mapStateToProps, {})(InstanceDomainDetailPage));

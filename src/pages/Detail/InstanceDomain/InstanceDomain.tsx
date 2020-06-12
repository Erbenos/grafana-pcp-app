import React from 'react';
import { RootState } from 'reducers/reducers';
import { InstanceDomainDetailState, EntityType } from 'actions/types';
import { connect } from 'react-redux';
import { Themeable } from '@grafana/ui';
import { DetailEntityPageProps } from '../DetailPage';

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

export default connect(mapStateToProps, {})(InstanceDomainDetailPage);

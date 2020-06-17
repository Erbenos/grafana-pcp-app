import { SelectableValue } from '@grafana/data';
import React from 'react';
import { connect } from 'react-redux';

import { detailPageContainer } from './styles';
import MetricDetailPage from './Metric/Metric';
import InstanceDomainDetailPage from './InstanceDomain/InstanceDomain';
import { RootState } from 'store/reducer';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';
import { EntityType } from 'store/slices/search/shared/state';
import { addBookmark, removeBookmark } from 'store/slices/search/slices/bookmarks/actionCreators';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.entity,
});

export enum DetailPreviewType {
  Graph,
  Table,
}

export interface DetailPreview {
  id: string;
  type: DetailPreviewType;
}

interface DetailEntityPageProps {
  onBookmark: (item: BookmarkItem) => void;
  onUnbookmark: (item: BookmarkItem) => void;
  onPreview: (item: DetailPreview) => void;
}

const dispatchProps = {
  addBookmark,
  removeBookmark,
};

type DetailPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

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
  constructor(props: DetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onUnbookmark = this.onUnbookmark.bind(this);
  }

  onBookmark(item: BookmarkItem) {
    this.props.addBookmark(item);
  }

  onUnbookmark(item: BookmarkItem) {
    this.props.removeBookmark(item);
  }

  onPreview(item: DetailPreview) {
    const grafanaRoot = `${location.protocol}//${location.host}`;
    let dashboardName = '';
    let dashboardUid = '';
    const dashboardEntityVar = `?var-entity=${item.id}`;
    switch (item.type) {
      case DetailPreviewType.Graph:
        dashboardName = 'graph-preview';
        dashboardUid = 'grafana-pcp-app-graph-preview';
        break;
      case DetailPreviewType.Table:
        dashboardName = 'table-preview';
        dashboardUid = 'grafana-pcp-app-table-preview';
        break;
      default:
        return;
    }
    const dashboardPath = `${grafanaRoot}/d/${dashboardUid}/${dashboardName}${dashboardEntityVar}`;
    window.open(dashboardPath, '_blank');
  }

  renderDetail() {
    const { props, onBookmark, onUnbookmark, onPreview } = this;
    if (!props.entity) {
      return <p>Entity state not initialized.</p>;
    }
    switch (props.entity.type) {
      case EntityType.Metric:
        return <MetricDetailPage onBookmark={onBookmark} onUnbookmark={onUnbookmark} onPreview={onPreview} />;
      // case EntityType.Instance:
      //   return <InstanceDetailPage onBookmark={onBookmark} onPreview={onPreview} />;
      case EntityType.InstanceDomain:
        return <InstanceDomainDetailPage onBookmark={onBookmark} onUnbookmark={onUnbookmark} onPreview={onPreview} />;
    }
    return <p>Error rendering entity.</p>;
  }

  render() {
    const { renderDetail } = this;
    return <div className={detailPageContainer}>{renderDetail()}</div>;
  }
}

export default connect(mapStateToProps, dispatchProps)(DetailPage);

export { DetailPageProps, DetailEntityPageProps };

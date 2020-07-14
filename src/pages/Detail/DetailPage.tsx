import { SelectableValue } from '@grafana/data';
import { getLocationSrv, LocationSrv } from '@grafana/runtime';
import React from 'react';
import { connect } from 'react-redux';

import { detailPageContainer } from './styles';
import MetricDetailPage from './Metric/Metric';
import InstanceDomainDetailPage from './InstanceDomain/InstanceDomain';
import { RootState } from 'store/reducer';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';
import { addBookmark, removeBookmark } from 'store/slices/search/slices/bookmarks/actionCreators';
import { EntityType } from 'models/endpoints/search';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.entity,
});

const dispatchProps = {
  addBookmark,
  removeBookmark,
};

export enum DetailPreviewType {
  Graph,
  Table,
}

export interface DetailPreview {
  id: string;
  type: DetailPreviewType;
}

export interface DetailEntityPageProps {
  onBookmark: (item: BookmarkItem) => void;
  onUnbookmark: (item: BookmarkItem) => void;
  onPreview: (item: DetailPreview) => void;
}

export type DetailPageReduxStateProps = ReturnType<typeof mapStateToProps>;

export type DetailPageReduxDispatchProps = typeof dispatchProps;

export type DetailPageReduxProps = DetailPageReduxStateProps & DetailPageReduxDispatchProps;

export type DetailPageProps = DetailPageReduxProps;

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
}

interface DetailPageState {
  selectedOption: EntityTabOpt;
  options: Array<SelectableValue<EntityTabOpt>>;
}

export class DetailPage extends React.Component<DetailPageProps, DetailPageState> {
  locationSrv: LocationSrv;

  constructor(props: DetailPageProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onUnbookmark = this.onUnbookmark.bind(this);
    this.locationSrv = getLocationSrv();
  }

  onBookmark(item: BookmarkItem) {
    this.props.addBookmark(item);
  }

  onUnbookmark(item: BookmarkItem) {
    this.props.removeBookmark(item);
  }

  onPreview(item: DetailPreview) {
    let dashboardName = '';
    let dashboardUid = '';
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
    const path = `/d/${dashboardUid}/${dashboardName}`;
    this.locationSrv.update({
      path,
      query: {
        'var-entity': item.id,
        refresh: '5s',
      },
    });
  }

  renderDetail() {
    const { props, onBookmark, onUnbookmark, onPreview } = this;
    if (!props.entity) {
      return <p>Entity state not initialized.</p>;
    }
    switch (props.entity.type) {
      case EntityType.Metric:
        return <MetricDetailPage onBookmark={onBookmark} onUnbookmark={onUnbookmark} onPreview={onPreview} />;
      case EntityType.Instance:
      case EntityType.InstanceDomain:
        return <InstanceDomainDetailPage onBookmark={onBookmark} onUnbookmark={onUnbookmark} onPreview={onPreview} />;
      default:
        return <p>Error rendering entity.</p>;
    }
  }

  render() {
    const { renderDetail } = this;
    return <div className={detailPageContainer}>{renderDetail()}</div>;
  }
}

export default connect(mapStateToProps, dispatchProps)(DetailPage);

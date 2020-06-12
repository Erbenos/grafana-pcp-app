import { SelectableValue } from '@grafana/data';
import React from 'react';
import { connect } from 'react-redux';

import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers/reducers';
import { EntityType, BookmarkItem } from '../../actions/types';
import { detailPageContainer } from './styles';
import MetricDetailPage from './Metric/Metric';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.entity,
});

interface DetailEntityPageProps {
  onBookmark: (item: BookmarkItem) => void;
  onPreview: () => void;
}

const dispatchProps = {
  addBookmark,
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
  }

  onBookmark(item: BookmarkItem) {
    this.props.addBookmark(item);
  }

  onPreview() {
    console.log('previewEntity not implemented.');
  }

  renderDetail() {
    const { props, onBookmark, onPreview } = this;
    if (!props.entity) {
      return <p>Entity state not initialized.</p>;
    }
    switch (props.entity.type) {
      case EntityType.Metric:
        return <MetricDetailPage onBookmark={onBookmark} onPreview={onPreview} />;
    }
    return <p>Error rendering entity.</p>;
  }

  render() {
    const { renderDetail } = this;
    return <div className={detailPageContainer}>{renderDetail()}</div>;
  }
}

export default connect(mapStateToProps, { addBookmark })(DetailPage);

export { DetailPageProps, DetailEntityPageProps };

import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css, cx } from 'emotion';
import { connect } from 'react-redux';

import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers/reducers';
import { FetchStatus, EntityType, BookmarkItem } from '../../actions/types';
import { detailPageSpinnerContainer, detailPageContainer } from './styles';
import { Themeable, Spinner, withTheme } from '@grafana/ui';
import MetricDetailPage from './Metric/Metric';
// import InstanceDomainDetailPage from './InstanceDomain/InstanceDomain';
// import InstanceDetailPage from './Instance/Instance';

const mapStateToProps = (state: RootState) => ({
  status: state.search.entity.status,
  entity: state.search.entity.data,
});

interface DetailEntityPageProps {
  onBookmark: (item: BookmarkItem) => void;
  onPreview: () => void;
}

const dispatchProps = {
  addBookmark,
};

type DetailPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & Themeable;

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
    this.renderSpinner = this.renderSpinner.bind(this);
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

  renderSpinner() {
    if (this.props.status === FetchStatus.PENDING) {
      return (
        <div
          className={cx(
            detailPageSpinnerContainer,
            css`
              background-color: ${this.props.theme.colors.bg1}8f;
            `
          )}
        >
          <Spinner size={40} />
        </div>
      );
    }
    return;
  }

  renderDetail() {
    const { props, onBookmark, onPreview } = this;
    const { entity, status } = props;
    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Loading&hellip;</p>;
        }
        if (entity === null) {
          return <p>Incorrect response</p>;
        }
        switch (entity.type) {
          case EntityType.Metric:
            return <MetricDetailPage metric={entity.metric} onBookmark={onBookmark} onPreview={onPreview} />;
          // TODO: support other types
          // case EntityType.InstanceDomain:
          //   return <InstanceDomainDetailPage instanceDomain={entity.item} onBookmark={onBookmark} onPreview={onPreview} />;
          // case EntityType.Instance:
          //   return <InstanceDetailPage instance={entity.item} onBookmark={onBookmark} onPreview={onPreview} />;
        }
        return <p>Entity not found.</p>;
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching entity.</p>;
      }
    }
    return;
  }

  render() {
    const { renderSpinner, renderDetail } = this;
    return (
      <div className={detailPageContainer}>
        {renderSpinner()}
        {renderDetail()}
      </div>
    );
  }
}

export default withTheme(connect(mapStateToProps, { addBookmark })(DetailPage));

export { DetailPageProps, DetailEntityPageProps };

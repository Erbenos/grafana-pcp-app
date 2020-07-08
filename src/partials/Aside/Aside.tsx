import React from 'react';
import { VerticalGroup, Button } from '@grafana/ui';

import { asideContainer } from './styles';
import { connect } from 'react-redux';
import { RootState } from 'store/reducer';
import { ViewState } from 'store/slices/search/slices/view/state';
import { EntityType } from 'models/endpoints/search';
import { FetchStatus } from 'store/slices/search/shared/state';
import Loader from 'components/Loader/Loader';
import { MetricDetailState } from 'store/slices/search/slices/entity/state';
import { css } from 'emotion';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, bindActionCreators } from 'redux';
import { openDetail, querySearch } from 'store/slices/search/shared/actionCreators';
import BookmarkList from 'components/BookmarkList/BookmarkList';
import { clearSearchHistory } from 'store/slices/search/slices/history/actionCreators';
import { clearBookmarks } from 'store/slices/search/slices/bookmarks/actionCreators';
import SearchHistoryList from 'components/SearchHistoryList/SearchHistoryList';

const mapStateToProps = (state: RootState) => ({
  view: state.search.view,
  entity: state.search.entity,
  searchHistory: state.search.history,
  bookmarks: state.search.bookmarks,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ openDetail, querySearch, clearBookmarks, clearSearchHistory }, dispatch);

type AsideProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Aside extends React.Component<AsideProps, {}> {
  constructor(props: AsideProps) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
    this.renderMetricSiblings = this.renderMetricSiblings.bind(this);
    this.onMetricClick = this.onMetricClick.bind(this);
  }

  onMetricClick(metricName: string) {
    this.props.openDetail(metricName, EntityType.Metric);
  }

  renderMetricSiblings(metric: MetricDetailState) {
    const { onMetricClick } = this;
    const { siblings } = metric;
    if (siblings?.status === FetchStatus.PENDING) {
      return (
        <Loader loaded={false}>
          <p>Loading metric siblings &hellip;</p>
        </Loader>
      );
    }
    if (!siblings) {
      return <p>Unable to fetch metric siblings.</p>;
    }
    if (siblings.data?.length === 0) {
      return;
    }
    return (
      <VerticalGroup spacing="md">
        <h4>Similar Metrics</h4>
        <VerticalGroup spacing="xs">
          {siblings.data?.map(metric => (
            <Button
              onClick={() => onMetricClick(metric)}
              icon="arrow-right"
              variant="link"
              className={css`
                padding-left: 0;
                padding-right: 0;
              `}
            >
              {metric}
            </Button>
          ))}
        </VerticalGroup>
      </VerticalGroup>
    );
  }

  renderContents() {
    const { renderMetricSiblings, props } = this;
    const { view, entity } = props;
    switch (view) {
      case ViewState.Detail: {
        if (!entity) {
          return;
        }
        switch (entity.type) {
          case EntityType.Metric:
            return renderMetricSiblings(entity);
          case EntityType.InstanceDomain:
          default:
            return;
        }
      }
      case ViewState.Search: {
        return (
          <VerticalGroup spacing="lg">
            <BookmarkList
              showClearBtn={false}
              multiCol={false}
              bookmarks={props.bookmarks}
              onBookmarkClick={props.openDetail}
              onClearBookmarksClick={props.clearBookmarks}
            />
            <SearchHistoryList
              showClearBtn={false}
              multiCol={false}
              searchHistory={props.searchHistory}
              onSearchHistoryClick={props.querySearch}
              onClearSearchHistoryClick={props.clearSearchHistory}
            />
          </VerticalGroup>
        );
      }
      default:
        return;
    }
  }

  render() {
    const { renderContents } = this;
    return <div className={asideContainer}>{renderContents()}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);

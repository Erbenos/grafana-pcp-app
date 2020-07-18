import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';
import { RootState } from 'store/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { querySearch, openDetail } from 'store/slices/search/shared/actionCreators';
import { clearBookmarks } from 'store/slices/search/slices/bookmarks/actionCreators';
import { clearSearchHistory } from 'store/slices/search/slices/history/actionCreators';
import BookmarkList from 'components/BookmarkList/BookmarkList';
import SearchHistoryList from 'components/SearchHistoryList/SearchHistoryList';
import { indexPageContainer } from './styles';
import { VerticalGroup } from '@grafana/ui';
import Card from 'components/Card/Card';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
  searchHistory: state.search.history,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, openDetail, clearBookmarks, clearSearchHistory }, dispatch);

export type IndexPageReduxStateProps = ReturnType<typeof mapStateToProps>;

export type IndexPageReduxDispatchProps = ReturnType<typeof mapDispatchToProps>;

export type IndexPageReduxProps = IndexPageReduxStateProps & IndexPageReduxDispatchProps;

export type IndexPageProps = IndexPageReduxProps;

export class IndexPage extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <div className={indexPageContainer}>
        <VerticalGroup spacing="lg">
          <Card background="strong">
            <BookmarkList
              showClearBtn={true}
              multiCol={true}
              bookmarks={props.bookmarks}
              onBookmarkClick={props.openDetail}
              onClearBookmarksClick={props.clearBookmarks}
              data-test="bookmark-list"
            />
          </Card>
          <Card background="strong">
            <SearchHistoryList
              showClearBtn={true}
              multiCol={true}
              searchHistory={props.searchHistory}
              onSearchHistoryClick={props.querySearch}
              onClearSearchHistoryClick={props.clearSearchHistory}
              data-test="search-history-list"
            />
          </Card>
        </VerticalGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

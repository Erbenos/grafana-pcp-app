import React from 'react';
import { Button, VerticalGroup } from '@grafana/ui';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';
import { RootState } from 'store/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';
import { SearchQuery } from 'store/slices/search/shared/state';
import { indexColumnsList, indexPageBtnWithNoSpacing, indexPageContainer } from './styles';
import { querySearch, openDetail } from 'store/slices/search/shared/actionCreators';
import { clearBookmarks } from 'store/slices/search/slices/bookmarks/actionCreators';
import { clearSearchHistory } from 'store/slices/search/slices/history/actionCreators';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
  searchHistory: state.search.history,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, openDetail, clearBookmarks, clearSearchHistory }, dispatch);

type IndexPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class IndexPage extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps) {
    super(props);
    this.onClearSearchHistoryClick = this.onClearSearchHistoryClick.bind(this);
    this.onClearBookmarksClick = this.onClearBookmarksClick.bind(this);
    this.onSearchHistoryClick = this.onSearchHistoryClick.bind(this);
    this.onBookmarksClick = this.onBookmarksClick.bind(this);
    this.renderSearchHistory = this.renderSearchHistory.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
  }

  onBookmarksClick(item: BookmarkItem) {
    this.props.openDetail(item.id, item.type);
  }

  onClearBookmarksClick() {
    this.props.clearBookmarks();
  }

  onSearchHistoryClick(query: SearchQuery) {
    this.props.querySearch(query);
  }

  onClearSearchHistoryClick() {
    this.props.clearSearchHistory();
  }

  renderSearchHistory() {
    const { props, onSearchHistoryClick, onClearSearchHistoryClick } = this;
    const { searchHistory } = props;

    if (searchHistory.length === 0) {
      return <p>No search queries in history.</p>;
    }

    return (
      <VerticalGroup spacing="md">
        <div className={indexColumnsList}>
          {searchHistory.map((item, index) => (
            <Button
              key={index}
              variant="link"
              size="md"
              icon="search"
              className={indexPageBtnWithNoSpacing}
              onClick={() => onSearchHistoryClick(item)}
            >
              {item.pattern}
            </Button>
          ))}
        </div>
        <Button variant="destructive" size="md" icon="trash-alt" onClick={onClearSearchHistoryClick}>
          Clear History
        </Button>
      </VerticalGroup>
    );
  }

  renderBookmarks() {
    const { props, onBookmarksClick, onClearBookmarksClick } = this;
    const { bookmarks } = props;

    if (bookmarks.length === 0) {
      return <p>No bookmarks saved.</p>;
    }

    return (
      <VerticalGroup spacing="md">
        <div className={indexColumnsList}>
          {bookmarks.map((item, index) => (
            <Button
              key={index}
              variant="link"
              size="md"
              icon="star"
              className={indexPageBtnWithNoSpacing}
              onClick={() => onBookmarksClick(item)}
            >
              {item.id}
            </Button>
          ))}
        </div>
        <Button variant="destructive" size="md" icon="trash-alt" onClick={onClearBookmarksClick}>
          Clear Bookmarks
        </Button>
      </VerticalGroup>
    );
  }

  render() {
    const { renderSearchHistory, renderBookmarks } = this;
    return (
      <div className={indexPageContainer}>
        <VerticalGroup spacing="lg">
          <VerticalGroup spacing="md">
            <h4>Bookmarked Results:</h4>
            {renderBookmarks()}
          </VerticalGroup>
          <VerticalGroup spacing="md">
            <h4>Latest Searches:</h4>
            {renderSearchHistory()}
          </VerticalGroup>
        </VerticalGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
export { IndexPageProps };

import React from 'react';
import { Button, VerticalGroup } from '@grafana/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IndexPageContainer, IndexPageBtnWithNoSpacing, IndexColumnsList } from './styles';
import { clearBookmarks, clearSearchHistory, querySearch, openDetail } from '../../actions/search';
import { RootState } from '../../reducers';
import { SearchQuery, BookmarkItem, OpenDetailAction, QuerySearchAction } from '../../actions/types';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
  searchHistory: state.search.history,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, QuerySearchAction | OpenDetailAction>) =>
  bindActionCreators({ querySearch, openDetail, clearBookmarks, clearSearchHistory }, dispatch);

type IndexPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class IndexPage extends React.Component<IndexPageProps> {

  constructor(props: IndexPageProps) {
    super(props);
    this.handleClearSearchHistoryClick = this.handleClearSearchHistoryClick.bind(this);
    this.handleClearBookmarksClick = this.handleClearBookmarksClick.bind(this);
    this.handleSearchHistoryClick = this.handleSearchHistoryClick.bind(this);
    this.handleBookmarksClick = this.handleBookmarksClick.bind(this);
    this.renderSearchHistory = this.renderSearchHistory.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
  }

  handleBookmarksClick(item: BookmarkItem) {
    // TODO: will need to pass type as well eventually
    this.props.openDetail(item.id);
  }

  handleClearBookmarksClick() {
    this.props.clearBookmarks();
  }

  handleSearchHistoryClick(query: SearchQuery) {
    this.props.querySearch(query);
  }

  handleClearSearchHistoryClick() {
    this.props.clearSearchHistory();
  }

  renderSearchHistory() {
    const { props, handleSearchHistoryClick, handleClearSearchHistoryClick } = this;
    const { searchHistory } = props;
    
    if (searchHistory.length === 0) {
      return (
        <p>No search queries in history.</p>
      );
    }

    return (
      <VerticalGroup spacing="md">
        <div className={IndexColumnsList}>
          {searchHistory.map((item, index) => 
            <Button
              key={index}
              variant="link"
              size="md"
              icon="search"
              className={IndexPageBtnWithNoSpacing}
              onClick={() => handleSearchHistoryClick(item)}>
              {item.pattern}
            </Button>
          )}
        </div>          
        <Button
          variant="destructive"
          size="md"
          icon="trash-alt"
          onClick={handleClearSearchHistoryClick}>
          Clear History
        </Button>
      </VerticalGroup>
    );
  }

  renderBookmarks() {
    const { props, handleBookmarksClick, handleClearBookmarksClick } = this;
    const { bookmarks } = props;

    if (bookmarks.length === 0) {
      return (
        <p>No bookmarks saved.</p>
      );
    }

    return (
      <VerticalGroup spacing="md">
        <div className={IndexColumnsList}>
          {bookmarks.map((item, index) => 
            <Button
              key={index}
              variant="link"
              size="md"
              icon="star"
              className={IndexPageBtnWithNoSpacing}
              onClick={() => handleBookmarksClick(item)}>
              {item.id}
            </Button>
          )}
        </div>
        <Button
          variant="destructive"
          size="md"
          icon="trash-alt"
          onClick={handleClearBookmarksClick}>
          Clear Bookmarks
        </Button>
      </VerticalGroup>
    );
  }

  render() {
    const { renderSearchHistory, renderBookmarks } = this;
    return (
      <div className={IndexPageContainer}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
export { IndexPageProps };

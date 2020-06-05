import React from 'react';
import { Button, VerticalGroup } from '@grafana/ui';
import { connect } from 'react-redux';

import { IndexPageContainer, IndexPageBtnWithNoSpacing, IndexColumnsList } from './styles';
import { clearBookmarks } from '../../actions/bookmarks';
import { clearSearchHistory, querySearch, setSearch } from '../../actions/search';
import { RootState } from '../../reducers';
import { SearchQuery } from '../../actions/types';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.bookmarks.items,
  searchHistory: state.search.history,
});

const dispatchProps = {
  clearBookmarks,
  clearSearchHistory,
  querySearch,
  setSearch,
};

interface IndexPageProps {
  searchClicked: () => void,
  bookmarkClicked: (entityId: string) => void,
};

type _IndexPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & IndexPageProps;

class IndexPage extends React.Component<_IndexPageProps> {

  constructor(props: _IndexPageProps) {
    super(props);
    this.handleClearSearchHistoryClick = this.handleClearSearchHistoryClick.bind(this);
    this.handleClearBookmarksClick = this.handleClearBookmarksClick.bind(this);
    this.handleSearchHistoryClick = this.handleSearchHistoryClick.bind(this);
    this.handleBookmarksClick = this.handleBookmarksClick.bind(this);
    this.renderSearchHistory = this.renderSearchHistory.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
  }

  handleBookmarksClick(entityId: string) {
    this.props.bookmarkClicked(entityId);
  }

  handleClearBookmarksClick() {
    this.props.clearBookmarks();
  }

  handleSearchHistoryClick(query: SearchQuery) {
    this.props.querySearch(query);
    this.props.setSearch(query);
    this.props.searchClicked();
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
              {item}
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
          <h4>Bookmarked Results:</h4>
          {renderBookmarks()}          
          <h4>Latest Searches:</h4>
          {renderSearchHistory()}
        </VerticalGroup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { clearBookmarks, clearSearchHistory, querySearch, setSearch }
)(IndexPage);
export { IndexPageProps };

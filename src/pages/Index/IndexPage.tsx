import React from 'react';
import { Button, VerticalGroup } from '@grafana/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearBookmarks, clearSearchHistory, querySearch, openDetail } from '../../actions/search';
import { RootState } from '../../reducers/reducers';
import { SearchQuery, BookmarkItem, OpenDetailAction, QuerySearchAction } from '../../actions/types';
import { ThunkDispatch } from 'redux-thunk';
import { indexColumnsList, indexPageBtnWithNoSpacing, indexPageContainer } from './styles';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.search.bookmarks,
  searchHistory: state.search.history,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, QuerySearchAction | OpenDetailAction>) =>
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
    // TODO: will need to pass type as well eventually
    this.props.openDetail(item.id);
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
      return (
        <p>No search queries in history.</p>
      );
    }

    return (
      <VerticalGroup spacing="md">
        <div className={indexColumnsList}>
          {searchHistory.map((item, index) => 
            <Button
              key={index}
              variant="link"
              size="md"
              icon="search"
              className={indexPageBtnWithNoSpacing}
              onClick={() => onSearchHistoryClick(item)}>
              {item.pattern}
            </Button>
          )}
        </div>          
        <Button
          variant="destructive"
          size="md"
          icon="trash-alt"
          onClick={onClearSearchHistoryClick}>
          Clear History
        </Button>
      </VerticalGroup>
    );
  }

  renderBookmarks() {
    const { props, onBookmarksClick, onClearBookmarksClick } = this;
    const { bookmarks } = props;

    if (bookmarks.length === 0) {
      return (
        <p>No bookmarks saved.</p>
      );
    }

    return (
      <VerticalGroup spacing="md">
        <div className={indexColumnsList}>
          {bookmarks.map((item, index) => 
            <Button
              key={index}
              variant="link"
              size="md"
              icon="star"
              className={indexPageBtnWithNoSpacing}
              onClick={() => onBookmarksClick(item)}>
              {item.id}
            </Button>
          )}
        </div>
        <Button
          variant="destructive"
          size="md"
          icon="trash-alt"
          onClick={onClearBookmarksClick}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
export { IndexPageProps };

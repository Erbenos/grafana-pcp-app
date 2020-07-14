import React from 'react';
import { VerticalGroup, Pagination, withTheme, Themeable, HorizontalGroup } from '@grafana/ui';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/reducer';
import { FetchStatus } from 'store/slices/search/shared/state';
import { paginationContainer, searchPageElapsed, searchPageMatchesDesc } from './styles';
import { querySearch, openDetail } from 'store/slices/search/shared/actionCreators';
import Loader from 'components/Loader/Loader';
import { TextItemResponse } from 'models/endpoints/search';
import SearchResult from 'components/SearchResult/SearchResult';
import { stripHtml } from 'utils/utils';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, openDetail }, dispatch);

export type SearchPageReduxStateProps = ReturnType<typeof mapStateToProps>;

export type SearchPageReduxDispatchProps = ReturnType<typeof mapDispatchToProps>;

export type SearchPageReduxProps = SearchPageReduxStateProps & SearchPageReduxDispatchProps;

export type SearchPageProps = SearchPageReduxProps & Themeable;

export class SearchPage extends React.Component<SearchPageProps, {}> {
  constructor(props: SearchPageProps) {
    super(props);
    this.onPaginationClick = this.onPaginationClick.bind(this);
    this.onDetailClick = this.onDetailClick.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.renderMatchesDesc = this.renderMatchesDesc.bind(this);
    this.renderSearchElapsedTime = this.renderSearchElapsedTime.bind(this);
  }

  get pagesCount() {
    const { result } = this.props.search;
    if (result?.data) {
      return Math.ceil(result.data.total / result.data.limit);
    }
    return 0;
  }

  get currentPage() {
    const { result } = this.props.search;
    if (result?.data) {
      return result.data.offset / result.data.limit + 1;
    }
    return 0;
  }

  onPaginationClick(pageNum: number) {
    const { search } = this.props;
    this.props.querySearch({ ...search.query, pageNum });
  }

  onDetailClick(entity: TextItemResponse) {
    if (entity.name !== undefined && entity.type !== undefined) {
      this.props.openDetail(stripHtml(entity.name), entity.type);
    }
  }

  renderMatchesDesc() {
    const { theme, search } = this.props;
    const { result } = search;
    if (!result?.data) {
      return;
    }
    return (
      <div className={searchPageMatchesDesc(theme)}>
        <strong>{result.data.total}</strong> results
      </div>
    );
  }

  renderSearchElapsedTime() {
    const { theme, search } = this.props;
    const { result } = search;
    if (!result?.data) {
      return;
    }
    return (
      <div className={searchPageElapsed(theme)}>
        Elapsed: <strong>{result.data.elapsed}s</strong>
      </div>
    );
  }

  renderResults() {
    const {
      props,
      onPaginationClick,
      onDetailClick,
      pagesCount,
      currentPage,
      renderMatchesDesc,
      renderSearchElapsedTime,
    } = this;
    if (!props.search.result) {
      return <p>No result data.</p>;
    }
    const { data, status } = props.search.result;
    switch (status) {
      case FetchStatus.PENDING:
        if (!data) {
          return <p>Searching&hellip;</p>;
        }
      case FetchStatus.SUCCESS: {
        if (!data) {
          return <p>Incorrect server response.</p>;
        }
        if (data.results.length > 0) {
          return (
            <VerticalGroup spacing="lg">
              <HorizontalGroup justify="space-between" spacing="md">
                {renderMatchesDesc()}
                {renderSearchElapsedTime()}
              </HorizontalGroup>
              <VerticalGroup spacing="lg">
                {data.results.map(x => (
                  <SearchResult item={x} openDetail={entity => onDetailClick(entity)} />
                ))}
              </VerticalGroup>
              {pagesCount > 1 && (
                <div className={paginationContainer}>
                  <Pagination numberOfPages={pagesCount} currentPage={currentPage} onNavigate={onPaginationClick} />
                </div>
              )}
            </VerticalGroup>
          );
        }
        return (
          <VerticalGroup spacing="lg">
            <h4>Results for '{props.search.query.pattern}':</h4>
            <p>There are no results.</p>
          </VerticalGroup>
        );
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching values.</p>;
      }
    }
    return;
  }

  render() {
    const { renderResults, props } = this;
    return <Loader loaded={props.search.result?.status !== FetchStatus.PENDING}>{renderResults()}</Loader>;
  }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SearchPage));

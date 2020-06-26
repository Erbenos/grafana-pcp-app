import React from 'react';
import { VerticalGroup, Pagination, withTheme, Themeable } from '@grafana/ui';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/reducer';
import { FetchStatus } from 'store/slices/search/shared/state';
import { paginationContainer } from './styles';
import { SearchResult } from 'components/SearchResult/SearchResult';
import { querySearch, openDetail } from 'store/slices/search/shared/actionCreators';
import Loader from 'components/Loader/Loader';
import { TextItemResponse } from 'models/endpoints/search';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, openDetail }, dispatch);

type SearchPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & Themeable;

class SearchPage extends React.Component<SearchPageProps, {}> {
  constructor(props: SearchPageProps) {
    super(props);
    this.onPaginationClick = this.onPaginationClick.bind(this);
    this.onDetailClick = this.onDetailClick.bind(this);
    this.renderResults = this.renderResults.bind(this);
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
      this.props.openDetail(entity.name, entity.type);
    }
  }

  renderResults() {
    const { props, onPaginationClick, onDetailClick, pagesCount, currentPage } = this;
    if (!props.search.result) {
      return <p>No result data.</p>;
    }
    const { data, status } = props.search.result;
    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Searching&hellip;</p>;
        }
        if (!data) {
          return <p>Incorrect server response.</p>;
        }
        if (data.items.length > 0) {
          return (
            <VerticalGroup spacing="lg">
              <h4>Results for '{props.search.query.pattern}':</h4>
              <VerticalGroup spacing="lg">
                {data.items.map((x, i) => (
                  <SearchResult item={x} openDetail={entity => onDetailClick(entity)} />
                ))}
              </VerticalGroup>
              <div className={paginationContainer}>
                <Pagination numberOfPages={pagesCount} currentPage={currentPage} onNavigate={onPaginationClick} />
              </div>
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
export { SearchPageProps };

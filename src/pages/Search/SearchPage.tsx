import React from 'react';
import { VerticalGroup, Pagination, withTheme, Themeable } from '@grafana/ui';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/reducer';
import { RedisFulltextItemResponse } from 'store/slices/search/slices/result/state';
import { FetchStatus } from 'store/slices/search/shared/state';
import { paginationContainer } from './styles';
import { SearchResult } from 'components/SearchResult/SearchResult';
import { querySearch, openDetail } from 'store/slices/search/shared/actionCreators';
import Loader from 'components/Loader/Loader';

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

  onPaginationClick(pageNum: number) {
    const { search } = this.props;
    this.props.querySearch({ ...search.query, pageNum });
  }

  onDetailClick(entity: RedisFulltextItemResponse) {
    this.props.openDetail(entity.name, entity.type);
  }

  renderResults() {
    const { props, onPaginationClick, onDetailClick } = this;
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
              <h4>Results:</h4>
              <VerticalGroup spacing="lg">
                {data.items.map((x, i) => (
                  <SearchResult item={x} openDetail={entity => onDetailClick(entity)} />
                ))}
              </VerticalGroup>
              <div className={paginationContainer}>
                <Pagination
                  numberOfPages={data.pagination.numberOfPages}
                  currentPage={data.pagination.currentPage}
                  onNavigate={onPaginationClick}
                />
              </div>
            </VerticalGroup>
          );
        }
        return (
          <VerticalGroup spacing="lg">
            <h4>Results:</h4>
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

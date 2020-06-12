import React from 'react';
import { VerticalGroup, Pagination, Spinner, withTheme, Themeable } from '@grafana/ui';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { SearchResult } from '../../components/SearchResult/SearchResult';
import { RootState } from '../../reducers/reducers';
import { querySearch, openDetail } from '../../actions/search';
import { RedisFulltextItemResponse, FetchStatus } from '../../actions/types';
import { cx, css } from 'emotion';
import { searchPageSpinnerContainer, paginationContainer, searchPageContainer } from './styles';

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
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  onPaginationClick(pageNum: number) {
    const { search } = this.props;
    this.props.querySearch({ ...search.query, pageNum });
  }

  onDetailClick(entity: RedisFulltextItemResponse) {
    this.props.openDetail(entity.name);
  }

  renderSpinner() {
    if (this.props.search.result.status === FetchStatus.PENDING) {
      return (
        <div
          className={cx(
            searchPageSpinnerContainer,
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

  renderResults() {
    const { props, onPaginationClick, onDetailClick } = this;
    const { data, status } = props.search.result;

    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Searching&hellip;</p>;
        }
        if (data === null) {
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
    const { renderSpinner, renderResults } = this;
    return (
      <div className={searchPageContainer}>
        {renderSpinner()}
        {renderResults()}
      </div>
    );
  }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
export { SearchPageProps };

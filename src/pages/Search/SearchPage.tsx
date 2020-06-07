import React from 'react';
import { VerticalGroup, Pagination } from '@grafana/ui';
import { connect } from 'react-redux';

import { SearchResult } from '../../components/SearchResult/SearchResult';
import { SearchPageContainer, PaginationContainer } from './styles';
import { RootState } from '../../reducers';
import { querySearch, openDetail } from '../../actions/search';
import { SearchItemResponse } from 'actions/types';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const dispatchProps = {
  querySearch,
  openDetail,
};

type SearchPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

class SearchPage extends React.Component<SearchPageProps> {

  constructor(props: SearchPageProps) {
    super(props);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleDetailClick = this.handleDetailClick.bind(this);
  }

  handlePaginationClick(pageNum: number) {
    const { search } = this.props;
    this.props.querySearch({ ...search.query, pageNum });
  }

  handleDetailClick(entity: SearchItemResponse) {
    this.props.openDetail(entity.entityId);
  }

  render() {
    const { props, handlePaginationClick, handleDetailClick } = this;
    const { items, pagination } = props.search.result;

    return (
      <div className={SearchPageContainer}>
        {(() => {
          if (items.length > 0) {
            return (
              <VerticalGroup spacing="lg">
                <h4>Results:</h4>
                <VerticalGroup spacing="lg">
                  {items.map((x, i) =>
                    <SearchResult item={x} openDetail={(entity) => handleDetailClick(entity) } />
                  )}
                </VerticalGroup>
                <div className={PaginationContainer}>
                  <Pagination 
                    numberOfPages={pagination.numberOfPages}
                    currentPage={pagination.currentPage}
                    onNavigate={handlePaginationClick} />
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
        })()}
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  { querySearch, openDetail }
)(SearchPage);
export { SearchPageProps };

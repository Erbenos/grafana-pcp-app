import React from 'react';
import { VerticalGroup, Pagination } from '@grafana/ui';
import { connect } from 'react-redux';

import { SearchResult } from '../../components/SearchResult/SearchResult';
import { SearchPageContainer, PaginationContainer } from './styles';
import { RootState } from '../../reducers';
import { addSearchHistory, querySearch } from '../../actions/search';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const dispatchProps = {
  addSearchHistory,
  querySearch,
};

interface SearchPageProps {
  detailClicked: (id: string) => void;
};

type _SearchPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & SearchPageProps;

class SearchPage extends React.Component<_SearchPageProps> {

  constructor(props: _SearchPageProps) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(pageNum: number) {
    const { search } = this.props;
    this.props.querySearch({ ...search.query, pageNum });
  } 

  render() {
    const { props, search } = this;
    const { detailClicked } = props;
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
                    <SearchResult {...x} openDetail={(entityId) => detailClicked(entityId) } />
                  )}
                </VerticalGroup>
                <div className={PaginationContainer}>
                  <Pagination 
                    numberOfPages={pagination.numberOfPages}
                    currentPage={pagination.currentPage}
                    onNavigate={search} />
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
  { addSearchHistory, querySearch }
)(SearchPage);
export { SearchPageProps };

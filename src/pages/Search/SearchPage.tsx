import React from 'react';
import { VerticalGroup, Pagination } from '@grafana/ui';

import { SearchResult } from '../../components/SearchResult/SearchResult';
import { SearchOpt } from '../../components/SearchForm/SearchForm';
import { SearchPageContainer, PaginationContainer } from './styles';

interface SearchPageProps {
  searchOpt: SearchOpt,
  detailClicked: (id: string) => void;
};

interface SearchPageState {
  results: any[],
  pagination: {
    currentPage: number,
    numberOfPages: number
  },
};

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  state: SearchPageState = this.initialState;

  get initialState() {
    return {
      // TODO: swap back after development
      // results: [],
      // pagination: {
      //   currentPage: -1,
      //   numberOfPages: 0,
      // },
      results: [,],
      pagination: {
        currentPage: 1,
        numberOfPages: 5,
      },
    };
  }

  constructor(props: SearchPageProps) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(pageNum: number) {
    console.log('search not implemented');
    const { numberOfPages } = this.state.pagination; 
    this.setState({ pagination: { currentPage: pageNum, numberOfPages }});
  } 

  render() {
    const { detailClicked } = this.props;
    const { results, pagination } = this.state;
    const { search } = this;

    return (
      <div className={SearchPageContainer}>
        {(() => {
          if (results.length > 0) {
            return (
              <VerticalGroup spacing="lg">
                <h4>Results:</h4>
                <VerticalGroup spacing="lg">
                  {[...Array(4)].map((x, i) =>
                    <SearchResult openDetail={() => detailClicked(x) }/>
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

export { SearchPage, SearchPageProps };

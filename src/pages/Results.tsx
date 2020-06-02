import React from 'react';
import { AppPage } from './App';
import { SearchLayout, SearchContainer, FormGroup, MetricsIndexContainer, ResultsContainer, PaginationContainer, ActionsContainer, ButtonWithNoSpacing } from './styles';
import { VerticalGroup, Input, Icon, Button, HorizontalGroup, Checkbox, Pagination } from '@grafana/ui';
import { css } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { SearchState, SearchPageProps } from './Search';
import { SearchResult } from 'components/SearchResult/SearchResult';

interface ResultsPageProps extends SearchPageProps {
};

interface ResultsState extends SearchState {
  pagination: {
    numberOfPages: number,
    currentPage: number,
  }
};

class Results extends React.Component<ResultsPageProps, ResultsState> {

  state = this.initialState;

  get initialState() {
    return {
      search: '',
      origSearch: '',
      pagination: {
        numberOfPages: 10,
        currentPage: 1,
      },
    }
  }

  constructor(props: ResultsPageProps) {
    super(props);
    if (props.search) {
      this.state.search = props.search;
      this.state.origSearch = props.search;
    }
    console.log(this.state);
    this.search = this.search.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
    this.goToSearch = this.goToSearch.bind(this);
  }

  // TODO: abstract this somehow? all this is shared between pages
  searchInputChanged(e: React.FormEvent<HTMLInputElement>) {
    // TODO: hijack input here for autocomplete suggests ?
    this.setState({ search: e.currentTarget.value });
  }

  search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: verify input and request results
    console.log('search lacks implementation');
    // TODO: probably will want to pass pattern as well, but serach itself should be separate in some sort of service
    this.props.navigate(AppPage.Results, { search: this.state.search });
  }

  fetchPage(pageNum: number) {
    console.log('fetch page lacks implementation');
    const { numberOfPages } = this.state.pagination; 
    this.setState({ pagination: { currentPage: pageNum, numberOfPages }});
  }

  goToDetail() {
    this.props.navigate(AppPage.Detail, { search: this.state.origSearch });
  }

  goToSearch() {
    this.props.navigate(AppPage.Search, { search: this.state.search });
  }

  render() {
    return (
      <div className={SearchLayout}>
        <form className={SearchContainer} onSubmit={this.search}>
          <VerticalGroup spacing="sm">
            <div className={FormGroup}>
              <Input
                prefix={<Icon name="search" />}
                value={this.state.search}
                onChange={this.searchInputChanged}
                placeholder="Search Phrase"/>
              <Button
                className={css`margin-left: 16px;`}
                variant="primary"
                size="md"
                type="submit">
                Search
              </Button>
            </div>
            <div className={FormGroup}>
              <HorizontalGroup spacing="lg">
                <Checkbox
                  defaultChecked={true}
                  label="Metrics"
                />
                <Checkbox
                  defaultChecked={true}
                  label="Instances"
                />
                <Checkbox
                  defaultChecked={true}
                  label="Instance Domains"
                />
              </HorizontalGroup>
            </div>
          </VerticalGroup>
        </form>
        <div className={ActionsContainer}>
          <Button
            variant="link"
            size="md"
            icon="book"
            className={ButtonWithNoSpacing}
            onClick={this.goToSearch}>
            Back To Latest Searches &amp; Suggestions
          </Button>
        </div>
        <div className={ResultsContainer}>
          <VerticalGroup spacing="lg">
            <h4>Results:</h4>
            <VerticalGroup spacing="lg">
              {[...Array(4)].map((x, i) => {
                return <SearchResult clicked={this.goToDetail}/>;
              })}
            </VerticalGroup>
            <div className={PaginationContainer}>
              <Pagination 
                numberOfPages={this.state.pagination.numberOfPages}
                currentPage={this.state.pagination.currentPage}
                onNavigate={this.fetchPage} />
            </div>
          </VerticalGroup>
        </div>
        <div className={MetricsIndexContainer}>
          <VerticalGroup spacing="lg">
            <h4>Metrics Index</h4>
            <ReactPlaceholder type="text" rows={10} ready={false}>
            </ReactPlaceholder>
          </VerticalGroup>
        </div>
      </div>
    );
  }
}

export { Results, ResultsPageProps };

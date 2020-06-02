import React from 'react';
import { Button, VerticalGroup, Input, Icon, HorizontalGroup, Checkbox } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder';
import { AppPageProps, AppPage } from './App';
import { SearchLayout, FormGroup, SearchContainer, SuggestionsContainer, MetricsIndexContainer, ButtonWithNoSpacing } from './styles';
import { css } from 'emotion';

interface SearchPagePayload {
  search?: string,
};

interface SearchPageProps extends SearchPagePayload, AppPageProps {
};

interface SearchState {
  search: string;
};

class Search extends React.Component<SearchPageProps, SearchState> {
  
  state = this.initialState;

  get initialState() {
    return { search: '' };
  }

  constructor(props: SearchPageProps) {
    super(props);
    if (props.search) {
      this.state.search = props.search;
    }
    this.search = this.search.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.clearBookmarks = this.clearBookmarks.bind(this);
  }

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

  clearHistory() {
    console.log('clearHistory lacks implementation');
  }

  clearBookmarks() {
    console.log('clearBookmarks lacks implementation');
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
        <div className={SuggestionsContainer}>
          <VerticalGroup spacing="lg">
            <h4>Latest Searches</h4>
            <VerticalGroup spacing="sm">
              <ReactPlaceholder type="text" rows={4} ready={false}>
              </ReactPlaceholder>
              <Button
                variant="link"
                size="md"
                icon="trash-alt"
                className={ButtonWithNoSpacing}
                onClick={this.clearHistory}>
                Clear History
              </Button>
            </VerticalGroup>
            <h4>Bookmarked Searches</h4>
            <VerticalGroup spacing="sm">
              <ReactPlaceholder type="text" rows={4} ready={false}>
              </ReactPlaceholder>
              <Button
                variant="link"
                size="md"
                icon="trash-alt"
                className={ButtonWithNoSpacing}
                onClick={this.clearHistory}>
                Clear Bookmarks
              </Button>
            </VerticalGroup>
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

export { Search, SearchState, SearchPageProps, SearchPagePayload };

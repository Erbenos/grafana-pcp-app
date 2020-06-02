import React from 'react';
import { AppPageProps, AppPage } from './App';
import { SearchLayout, SearchContainer, FormGroup, ActionsContainer, ButtonWithNoSpacing, ResultsContainer, PaginationContainer, MetricsIndexContainer, DetailContainer } from './styles';
import { VerticalGroup, Input, Icon, Button, HorizontalGroup, Checkbox, Pagination, RadioButtonGroup } from '@grafana/ui';
import { css } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription, SearchResultFooter } from 'components/SearchResult/styles';
import _ from 'lodash';

interface DetailPagePayload {
  search?: string,
};

interface DetailPageProps extends AppPageProps, DetailPagePayload {
};

interface DetailState {
};

enum EntityTabOpts {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
};

class Detail extends React.Component<DetailPageProps, DetailState> {
  state = this.initialState;

  get initialState() {
    return {
      search: '',
      // this orig search is really clunky
      origSearch: '',
      pagination: {
        numberOfPages: 10,
        currentPage: 1,
      },
      selectedOption: EntityTabOpts.InstanceDomains,
      options: [
        { label: 'Instance Domains', value: EntityTabOpts.InstanceDomains },
        { label: 'Labels', value: EntityTabOpts.Labels },
        { label: 'Other Meta', value: EntityTabOpts.OtherMeta },
      ],
    }
  }

  constructor(props: DetailPageProps) {
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
    this.goToResults = this.goToResults.bind(this);
    this.previewEntity = this.goToResults.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
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

  goToResults() {
    this.props.navigate(AppPage.Results, { search: this.state.origSearch })
  }

  previewEntity() {
    console.log('previewEntity not implemented.');
  }

  setSelected(selectedOption?: string) {
    this.setState({ selectedOption });
  }

  renderEntityInfoTab() {
    const { selectedOption } = this.state;
    switch (selectedOption) {
      case EntityTabOpts.InstanceDomains:
        return <InstanceDomainsTab/>;
      case EntityTabOpts.Labels:
        return <LabelsTab/>;
      case EntityTabOpts.OtherMeta:
        return <OtherMetaTab/>;
    }
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
          <VerticalGroup spacing="xs">
            <Button
              variant="link"
              size="md"
              icon="book"
              className={ButtonWithNoSpacing}
              onClick={this.goToSearch}>
              Back To Latest Searches &amp; Suggestions
            </Button>
            {this.state.origSearch &&
              <Button
                variant="link"
                size="md"
                icon="list-ul"
                className={ButtonWithNoSpacing}
                onClick={this.goToResults}>
                Back To Results for: <em>{this.state.search}</em>
              </Button>}            
          </VerticalGroup>
        </div>
        <div className={DetailContainer}>
          <article className={SearchResultItem}>
            <header className={SearchResultHeader}>
              <h4 className={SearchResultTitle}>
                statsd.pmda.received
              </h4>
            </header>
            <div className={SearchResultDescription}>
              <ReactPlaceholder type="text" rows={3} ready={false}>
              </ReactPlaceholder>
            </div>
            <footer className={SearchResultFooter}>
              <VerticalGroup spacing="lg">
                <HorizontalGroup spacing="lg">
                  <Button
                    variant="link"
                    size="md"
                    icon="save"
                    className={ButtonWithNoSpacing}
                    onClick={this.goToSearch}>
                    Bookmark This Result
                  </Button>
                  <Button
                    variant="link"
                    size="md"
                    icon="chart-line"
                    className={ButtonWithNoSpacing}
                    onClick={this.previewEntity}>
                    Preview
                  </Button>
                </HorizontalGroup>
                <div className={css`width: 100%`}>
                  <RadioButtonGroup
                    options={this.state.options}
                    disabled={false}
                    value={this.state.selectedOption}
                    onChange={this.setSelected}
                    size="md"
                    fullWidth
                  />
                </div>
                {this.renderEntityInfoTab()}
              </VerticalGroup>
            </footer>
          </article>
        </div>
        <div className={MetricsIndexContainer}>
          <VerticalGroup spacing="lg">            
            <h4>Metrics From Same Namespace</h4>
            <ReactPlaceholder type="text" rows={10} ready={false}>
            </ReactPlaceholder>
          </VerticalGroup>
        </div>
      </div>
    );
  }
}

function InstanceDomainsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Instance Domains</h4>
      <ReactPlaceholder type="text" rows={3} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function LabelsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Labels</h4>
      <ReactPlaceholder type="text" rows={5} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function OtherMetaTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>OtherMeta</h4>
      <ReactPlaceholder type="text" rows={4} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

export { Detail, DetailPageProps, DetailPagePayload };

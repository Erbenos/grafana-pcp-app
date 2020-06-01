// Libraries
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

// Types
import { AppRootProps } from '@grafana/data';
import {
  Input,
  Icon,
  Button,
  VerticalGroup,
  Checkbox,
  HorizontalGroup,
} from '@grafana/ui';
import { SearchLayout, Search, Suggestions, MetricsIndex, Results, FormGroup, Actions } from './styles';
import { css } from 'emotion';

interface FulltextSearchPageState {
  searchVal: string
}

class FulltextSearchPage extends React.Component<AppRootProps, FulltextSearchPageState> {

  constructor(props: AppRootProps) {
    super(props);

    this.state = {
      searchVal: ''
    };
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.updateNav();
  }

  componentDidUpdate(prevProps: AppRootProps) {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    const { path, onNavChanged, meta } = this.props;

    const node = {
      text: 'Performance Co-Pilot',
      img: meta.info.logos.large,
      subTitle: 'Full-text Search',
      url: path,
    };

    onNavChanged({
      node,
      main: node,
    });
  }

  searchInputChanged(e: React.FormEvent<HTMLInputElement>) {
    // TODO: hijack input here for autocomplete suggests ?
    this.setState({ searchVal: e.currentTarget.value });
  }

  search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: verify input and request results
    console.log('search lacks implementation');
  }

  render() {

    return (
      <div className={SearchLayout}>
        <form className={Search} onSubmit={this.search}>
          <VerticalGroup spacing="sm">
            <div className={FormGroup}>
              <Input
                prefix={<Icon name="search" />}
                value={this.state.searchVal}
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
        <div className={Suggestions}>
          <VerticalGroup spacing="lg">
            <h4>Latest Searches</h4>
            <ReactPlaceholder type="text" rows={4} ready={false}>
            </ReactPlaceholder>
            <h4>Bookmarked Searches</h4>
            <ReactPlaceholder type="text" rows={4} ready={false}>
            </ReactPlaceholder>
          </VerticalGroup>
        </div>
        <div className={Results}>
          
        </div>
        <div className={Actions}>

        </div>
        <div className={MetricsIndex}>
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

export { FulltextSearchPage };

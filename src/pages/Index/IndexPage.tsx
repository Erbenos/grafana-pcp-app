import React from 'react';
import { Button, VerticalGroup } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder';

import { IndexPageContainer, IndexPageBtnWithNoSpacing } from './styles';

interface IndexPageProps {};

interface IndexPageState {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  state: IndexPageState = this.initialState;

  get initialState() {
    return {};
  }

  constructor(props: IndexPageProps) {
    super(props);
    this.clearHistory = this.clearHistory.bind(this);
    this.clearBookmarks = this.clearBookmarks.bind(this);
  }

  clearHistory() {
    console.log('clearHistory lacks implementation');
  }

  clearBookmarks() {
    console.log('clearBookmarks lacks implementation');
  }

  render() {
    return (
      <div className={IndexPageContainer}>
        <VerticalGroup spacing="lg">
          <h4>Latest Searches</h4>
          <VerticalGroup spacing="sm">
            <ReactPlaceholder type="text" rows={4} ready={false}>
            </ReactPlaceholder>
            <Button
              variant="link"
              size="md"
              icon="trash-alt"
              className={IndexPageBtnWithNoSpacing}
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
              className={IndexPageBtnWithNoSpacing}
              onClick={this.clearHistory}>
              Clear Bookmarks
            </Button>
          </VerticalGroup>
        </VerticalGroup>
      </div>
    );
  }
}

export { IndexPage, IndexPageProps };

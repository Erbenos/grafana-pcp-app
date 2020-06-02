import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import { SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription, SearchResultFooter } from './styles';
import _ from 'lodash';
import { HorizontalGroup, Button } from '@grafana/ui';
import { ButtonWithNoSpacing } from 'pages/styles';

const randomMetricNames = [
  'statsd.pmda.received',
  'proc.psinfo.age',
  'kernel.cpu.util.user',
  'quota.project.files.time_left',
  'disk.md.read_merge',
  'disk.dm.read',
  'disk.dev.total_bytes',
  'mem.util.mapped',
  'kernel.percpu.interrupts.PIW',
  'hinv.map.dmname',
  'kvm.nmi_injections',
];

interface SearchResultResponseItem {
  clicked: () => void;
};

class SearchResult extends React.PureComponent<SearchResultResponseItem> {

  constructor(props: SearchResultResponseItem) {
    super(props);
  }
  
  render() {
    return (
      <article className={SearchResultItem}>
        <header className={SearchResultHeader}>
          <h4 className={SearchResultTitle}>{_.sample(randomMetricNames)}</h4>
        </header>
        <div className={SearchResultDescription}>
          <ReactPlaceholder type="text" rows={2} ready={false}>
          </ReactPlaceholder>
        </div>
        <footer className={SearchResultFooter}>
          <HorizontalGroup spacing="lg" justify="space-between">
            <Button
              variant="link"
              size="md"
              icon="eye"
              className={ButtonWithNoSpacing}
              onClick={this.props.clicked}>
              Read More
            </Button>
            <HorizontalGroup spacing="md">
              <Button
                variant="link"
                size="md"
                className={ButtonWithNoSpacing}
                onClick={this.props.clicked}>
                Instance Domain
              </Button>
              <Button
                variant="link"
                size="md"
                className={ButtonWithNoSpacing}
                onClick={this.props.clicked}>
                Labels
              </Button>
              <Button
                variant="link"
                size="md"
                className={ButtonWithNoSpacing}
                onClick={this.props.clicked}>
                Other Meta
              </Button>
            </HorizontalGroup>
          </HorizontalGroup>
        </footer>
      </article>
    );
  }
}

export { SearchResult };

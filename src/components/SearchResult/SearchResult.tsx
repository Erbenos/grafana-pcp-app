import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import _ from 'lodash';
import { HorizontalGroup, Button } from '@grafana/ui';

import {
  SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription,
  SearchResultFooter, SearchResultBtnWithNoSpacing
} from './styles';

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
  openDetail: () => void;
};

class SearchResult extends React.PureComponent<SearchResultResponseItem> {

  constructor(props: SearchResultResponseItem) {
    super(props);
  }
  
  render() {
    const { props } = this;
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
              className={SearchResultBtnWithNoSpacing}
              onClick={props.openDetail}>
              Read More
            </Button>
            <HorizontalGroup spacing="md">
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={props.openDetail}>
                Instance Domain
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={props.openDetail}>
                Labels
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={props.openDetail}>
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

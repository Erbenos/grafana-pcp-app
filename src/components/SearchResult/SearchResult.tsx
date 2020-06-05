import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import _ from 'lodash';
import { HorizontalGroup, Button } from '@grafana/ui';

import { SearchItemResponse } from '../../actions/types';
import {
  SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription,
  SearchResultFooter, SearchResultBtnWithNoSpacing
} from './styles';

interface SearchResultProps extends SearchItemResponse {
  openDetail: (entityId: string) => void;
};

class SearchResult extends React.PureComponent<SearchResultProps> {

  constructor(props: SearchResultProps) {
    super(props);
  }
  
  render() {
    const { props } = this;
    return (
      <article className={SearchResultItem}>
        <header className={SearchResultHeader}>
          <h4 className={SearchResultTitle}>{props.name}</h4>
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
              onClick={() => props.openDetail(this.props.entityId)}>
              Read More
            </Button>
            <HorizontalGroup spacing="md">
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.entityId)}>
                Instance Domain
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.entityId)}>
                Labels
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.entityId)}>
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

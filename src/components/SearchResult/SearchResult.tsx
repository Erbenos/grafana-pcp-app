import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import _ from 'lodash';
import { HorizontalGroup, Button } from '@grafana/ui';

import { SearchItemResponse } from '../../actions/types';
import {
  SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription,
  SearchResultFooter, SearchResultBtnWithNoSpacing
} from './styles';

interface SearchResultProps {
  item: SearchItemResponse,
  openDetail: (entity: SearchItemResponse) => void;
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
          <h4 className={SearchResultTitle}>{props.item.name}</h4>
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
              onClick={() => props.openDetail(this.props.item)}>
              Read More
            </Button>
            <HorizontalGroup spacing="md">
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.item)}>
                Instance Domain
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.item)}>
                Labels
              </Button>
              <Button
                variant="link"
                size="md"
                className={SearchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(this.props.item)}>
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

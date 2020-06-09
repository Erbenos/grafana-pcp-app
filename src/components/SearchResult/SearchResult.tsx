import React from 'react';
import { HorizontalGroup, Button } from '@grafana/ui';

import { SearchItemResponse } from '../../actions/types';
import {
  searchResultDescription,
  searchResultFooter,
  searchResultBtnWithNoSpacing,
  searchResultItem,
  searchResultHeader,
  searchResultTitle,
} from './styles';

interface SearchResultProps {
  item: SearchItemResponse;
  openDetail: (entity: SearchItemResponse) => void;
}

class SearchResult extends React.PureComponent<SearchResultProps, {}> {
  constructor(props: SearchResultProps) {
    super(props);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  get hasInstanceDomains() {
    return this.props.item.indom !== 'PM_INDOM_NULL';
  }

  renderDesc() {
    const { item } = this.props;
    let description;
    if (item.oneline) {
      description = item.oneline;
    } else if (item.helptext) {
      description = item.helptext;
    }
    return <div className={searchResultDescription}>{description && <p>{description}</p>}</div>;
  }

  renderFooter() {
    const { props, hasInstanceDomains } = this;
    return (
      <footer className={searchResultFooter}>
        <HorizontalGroup spacing="lg" justify="space-between">
          <Button
            variant="link"
            size="md"
            icon="eye"
            className={searchResultBtnWithNoSpacing}
            onClick={() => props.openDetail(props.item)}
          >
            Read More
          </Button>
          <HorizontalGroup spacing="md">
            {hasInstanceDomains && (
              <Button
                variant="link"
                size="md"
                className={searchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(props.item)}
              >
                Instance Domain
              </Button>
            )}
            {hasInstanceDomains && (
              <Button
                variant="link"
                size="md"
                className={searchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(props.item)}
              >
                Labels
              </Button>
            )}
            <Button
              variant="link"
              size="md"
              className={searchResultBtnWithNoSpacing}
              onClick={() => props.openDetail(props.item)}
            >
              Other Meta
            </Button>
          </HorizontalGroup>
        </HorizontalGroup>
      </footer>
    );
  }

  render() {
    const { props, renderDesc, renderFooter } = this;
    const { item } = props;
    return (
      <article className={searchResultItem}>
        <header className={searchResultHeader}>
          <h4 className={searchResultTitle}>{item.name}</h4>
        </header>
        {renderDesc()}
        {renderFooter()}
      </article>
    );
  }
}

export { SearchResult };

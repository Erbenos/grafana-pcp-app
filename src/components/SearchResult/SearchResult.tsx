import React from 'react';
import { HorizontalGroup, Button } from '@grafana/ui';

import {
  searchResultDescription,
  searchResultFooter,
  searchResultBtnWithNoSpacing,
  searchResultItem,
  searchResultHeader,
  searchResultTitle,
} from './styles';
import { TextItemResponse } from 'models/endpoints/search';

interface SearchResultProps {
  item: TextItemResponse;
  openDetail: (entity: TextItemResponse) => void;
}

class SearchResult extends React.PureComponent<SearchResultProps, {}> {
  constructor(props: SearchResultProps) {
    super(props);
    this.renderName = this.renderName.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  renderDesc() {
    const { item } = this.props;
    let description;
    if (item.oneline) {
      description = item.oneline;
    } else if (item.helptext) {
      description = item.helptext;
    } else {
      description = 'No description.';
    }
    return (
      <div className={searchResultDescription}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    );
  }

  renderFooter() {
    const { props } = this;
    return (
      <footer className={searchResultFooter}>
        <HorizontalGroup spacing="lg" justify="space-between">
          <Button
            variant="link"
            size="md"
            icon="arrow-right"
            className={searchResultBtnWithNoSpacing}
            onClick={() => props.openDetail(props.item)}
          >
            Read More
          </Button>
        </HorizontalGroup>
      </footer>
    );
  }

  renderName() {
    const { item } = this.props;
    return item.name;
  }

  render() {
    const { renderDesc, renderFooter, renderName } = this;
    return (
      <article className={searchResultItem}>
        <header className={searchResultHeader}>
          <h4 className={searchResultTitle}>{renderName()}</h4>
        </header>
        {renderDesc()}
        {renderFooter()}
      </article>
    );
  }
}

export { SearchResult };

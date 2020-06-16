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
import { EntityType } from 'store/slices/search/shared/state';
import { PmApiSearchItemResponse } from 'mocks/responses';

interface SearchResultProps {
  item: PmApiSearchItemResponse;
  openDetail: (entity: PmApiSearchItemResponse) => void;
}

class SearchResult extends React.PureComponent<SearchResultProps, {}> {
  constructor(props: SearchResultProps) {
    super(props);
    this.renderName = this.renderName.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  get hasInstanceDomains() {
    return this.props.item.indom !== 'PM_INDOM_NULL';
  }

  get isMetric() {
    return this.props.item.type === EntityType.Metric;
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
    const { props, hasInstanceDomains, isMetric } = this;
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
            {hasInstanceDomains && isMetric && (
              <Button
                variant="link"
                size="md"
                className={searchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(props.item)}
              >
                Instance Domain
              </Button>
            )}
            {hasInstanceDomains && isMetric && (
              <Button
                variant="link"
                size="md"
                className={searchResultBtnWithNoSpacing}
                onClick={() => props.openDetail(props.item)}
              >
                Labels
              </Button>
            )}
          </HorizontalGroup>
        </HorizontalGroup>
      </footer>
    );
  }

  renderName() {
    const { item } = this.props;
    switch (item.type) {
      case EntityType.Metric:
        return item.name;
      case EntityType.InstanceDomain:
        return item.indom;
      default:
        return 'no name';
    }
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

import React from 'react';
import { css } from 'emotion';

interface SearchResponse {}

class SearchResult extends React.PureComponent<SearchResponse> {
  render() {
    return (
      <article className={css`
          flex-direction: column;
      `}>
        <header>
          <h2>stats.pmda.received</h2>
        </header>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque semper nisl eget massa accumsan eleifend.
          Maecenas porttitor elementum odio sit amet semper.
          Aliquam ullamcorper et magna a lobortis.
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Duis auctor elit suscipit vestibulum auctor.
        </div>
        <footer>

        </footer>
      </article>
    );
  }
}

export { SearchResult };

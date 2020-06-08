import { css } from 'emotion';

const SearchResultItem = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchResultHeader = css`
`;

const SearchResultTitle = css`
  margin-bottom: 16px;
`;

const SearchResultDescription = css`
  font-size: 0.85rem;
  margin-bottom: 8px;
  white-space: pre-line;

  > p:last-child {
    margin-bottom: 0;
  }
`;

const SearchResultFooter = css`
`;

const SearchResultBtnWithNoSpacing = css`
  padding: 0;
`;

export { SearchResultItem, SearchResultHeader, SearchResultTitle, SearchResultDescription, SearchResultFooter, SearchResultBtnWithNoSpacing };

import { css } from 'emotion';

const searchResultItem = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const searchResultHeader = css``;

const searchResultTitle = css`
  margin-bottom: 16px;
`;

const searchResultDescription = css`
  font-size: 0.85rem;
  margin-bottom: 8px;
  white-space: pre-line;

  > p:last-child {
    margin-bottom: 0;
  }
`;

const searchResultFooter = css``;

const searchResultBtnWithNoSpacing = css`
  padding: 0;
`;

export {
  searchResultItem,
  searchResultHeader,
  searchResultTitle,
  searchResultDescription,
  searchResultFooter,
  searchResultBtnWithNoSpacing,
};

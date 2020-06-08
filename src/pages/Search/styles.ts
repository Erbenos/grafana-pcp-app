import { css } from 'emotion';

const SearchPageContainer = css`
  grid-area: content;
  position: relative;
`;

const SearchPageSpinnerContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PaginationContainer = css`
  margin: 0 auto;
`;

export { SearchPageContainer, SearchPageSpinnerContainer, PaginationContainer };

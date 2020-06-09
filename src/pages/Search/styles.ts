import { css } from 'emotion';

const searchPageContainer = css`
  grid-area: content;
  position: relative;
`;

const searchPageSpinnerContainer = css`
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

const paginationContainer = css`
  margin: 0 auto;
`;

export { searchPageContainer, searchPageSpinnerContainer, paginationContainer };

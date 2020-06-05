import { css } from 'emotion';

const IndexPageContainer = css`
  grid-area: content;
`;

const IndexPageBtnWithNoSpacing = css`
  padding: 0;
`;

const IndexColumnsList = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    flex: 1 1 50%;
  }

  > *:nth-child(2n + 3),
  > *:nth-child(2n + 4) {
    margin-top: 8px;
  }
`;

export { IndexPageContainer, IndexPageBtnWithNoSpacing, IndexColumnsList };

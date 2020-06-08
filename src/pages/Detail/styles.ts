import { css } from 'emotion';

const DetailPageContainer = css`
  grid-area: content;
  position: relative;
`;

const DetailPageSpinnerContainer = css`
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

const DetailPageItem = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DetailPageHeader = css`
`;

const DetailPageTitle = css`
  margin-bottom: 24px;
`;

const DetailPageDescription = css`
  font-size: 0.85rem;
  margin-bottom: 8px;
  white-space: pre-line;

  > p:last-child {
    margin-bottom: 0;
  }
`;

const DetailPageFooter = css`
`;

const DetailPageBtn = css`
  padding: 0;
`;

export { DetailPageContainer, DetailPageSpinnerContainer, DetailPageItem, DetailPageHeader, DetailPageTitle, DetailPageDescription, DetailPageFooter, DetailPageBtn };

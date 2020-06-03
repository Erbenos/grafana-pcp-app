import { css } from 'emotion';

const DetailPageContainer = css`
  grid-area: content;
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
`;

const DetailPageFooter = css`
`;

const DetailPageBtn = css`
  padding: 0;
`;

export { DetailPageContainer, DetailPageItem, DetailPageHeader, DetailPageTitle, DetailPageDescription, DetailPageFooter, DetailPageBtn };

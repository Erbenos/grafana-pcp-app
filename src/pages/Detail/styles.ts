import { css } from 'emotion';

const detailPageContainer = css`
  grid-area: content;
`;

const detailPageItem = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const detailPageHeader = css``;

const detailPageTitle = css`
  margin-bottom: 24px;
`;

const detailPageDescription = css`
  margin-bottom: 8px;
  white-space: pre-line;

  > p:last-child {
    margin-bottom: 0;
  }
`;

const detailPageFooter = css``;

const detailPageBtn = css`
  padding: 0;
`;

const otherMetaItemList = css`
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

  @media screen and (max-width: 600px) {
    > * {
      flex: 1 1 100%;
      margin-top: 8px;
    }
  }
`;

const otherMetaItem = css``;

const otherMetaItemTitle = css`
  display: block;
  font-weight: bold;
`;

const otherMetaItemValue = css`
  display: block;
`;

const instanceDomainContent = css``;

const instanceDomainItemList = css`
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const radioBtnGroupContainer = css`
  width: 100%;
`;

export {
  detailPageContainer,
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageDescription,
  detailPageFooter,
  detailPageBtn,
  otherMetaItemList,
  otherMetaItem,
  otherMetaItemTitle,
  otherMetaItemValue,
  radioBtnGroupContainer,
  instanceDomainContent,
  instanceDomainItemList,
};

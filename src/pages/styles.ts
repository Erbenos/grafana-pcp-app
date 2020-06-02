import { css } from 'emotion';

const SearchLayout = css`
  display: grid;
  grid-template-areas: "header actions"
                       "content aside";
  grid-template-columns: auto 250px;
  grid-template-rows: auto auto;
  grid-gap: 32px;

  @media screen and (max-width: 1024px) {
    grid-template-areas: "header" "content" "actions" "aside";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const SearchContainer = css`
  display: flex;
  grid-area: header;
`;

const ActionsContainer = css`
  grid-area: actions;
`;

const SuggestionsContainer = css`
  grid-area: content;
`;

const ResultsContainer = css`
  grid-area: content;
`;

const DetailContainer = css`
  grid-area: content;
`;

const MetricsIndexContainer = css`
  grid-area: aside;
`;

const PaginationContainer = css`
  margin: 0 auto;
`;

const FormGroup = css`
  display: flex;
  width: 100%;
`;

const ButtonWithNoSpacing = css`
  padding: 0;
`;

export { 
  SearchLayout, SearchContainer, ActionsContainer, SuggestionsContainer,
  ResultsContainer, PaginationContainer, MetricsIndexContainer,
  FormGroup, ButtonWithNoSpacing, DetailContainer
};

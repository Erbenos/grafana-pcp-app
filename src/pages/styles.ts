import { css } from 'emotion';

const SearchLayout = css`
  display: grid;
  grid-template-areas: "header actions" "content aside";
  grid-template-columns: auto 250px;
  grid-template-rows: auto auto;
  grid-gap: 32px;

  @media screen and (max-width: 1024px) {
    grid-template-areas: "header" "content" "actions" "aside";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const Search = css`
  display: flex;
  grid-area: header;
`;

const Actions = css`
  grid-area: actions;
`;

const Suggestions = css`
  grid-area: content;
`;

const Results = css`
  grid-area: content;
`;

const MetricsIndex = css`
  grid-area: aside;
`;

const FormGroup = css`
  display: flex;
  width: 100%;
`;

export { SearchLayout, Search, Actions, Suggestions, Results, MetricsIndex, FormGroup };

import React from 'react';
import { VerticalGroup, Button } from "@grafana/ui";

import { SearchOpt } from '../SearchForm/SearchForm';
import { AppPage } from '../../App';
import { ActionsBtnWithNoSpacing } from './styles';

interface ActionsProps {
  searchOpt: SearchOpt,
  page: AppPage,
  goToIndex: () => void,
  backToLatestSearch: () => void,
};

interface ActionsState {};

class Actions extends React.Component<ActionsProps, ActionsState> {
  state: ActionsState = this.initialState;

  get initialState() {
    return {};
  }

  constructor(props: ActionsProps) {
    super(props);
  }

  get showBackToPatternBtn() {
    const { searchOpt, page } = this.props;
    return searchOpt.pattern && page === AppPage.Detail;
  }

  render() {
    const { showBackToPatternBtn, props } = this; 
    const { goToIndex, backToLatestSearch, searchOpt } = props;
    return (
      <VerticalGroup spacing="xs">
        <Button
          variant="link"
          size="md"
          icon="book"
          className={ActionsBtnWithNoSpacing}
          onClick={goToIndex}>
          Back To Latest Searches &amp; Suggestions
        </Button>
        {showBackToPatternBtn &&
          <Button
            variant="link"
            size="md"
            icon="list-ul"
            className={ActionsBtnWithNoSpacing}
            onClick={backToLatestSearch}>
            Back To Results for: <em>{searchOpt.pattern}</em>
          </Button>}            
      </VerticalGroup>
    );
  }
}

export { Actions, ActionsProps };

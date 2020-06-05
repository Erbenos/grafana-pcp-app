import React from 'react';
import { VerticalGroup, Button } from "@grafana/ui";
import { connect } from 'react-redux';

import { AppPage } from '../../App';
import { ActionsBtnWithNoSpacing } from './styles';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

interface ActionsProps {
  page: AppPage,
  goToIndex: () => void,
  backToLatestSearch: () => void,
};

type _ActionsProps = ReturnType<typeof mapStateToProps> & ActionsProps;

class Actions extends React.Component<_ActionsProps> {

  constructor(props: _ActionsProps) {
    super(props);
  }

  get showBackToPatternBtn() {
    const { search, page } = this.props;
    return search.query.pattern && page === AppPage.Detail;
  }

  get showBackToIndexPageBtn() {
    return this.props.page !== AppPage.Index; 
  }

  render() {
    const { showBackToPatternBtn, showBackToIndexPageBtn, props } = this; 
    const { goToIndex, backToLatestSearch, search } = props;
    return (
      <VerticalGroup spacing="xs">
        {showBackToIndexPageBtn &&
          <Button
            variant="link"
            size="md"
            icon="book"
            className={ActionsBtnWithNoSpacing}
            onClick={goToIndex}>
            Back To Latest Searches &amp; Suggestions
          </Button>}
        {showBackToPatternBtn &&
          <Button
            variant="link"
            size="md"
            icon="list-ul"
            className={ActionsBtnWithNoSpacing}
            onClick={backToLatestSearch}>
            Back To Results for: <em>{search.query.pattern}</em>
          </Button>}            
      </VerticalGroup>
    );
  }
}

export default connect(
  mapStateToProps,
  {},
)(Actions);
export { ActionsProps };

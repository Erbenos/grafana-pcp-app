import React from 'react';
import { VerticalGroup, Button } from '@grafana/ui';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { actionsBtnWithNoSpacing } from './styles';
import { RootState } from '../../reducers/reducers';
import { SearchView } from '../../actions/types';
import { clearResults, querySearch } from '../../actions/search';
import { bindActionCreators, AnyAction } from 'redux';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, clearResults }, dispatch);

type ActionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Actions extends React.Component<ActionsProps, {}> {
  constructor(props: ActionsProps) {
    super(props);
    this.queryLatestSearch = this.queryLatestSearch.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  get showBackToPatternBtn() {
    const { search } = this.props;
    return search.query.pattern && search.view === SearchView.Detail;
  }

  get showBackToIndexPageBtn() {
    return this.props.search.view !== SearchView.Index;
  }

  clearResults() {
    this.props.clearResults();
  }

  queryLatestSearch() {
    const searchQuery = this.props.search.query;
    this.props.querySearch(searchQuery);
  }

  render() {
    const { clearResults, queryLatestSearch, showBackToPatternBtn, showBackToIndexPageBtn, props } = this;
    const { search } = props;
    return (
      <VerticalGroup spacing="xs">
        {showBackToIndexPageBtn && (
          <Button variant="link" size="md" icon="book" className={actionsBtnWithNoSpacing} onClick={clearResults}>
            Back To Latest Searches &amp; Suggestions
          </Button>
        )}
        {showBackToPatternBtn && (
          <Button
            variant="link"
            size="md"
            icon="list-ul"
            className={actionsBtnWithNoSpacing}
            onClick={queryLatestSearch}
          >
            Back To Results for: <em>{search.query.pattern}</em>
          </Button>
        )}
      </VerticalGroup>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
export { ActionsProps };

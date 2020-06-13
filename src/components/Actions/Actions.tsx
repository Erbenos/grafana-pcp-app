import React from 'react';
import { VerticalGroup, Button } from '@grafana/ui';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { actionsBtnWithNoSpacing } from './styles';
import { RootState } from '../../reducers/reducers';
import { ViewState } from '../../actions/types';
import { openIndex, querySearch } from '../../actions/search';
import { bindActionCreators, AnyAction } from 'redux';

const mapStateToProps = (state: RootState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch, openIndex }, dispatch);

type ActionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Actions extends React.Component<ActionsProps, {}> {
  constructor(props: ActionsProps) {
    super(props);
    this.queryLatestSearch = this.queryLatestSearch.bind(this);
    this.openIndex = this.openIndex.bind(this);
  }

  get showBackToPatternBtn() {
    const { search } = this.props;
    return search.query.pattern && search.view === ViewState.Detail;
  }

  get showBackToIndexPageBtn() {
    return this.props.search.view !== ViewState.Index;
  }

  openIndex() {
    this.props.openIndex();
  }

  queryLatestSearch() {
    const searchQuery = this.props.search.query;
    this.props.querySearch(searchQuery);
  }

  render() {
    const { openIndex, queryLatestSearch, showBackToPatternBtn, showBackToIndexPageBtn, props } = this;
    const { search } = props;
    return (
      <VerticalGroup spacing="xs">
        {showBackToIndexPageBtn && (
          <Button variant="link" size="md" icon="book" className={actionsBtnWithNoSpacing} onClick={openIndex}>
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

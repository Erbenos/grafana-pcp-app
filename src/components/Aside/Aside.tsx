import React from 'react';
import { VerticalGroup } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder/lib';

import { asideContainer } from './styles';
import { connect } from 'react-redux';
import { RootState } from 'store/reducer';
import { ViewState } from 'store/slices/search/slices/view/state';

const mapStateToProps = (state: RootState) => ({
  view: state.search.view,
});

type AsideProps = ReturnType<typeof mapStateToProps>;

class Aside extends React.Component<AsideProps, {}> {
  constructor(props: AsideProps) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
  }

  renderContents() {
    const { view } = this.props;
    switch (view) {
      case ViewState.Detail:
        return (
          <>
            <VerticalGroup spacing="lg">
              <h4>Metrics From Same Namespace</h4>
              <ReactPlaceholder type="text" rows={6} ready={false}>
                &nbsp;
              </ReactPlaceholder>
            </VerticalGroup>
          </>
        );
      default:
        return (
          <>
            <VerticalGroup spacing="lg">
              <h4>Metrics Index</h4>
              <ReactPlaceholder type="text" rows={10} ready={false}>
                &nsbp;
              </ReactPlaceholder>
            </VerticalGroup>
          </>
        );
    }
  }

  render() {
    const { renderContents } = this;
    return <div className={asideContainer}>{renderContents()}</div>;
  }
}

export default connect(mapStateToProps, {})(Aside);

import React from 'react';
import { VerticalGroup } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder/lib';

import { AppPage } from '../../App';
import { AsideContainer } from './styles';

interface AsideProps {
  page: AppPage,
};

interface AsideState {};

class Aside extends React.Component<AsideProps, AsideState> {
  
  constructor(props: AsideProps) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
  }

  renderContents() {
    const { page } = this.props;
    switch (page) {
      case AppPage.Detail:
        return (
          <>
            <VerticalGroup spacing="lg">
              <h4>Metrics From Same Namespace</h4>
              <ReactPlaceholder type="text" rows={6} ready={false}>
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
              </ReactPlaceholder>
            </VerticalGroup>
          </>
        );
    }
  }

  render() {
    const { renderContents } = this;
    return (
      <div className={AsideContainer}>
        {renderContents()}
      </div>
    );
  }
}

export { Aside, AsideProps };

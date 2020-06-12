import React from 'react';
import { VerticalGroup } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder/lib';

class LabelsTab extends React.Component<{}, {}> {
  render() {
    return (
      <VerticalGroup spacing="lg">
        <h4>Labels</h4>
        <ReactPlaceholder type="text" rows={5} ready={false}>
          &nsbp;
        </ReactPlaceholder>
      </VerticalGroup>
    );
  }
}

export default LabelsTab;

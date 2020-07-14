import React from 'react';
import { gridList, gridItem, gridTitle, gridValue } from 'pages/Detail/styles';
import { MetricEntityLabels } from 'models/entities/metric';

export interface LabelsProps {
  labels: MetricEntityLabels;
}

export class Labels extends React.Component<LabelsProps, {}> {
  render() {
    const { labels } = this.props;
    return (
      <div className={gridList}>
        {Object.entries(labels).map(([key, value]) => (
          <div className={gridItem}>
            <span className={gridTitle}>{key}:</span>
            <span className={gridValue}>{value}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Labels;

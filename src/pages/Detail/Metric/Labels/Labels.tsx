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
        {Object.entries(labels).map(([key, value], i) => (
          <div key={i} className={gridItem} data-test={key}>
            <span className={gridTitle}>{key}:</span>
            <span className={gridValue} data-test={`${key}-value`}>
              {value.toString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Labels;

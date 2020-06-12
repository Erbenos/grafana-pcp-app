import React from 'react';
import { VerticalGroup } from '@grafana/ui';
import { otherMetaItemList, otherMetaItem, otherMetaItemTitle, otherMetaItemValue } from '../../styles';

interface OtherMetaTabProps {
  pmid: string;
  type: string;
  sem: string;
  units: string;
}

class OtherMetaTab extends React.Component<OtherMetaTabProps, {}> {
  render() {
    const { pmid, type, sem, units } = this.props;
    return (
      <VerticalGroup spacing="lg">
        <h4>Other Meta</h4>
        <div className={otherMetaItemList}>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>PMID:</span>
            <span className={otherMetaItemValue}>{pmid}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Type:</span>
            <span className={otherMetaItemValue}>{type}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Semantics:</span>
            <span className={otherMetaItemValue}>{sem}</span>
          </div>
          <div className={otherMetaItem}>
            <span className={otherMetaItemTitle}>Units:</span>
            <span className={otherMetaItemValue}>{units}</span>
          </div>
        </div>
      </VerticalGroup>
    );
  }
}

export default OtherMetaTab;

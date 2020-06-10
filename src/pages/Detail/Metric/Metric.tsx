import React from 'react';

import { EntityType } from 'actions/types';
import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup } from '@grafana/ui';
import ReactPlaceholder from 'react-placeholder/lib';
import {
  otherMetaItemList,
  otherMetaItem,
  otherMetaItemTitle,
  otherMetaItemValue,
  detailPageDescription,
  detailPageItem,
  detailPageHeader,
  detailPageTitle,
  detailPageFooter,
  detailPageBtn,
} from '../styles';
import { SelectableValue } from '@grafana/data';
import { css } from 'emotion';
import { PmApiMetricEndpointMetricResponse } from 'mocks/responses';
import { DetailEntityPageProps } from '../DetailPage';

interface MetricDetailPageProps extends DetailEntityPageProps {
  metric: PmApiMetricEndpointMetricResponse;
}

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
}

interface MetricDetailPageState {
  selectedOption: EntityTabOpt;
  options: Array<SelectableValue<EntityTabOpt>>;
}

class MetricDetailPage extends React.Component<MetricDetailPageProps, MetricDetailPageState> {
  state: MetricDetailPageState = this.initialState;

  get initialState() {
    return {
      selectedOption: EntityTabOpt.OtherMeta,
      options: [
        { label: 'Metric Metadata', value: EntityTabOpt.OtherMeta },
        { label: 'Instance Domain', value: EntityTabOpt.InstanceDomains },
        // TODO: will we even render Labels
        // { label: 'Labels', value: EntityTabOpt.Labels },
      ],
    };
  }

  constructor(props: MetricDetailPageProps) {
    super(props);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  get hasInstanceDomains() {
    const { metric } = this.props;
    return metric.indom !== undefined;
  }

  onBookmark() {
    const { metric } = this.props;
    this.props.onBookmark({ id: metric.name, type: EntityType.Metric });
  }

  onPreview() {
    this.props.onPreview();
  }

  renderDesc() {
    const { metric } = this.props;
    let description = metric['text-oneline'];
    if (metric['text-help']) {
      description = metric['text-help'];
    }
    return <div className={detailPageDescription}>{description && <p>{description}</p>}</div>;
  }

  render() {
    const {
      props,
      state,
      renderEntityInfoTab,
      onBookmark,
      onPreview,
      setSelected,
      hasInstanceDomains,
      renderDesc,
    } = this;
    const { metric } = props;
    // TODO: get info from somewhere
    const isBookmarked = false;
    return (
      <article className={detailPageItem}>
        <header className={detailPageHeader}>
          <h2 className={detailPageTitle}>{metric.name}</h2>
        </header>
        {renderDesc()}
        <footer className={detailPageFooter}>
          <VerticalGroup spacing="lg">
            <HorizontalGroup spacing="lg">
              {!isBookmarked && (
                <Button variant="link" size="md" icon="save" className={detailPageBtn} onClick={onBookmark}>
                  Bookmark This Result
                </Button>
              )}
              <Button variant="link" size="md" icon="chart-line" className={detailPageBtn} onClick={onPreview}>
                Preview
              </Button>
            </HorizontalGroup>
            {hasInstanceDomains && (
              <div
                className={css`
                  width: 100%;
                `}
              >
                <RadioButtonGroup
                  options={state.options}
                  disabled={false}
                  value={state.selectedOption}
                  onChange={setSelected}
                  size="md"
                  fullWidth
                />
              </div>
            )}
            {renderEntityInfoTab()}
          </VerticalGroup>
        </footer>
      </article>
    );
  }

  renderEntityInfoTab() {
    const { hasInstanceDomains, state, props } = this;
    const { selectedOption } = state;
    switch (selectedOption) {
      case EntityTabOpt.InstanceDomains:
        if (hasInstanceDomains) {
          return <InstanceDomainsTab />;
        }
        break;
      case EntityTabOpt.Labels:
        if (hasInstanceDomains) {
          return <LabelsTab />;
        }
        break;
      case EntityTabOpt.OtherMeta:
        const { pmid, type, sem, units } = props.metric;
        return <OtherMetaTab pmid={pmid} type={type} sem={sem} units={units} />;
    }
    return;
  }

  setSelected(selectedOption?: EntityTabOpt) {
    if (selectedOption) {
      this.setState({ selectedOption });
    }
  }
}

class InstanceDomainsTab extends React.Component<{}, {}> {
  render() {
    return (
      <VerticalGroup spacing="lg">
        <h4>Instance Domain</h4>
        <ReactPlaceholder type="text" rows={3} ready={false}>
          &nbsp;
        </ReactPlaceholder>
      </VerticalGroup>
    );
  }
}

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

export default MetricDetailPage;
export { MetricDetailPageProps };

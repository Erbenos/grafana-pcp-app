import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { connect } from 'react-redux';
import { addBookmark } from '../../actions/bookmarks';

import {
  DetailPageContainer, DetailPageItem, DetailPageHeader, DetailPageTitle,
  DetailPageDescription, DetailPageFooter, DetailPageBtn
} from './styles';

const dispatchProps = {
  addBookmark,
};

type DetailPageProps = typeof dispatchProps & {
  entityId: string,
};

enum EntityTabOpt {
  InstanceDomains = 'instance-domains',
  Labels = 'labels',
  OtherMeta = 'other-meta',
};

interface DetailPageState {
  selectedOption: EntityTabOpt,
  options: Array<SelectableValue<EntityTabOpt>>,
};

class DetailPage extends React.Component<DetailPageProps, DetailPageState> {
  state: DetailPageState = this.initialState;

  get initialState() {
    return {
      selectedOption: EntityTabOpt.InstanceDomains,
      options: [
        { label: 'Instance Domains', value: EntityTabOpt.InstanceDomains },
        { label: 'Labels', value: EntityTabOpt.Labels },
        { label: 'Other Meta', value: EntityTabOpt.OtherMeta },
      ],
    }
  }

  constructor(props: DetailPageProps) {
    super(props);
    this.renderEntityInfoTab = this.renderEntityInfoTab.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  handleBookmark() {
    const { props } = this;
    props.addBookmark('test bookmark');
  }

  handlePreview() {
    console.log('previewEntity not implemented.');
  }

  renderEntityInfoTab() {
    const { selectedOption } = this.state;
    switch (selectedOption) {
      case EntityTabOpt.InstanceDomains:
        return <InstanceDomainsTab/>;
      case EntityTabOpt.Labels:
        return <LabelsTab/>;
      case EntityTabOpt.OtherMeta:
        return <OtherMetaTab/>;
    }
  }

  setSelected(selectedOption?: EntityTabOpt) {
    if (selectedOption) {
      this.setState({ selectedOption });
    };
  }

  render() {
    const {
      state,
      handleBookmark,
      handlePreview,
      setSelected,
      renderEntityInfoTab
    } = this;
    return (
      <div className={DetailPageContainer}>
        <article className={DetailPageItem}>
          <header className={DetailPageHeader}>
            <h4 className={DetailPageTitle}>
              statsd.pmda.received
            </h4>
          </header>
          <div className={DetailPageDescription}>
            <ReactPlaceholder type="text" rows={3} ready={false}>
            </ReactPlaceholder>
          </div>
          <footer className={DetailPageFooter}>
            <VerticalGroup spacing="lg">
              <HorizontalGroup spacing="lg">
                <Button
                  variant="link"
                  size="md"
                  icon="save"
                  className={DetailPageBtn}
                  onClick={handleBookmark}>
                  Bookmark This Result
                </Button>
                <Button
                  variant="link"
                  size="md"
                  icon="chart-line"
                  className={DetailPageBtn}
                  onClick={handlePreview}>
                  Preview
                </Button>
              </HorizontalGroup>
              <div className={css`width: 100%`}>
                <RadioButtonGroup
                  options={state.options}
                  disabled={false}
                  value={state.selectedOption}
                  onChange={setSelected}
                  size="md"
                  fullWidth
                />
              </div>
              {renderEntityInfoTab()}
            </VerticalGroup>
          </footer>
        </article>
      </div>
    );
  }
}

function InstanceDomainsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Instance Domains</h4>
      <ReactPlaceholder type="text" rows={3} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function LabelsTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>Labels</h4>
      <ReactPlaceholder type="text" rows={5} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

function OtherMetaTab() {
  return (
    <VerticalGroup spacing="lg">
      <h4>OtherMeta</h4>
      <ReactPlaceholder type="text" rows={4} ready={false}>
      </ReactPlaceholder>
    </VerticalGroup>
  );
}

export default connect(
  null,
  { addBookmark }
)(DetailPage);

export { DetailPageProps };

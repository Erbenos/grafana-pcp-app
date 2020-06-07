import { VerticalGroup, HorizontalGroup, Button, RadioButtonGroup } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React from 'react';
import { css } from 'emotion';
import ReactPlaceholder from 'react-placeholder/lib';
import { connect } from 'react-redux';

import {
  DetailPageContainer, DetailPageItem, DetailPageHeader, DetailPageTitle,
  DetailPageDescription, DetailPageFooter, DetailPageBtn
} from './styles';
import { addBookmark } from '../../actions/search';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  entity: state.search.detail,
});

const dispatchProps = {
  addBookmark,
};

type DetailPageProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

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
    const { entity } = props;
    if (entity) {
      const { name, entityId } = entity;
      props.addBookmark({ name, entityId });
    }
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
      props,
      handleBookmark,
      handlePreview,
      setSelected,
      renderEntityInfoTab
    } = this;
    const { entity } = props;
    if (entity) {

      return (
        <div className={DetailPageContainer}>
          <article className={DetailPageItem}>
            <header className={DetailPageHeader}>
              <h4 className={DetailPageTitle}>
                {entity.name}
              </h4>
            </header>
            <div className={DetailPageDescription}>
              <h6>Entity Id</h6>
              <p>
                {entity.entityId}
              </p>
              <h6>Oneline</h6>
              <p>
                {entity.oneline}
              </p>
              <h6>Multiline</h6>
              <p>
                {entity.helptext}
              </p>
              <h6>Entity Type</h6>
              <p>
                {entity.type}
              </p>
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
    return (
      <div className={DetailPageContainer}>
        <article className={DetailPageItem}>
          <p>Entity was not found.</p>
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
  mapStateToProps,
  { addBookmark }
)(DetailPage);

export { DetailPageProps };

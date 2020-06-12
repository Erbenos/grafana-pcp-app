import React from 'react';
import { Spinner, Themeable, withTheme, VerticalGroup } from '@grafana/ui';
import { RootState } from 'reducers/reducers';
import { MetricDetailState, FetchStatus } from 'actions/types';
import { connect } from 'react-redux';
import { cx, css } from 'emotion';
import {
  detailPageSpinnerContainer,
  detailPageDescription,
  instanceDomainContent,
  instanceDomainItemList,
} from '../../styles';

const mapStateToProps = (state: RootState) => ({
  indom: (state.search.entity as MetricDetailState).indom,
});

type InstanceDomainTabProps = ReturnType<typeof mapStateToProps> & Themeable;

class InstanceDomainTab extends React.Component<InstanceDomainTabProps, {}> {
  constructor(props: InstanceDomainTabProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderInstanceDomain = this.renderInstanceDomain.bind(this);
  }

  renderSpinner() {
    const { props } = this;
    const { indom, theme } = props;
    if (!indom) {
      return <p>No indom.</p>;
    }
    const { status } = indom;
    if (status === FetchStatus.PENDING) {
      return (
        <div
          className={cx(
            detailPageSpinnerContainer,
            css`
              background-color: ${theme.colors.bg1}8f;
            `
          )}
        >
          <Spinner size={40} />
        </div>
      );
    }
    return;
  }

  renderDetail() {
    const { props, renderInstanceDomain } = this;
    const { indom } = props;
    if (!indom) {
      return <p>No indom.</p>;
    }
    const { status, data } = indom;
    switch (status) {
      case FetchStatus.PENDING:
      case FetchStatus.SUCCESS: {
        if (status === FetchStatus.PENDING) {
          return <p>Loading&hellip;</p>;
        }
        if (data === null) {
          return <p>Incorrect response</p>;
        }
        return renderInstanceDomain();
      }
      case FetchStatus.ERROR: {
        return <p>Error fetching instance domain.</p>;
      }
    }
    return;
  }

  renderDesc() {
    const { indom } = this.props;
    if (!indom?.data) {
      return <p>Unable to render description.</p>;
    }
    const { data } = indom;
    let description = data['text-oneline'];
    if (data['text-help']) {
      description = data['text-help'];
    }
    return <div className={detailPageDescription}>{description && <p>{description}</p>}</div>;
  }

  renderInstanceDomain() {
    const { props, renderDesc } = this;
    const { indom } = props;
    if (!indom?.data) {
      return <p>No indom.</p>;
    }
    const { data } = indom;
    return (
      <VerticalGroup spacing="md">
        <h4>{data.indom}</h4>
        <div className={instanceDomainContent}>
          <p>{renderDesc()}</p>
          <ul className={instanceDomainItemList}>
            {data.instances.map(instance => (
              <li>
                <strong>{instance.name}</strong> ({instance.instance})
              </li>
            ))}
          </ul>
          <p>Instance Count: {data.instances.length}</p>
        </div>
      </VerticalGroup>
    );
  }

  render() {
    const { renderSpinner, renderDetail } = this;
    return (
      <>
        {renderSpinner()}
        {renderDetail()}
      </>
    );
  }
}

export default withTheme(connect(mapStateToProps, {})(InstanceDomainTab));

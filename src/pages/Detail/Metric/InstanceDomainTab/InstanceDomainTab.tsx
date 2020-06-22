import React from 'react';
import { Themeable, withTheme, VerticalGroup, Button } from '@grafana/ui';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { detailPageDescription, instanceDomainContent, instanceDomainItemList, detailPageBtn } from '../../styles';
import { MetricDetailState } from 'store/slices/search/slices/entity/state';
import { FetchStatus } from 'store/slices/search/shared/state';
import Loader from 'components/Loader/Loader';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, bindActionCreators } from 'redux';
import { openDetail } from 'store/slices/search/shared/actionCreators';
import { EntityType } from 'models/endpoints';

const mapStateToProps = (state: RootState) => ({
  indom: (state.search.entity as MetricDetailState).indom,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ openDetail }, dispatch);

type InstanceDomainTabProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & Themeable;

class InstanceDomainTab extends React.Component<InstanceDomainTabProps, {}> {
  constructor(props: InstanceDomainTabProps) {
    super(props);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderInstanceDomain = this.renderInstanceDomain.bind(this);
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
          <Button
            variant="link"
            size="md"
            icon="eye"
            className={detailPageBtn}
            onClick={() => props.openDetail(data.indom, EntityType.InstanceDomain)}
          >
            Read More
          </Button>
        </div>
      </VerticalGroup>
    );
  }

  render() {
    const { renderDetail, props } = this;
    return <Loader loaded={props.indom?.status !== FetchStatus.PENDING}>{renderDetail()}</Loader>;
  }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(InstanceDomainTab));

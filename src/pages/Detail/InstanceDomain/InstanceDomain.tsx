import React from 'react';
import { DetailEntityPageProps } from '../DetailPage';
import { PmApiIndomEndpointResponse } from 'mocks/responses';

interface InstanceDomainDetailPageProps extends DetailEntityPageProps {
  instanceDomain: PmApiIndomEndpointResponse;
}

class InstanceDomainDetailPage extends React.Component<InstanceDomainDetailPageProps, {}> {
  render() {
    return <p>Instance Domain Detail Page.</p>;
  }
}

export default InstanceDomainDetailPage;

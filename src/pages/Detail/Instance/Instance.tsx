import React from 'react';
import { DetailEntityPageProps } from '../DetailPage';

interface InstanceDetailPageProps extends DetailEntityPageProps {
  instance: any;
}

class InstanceDetailPage extends React.Component<InstanceDetailPageProps, {}> {
  render() {
    return <p>Instance Detail Page.</p>;
  }
}

export default InstanceDetailPage;

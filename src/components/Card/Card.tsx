import React from 'react';
import { withTheme, Themeable } from '@grafana/ui';
import { cardContainer } from './styles';

type CardProps = Themeable & {
  background: 'weak' | 'strong';
};

const Card: React.FC<CardProps> = props => {
  return <div className={cardContainer(props.theme, props.background)}>{props.children}</div>;
};

export default withTheme(Card);
export { CardProps };

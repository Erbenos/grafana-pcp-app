import React from 'react';
import { withTheme, Themeable } from '@grafana/ui';
import { cardContainer } from './styles';

type CardProps = Themeable & {
  background?: 'weak' | 'strong';
};

const Card: React.FC<CardProps> = props => {
  const background = props.background ?? 'strong';
  return (
    <div className={cardContainer(props.theme, background)} data-test={background}>
      {props.children}
    </div>
  );
};

export default withTheme(Card);
export { CardProps };

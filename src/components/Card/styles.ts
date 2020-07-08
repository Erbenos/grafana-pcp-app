import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const cardContainer = (theme: GrafanaTheme, background: 'weak' | 'strong') => css`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: ${theme.border.radius.sm};
  background: ${background === 'strong' ? theme.colors.bg2 : theme.colors.bg1};
`;
// border-width: 1px;
// border-style: solid;
// border-color: ${theme.colors.border1};

export { cardContainer };

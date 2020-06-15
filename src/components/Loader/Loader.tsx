import React from 'react';
import { cx, css } from 'emotion';
import { spinnerContainer, spinner, spinnerOuter } from './styles';
import { Spinner, Themeable, withTheme } from '@grafana/ui';

type LoaderProps = Themeable & { loaded: boolean; boundedContainer?: boolean };

class Loader extends React.Component<LoaderProps, {}> {
  constructor(props: LoaderProps) {
    super(props);
  }

  render() {
    const { loaded, theme } = this.props;
    if (loaded) {
      return this.props.children;
    }
    return (
      <div className={spinnerOuter}>
        <div className={spinnerContainer}>
          <div
            className={cx(
              spinner,
              css`
                background-color: ${theme.colors.bg1}8f;
              `
            )}
          >
            <Spinner size={40} />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withTheme(Loader);
export { LoaderProps };

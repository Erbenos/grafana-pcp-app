import Loader from './Loader';
import React from 'react';
import { shallow, render } from 'enzyme';

describe('<Loader/>', () => {
  test('renders without crashing', () => {
    shallow(<Loader loaded={false} />)
      .dive()
      .dive();
  });

  test('renders loading indicator and children when loaded = false', () => {
    const component = render(<Loader loaded={false} />);
    expect(component.find('[data-test="spinner-container"]').length).toBe(1);
    expect(component.find('[data-test="content-container"]').length).toBe(1);
  });

  test('renders children only when loaded = true', () => {
    const childNode = 'Cheerio';
    const component = render(<Loader loaded={true}>{childNode}</Loader>);
    expect(component.html()).toBe(childNode);
  });
});

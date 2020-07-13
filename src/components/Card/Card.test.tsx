import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';

describe('<Card/>', () => {
  test('renders without crashing', () => {
    shallow(
      <Card>
        <p>Test</p>
      </Card>
    );
  });

  test('should have default background "strong"', () => {
    const card = shallow(
      <Card>
        <p>Default "strong"</p>
      </Card>
    ).dive();
    expect(card.render().prop('data-test')).toBe('strong');
  });

  test('accepts both "strong" and "weak" background types', () => {
    shallow(
      <Card background="strong">
        <p>Strong Bg</p>
      </Card>
    );

    shallow(
      <Card background="weak">
        <p>Weak Bg</p>
      </Card>
    );
  });

  test('renders passed children', () => {
    const child = <div data-test="child">Test</div>;
    const card = shallow(<Card background="strong">{child}</Card>).dive();
    expect(card.find('[data-test="child"]').length).toBe(1);
  });
});

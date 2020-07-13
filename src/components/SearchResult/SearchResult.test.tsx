import { shallow, render } from 'enzyme';
import SearchResult from './SearchResult';
import { TextItemResponse, EntityType } from 'models/endpoints/search';
import React from 'react';

describe('<SearchResult/>', () => {
  const openDetailMock = jest.fn<void, TextItemResponse[]>(() => void 0);
  // will test most cases with each metric type
  const metricItem: TextItemResponse = {
    docid: 'metricItem',
    name: 'statsd.settings.dropped',
    indom: '20.0',
    helptext:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi nam temporibus excepturi corporis atque, quibusdam, suscipit repellat ipsam officiis consectetur, accusamus eaque esse.',
    oneline: 'Lorem, ipsum dolor sit amet.',
    count: 0,
    score: 0,
    type: EntityType.Metric,
  };
  const instanceItem: TextItemResponse = {
    docid: 'instanceItem',
    name: 'cpu0',
    indom: '10.0',
    helptext:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse sit, atque distinctio voluptatum sed maiores iusto quisquam.',
    oneline: 'Lorem, ipsum dolor.',
    count: 0,
    score: 0,
    type: EntityType.Instance,
  };
  const indomItem: TextItemResponse = {
    docid: 'indomItem',
    name: '23.2',
    indom: '23.2',
    helptext: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, cupiditate.',
    oneline: 'Lorem, ipsum.',
    count: 0,
    score: 0,
    type: EntityType.InstanceDomain,
  };

  beforeEach(() => {
    openDetailMock.mockClear();
  });

  test('renders without crashing', () => {
    shallow(<SearchResult item={metricItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
    shallow(<SearchResult item={instanceItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
    shallow(<SearchResult item={indomItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
  });

  test('renders description', () => {
    const onelineMetric = render(<SearchResult item={{ ...metricItem, helptext: '' }} openDetail={openDetailMock} />);
    expect(onelineMetric.find('[data-test="description"]').text().length).toBeGreaterThan(0);
    const helptextMetric = render(<SearchResult item={{ ...metricItem, oneline: '' }} openDetail={openDetailMock} />);
    expect(helptextMetric.find('[data-test="description"]').text().length).toBeGreaterThan(0);

    const onelineInstance = render(
      <SearchResult item={{ ...instanceItem, helptext: '' }} openDetail={openDetailMock} />
    );
    expect(onelineInstance.find('[data-test="description"]').text().length).toBeGreaterThan(0);
    const helptextInstance = render(
      <SearchResult item={{ ...instanceItem, oneline: '' }} openDetail={openDetailMock} />
    );
    expect(helptextInstance.find('[data-test="description"]').text().length).toBeGreaterThan(0);

    const onelineIndom = render(<SearchResult item={{ ...indomItem, helptext: '' }} openDetail={openDetailMock} />);
    expect(onelineIndom.find('[data-test="description"]').text().length).toBeGreaterThan(0);
    const helptextIndom = render(<SearchResult item={{ ...indomItem, oneline: '' }} openDetail={openDetailMock} />);
    expect(helptextIndom.find('[data-test="description"]').text().length).toBeGreaterThan(0);
  });

  test('renders oneline by default', () => {
    const metric = render(<SearchResult item={metricItem} openDetail={openDetailMock} />);
    expect(metric.find('[data-test="description"]').text()).toBe(metricItem.oneline);
    const instance = render(<SearchResult item={instanceItem} openDetail={openDetailMock} />);
    expect(instance.find('[data-test="description"]').text()).toBe(instanceItem.oneline);
    const indom = render(<SearchResult item={indomItem} openDetail={openDetailMock} />);
    expect(indom.find('[data-test="description"]').text()).toBe(indomItem.oneline);
  });

  test('renders read more button', () => {
    const metric = render(<SearchResult item={metricItem} openDetail={openDetailMock} />);
    expect(metric.find('[data-test="read-more"]').length).toBe(1);
    const instance = render(<SearchResult item={instanceItem} openDetail={openDetailMock} />);
    expect(instance.find('[data-test="read-more"]').length).toBe(1);
    const indom = render(<SearchResult item={indomItem} openDetail={openDetailMock} />);
    expect(indom.find('[data-test="read-more"]').length).toBe(1);
  });

  test('can call openDetail', () => {
    const metric = shallow(<SearchResult item={metricItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
    const metricReadMore = metric.find('[data-test="read-more"]');
    metricReadMore.simulate('click');
    expect(openDetailMock.mock.calls[0][0]).toBe(metricItem);
    const instance = shallow(<SearchResult item={instanceItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
    const instanceReadMore = instance.find('[data-test="read-more"]');
    instanceReadMore.simulate('click');
    expect(openDetailMock.mock.calls[1][0]).toBe(instanceItem);
    const indom = shallow(<SearchResult item={indomItem} openDetail={openDetailMock} />)
      .dive()
      .dive();
    const indomReadMore = indom.find('[data-test="read-more"]');
    indomReadMore.simulate('click');
    expect(openDetailMock.mock.calls[2][0]).toBe(indomItem);
    expect(openDetailMock).toHaveBeenCalledTimes(3);
  });

  test('supports HTML inside name', () => {
    const metricName = '<b>statsd</b>.settings.dropped';
    const metricComponent = render(
      <SearchResult item={{ ...metricItem, name: metricName }} openDetail={openDetailMock} />
    );
    expect(metricComponent.find('[data-test="name"]').html()).toBe(metricName);

    const instanceName = 'cpu1';
    const instanceComponent = render(
      <SearchResult item={{ ...instanceItem, name: instanceName }} openDetail={openDetailMock} />
    );
    expect(instanceComponent.find('[data-test="name"]').html()).toBe(instanceName);

    const indomName = '60.1';
    const indomComponent = render(
      <SearchResult item={{ ...indomItem, name: indomName }} openDetail={openDetailMock} />
    );
    expect(indomComponent.find('[data-test="name"]').html()).toBe(indomName);
  });

  test('supports HTML inside description', () => {
    const oneline = '<b>test</b> highlighting';
    const metricComponent = render(<SearchResult item={{ ...metricItem, oneline }} openDetail={openDetailMock} />);
    expect(metricComponent.find('[data-test="description"] p').html()).toBe(oneline);

    const instanceComponent = render(<SearchResult item={{ ...instanceItem, oneline }} openDetail={openDetailMock} />);
    expect(instanceComponent.find('[data-test="description"] p').html()).toBe(oneline);

    const indomComponent = render(<SearchResult item={{ ...indomItem, oneline }} openDetail={openDetailMock} />);
    expect(indomComponent.find('[data-test="description"] p').html()).toBe(oneline);
  });
});

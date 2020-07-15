import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  MetricDetailPage,
  MetricDetailPageReduxProps,
  MetricDetailPageProps,
  MetricDetailPageBasicProps,
  MetricPreviewType,
} from './Metric';
import { EntityType } from 'models/endpoints/search';
import { FetchStatus } from 'store/slices/search/shared/state';
import { MetricEntity } from 'models/entities/metric';

describe('Detail Page <MetricDetailpage/>', () => {
  let mockReduxProps: MetricDetailPageReduxProps;
  let metricDetailEntityProps: MetricDetailPageBasicProps;
  let metricDetailProps: MetricDetailPageProps;

  beforeEach(() => {
    mockReduxProps = {
      bookmarks: [
        {
          id: 'statsd.pmda.received',
          type: EntityType.Metric,
        },
        {
          id: 'statsd.pmda.dropped',
          type: EntityType.Instance,
        },
      ],
    };
    metricDetailEntityProps = {
      onBookmark: jest.fn(),
      onUnbookmark: jest.fn(),
      onPreview: jest.fn(),
      metric: {
        data: {
          name: 'statsd.pmda.parsed',
          oneline: 'random statsd metric oneline help',
          help: 'random statsd metric long help',
          series: [
            {
              series: 'series1',
              meta: {
                indom: 'indom',
                pmid: 'pmid',
                semantics: 'sematics',
                type: 'u64',
                units: 'units',
                source: 'source',
              },
              labels: {
                label1: 'label 1',
                label2: 'label 2',
              },
            },
          ],
        },
        status: FetchStatus.SUCCESS,
      },
    };
    metricDetailProps = { ...mockReduxProps, ...metricDetailEntityProps };
  });

  test('renders without crashing', () => {
    const wrapper = mount(<MetricDetailPage {...metricDetailProps} />);
    wrapper.unmount();
  });

  test('can trigger preview with table dashboard for string metric type', () => {
    (metricDetailProps.metric.data as MetricEntity).series[0].meta.type = 'string';
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    const previewButton = wrapper.find('[data-test="preview-button"]');
    previewButton.simulate('click');
    const metricName = (metricDetailProps.metric.data as MetricEntity).name;
    const previewCallback: jest.Mock<typeof metricDetailProps.onPreview> = metricDetailProps.onPreview as any;
    expect(previewCallback.mock.calls[0][0]).toEqual({ id: metricName, type: MetricPreviewType.Table });
    expect(previewCallback).toHaveBeenCalled();
  });

  test('can trigger preview with graph dashboard for non-string metric type', () => {
    (metricDetailProps.metric.data as MetricEntity).series[0].meta.type = 'u64';
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    const previewButton = wrapper.find('[data-test="preview-button"]');
    previewButton.simulate('click');
    const metricName = (metricDetailProps.metric.data as MetricEntity).name;
    const previewCallback: jest.Mock<typeof metricDetailProps.onPreview> = metricDetailProps.onPreview as any;
    expect(previewCallback.mock.calls[0][0]).toEqual({ id: metricName, type: MetricPreviewType.Graph });
    expect(previewCallback).toHaveBeenCalled();
  });

  test('displays bookmark button when metric is not bookmarked', () => {
    // default props does not contain metric that is bookmarked in items mock
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    expect(wrapper.exists('[data-test="bookmark-button"]')).toBe(true);
  });

  test('displays unbookmark button when metric is bookmarked', () => {
    // this metric is not in bookmarked items mock
    (metricDetailProps.metric.data as MetricEntity).name = 'statsd.pmda.received';
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    expect(wrapper.exists('[data-test="unbookmark-button"]')).toBe(true);
  });

  test('can trigger bookmark', () => {
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    const bookmarkButton = wrapper.find('[data-test="bookmark-button"]');
    bookmarkButton.simulate('click');
    const metricName = (metricDetailProps.metric.data as MetricEntity).name;
    const bookmarkCallback: jest.Mock<typeof metricDetailProps.onBookmark> = metricDetailProps.onBookmark as any;
    expect(bookmarkCallback.mock.calls[0][0]).toEqual({ id: metricName, type: EntityType.Metric });
    expect(bookmarkCallback).toHaveBeenCalled();
  });

  test('can trigger unbookmark', () => {
    (metricDetailProps.metric.data as MetricEntity).name = 'statsd.pmda.received';
    const wrapper = shallow(<MetricDetailPage {...metricDetailProps} />);
    const unbookmarkButton = wrapper.find('[data-test="unbookmark-button"]');
    unbookmarkButton.simulate('click');
    const metricName = (metricDetailProps.metric.data as MetricEntity).name;
    const unbookmarkCallback: jest.Mock<typeof metricDetailProps.onUnbookmark> = metricDetailProps.onUnbookmark as any;
    expect(unbookmarkCallback.mock.calls[0][0]).toEqual({ id: metricName, type: EntityType.Metric });
    expect(unbookmarkCallback).toHaveBeenCalled();
  });

  // TODO: finish these

  // test('displays preview button', () => {});

  // test('displays title', () => {});

  // test('displays description', () => {});

  // test('description prioritizes long help text in description', () => {});

  // test('description falls back to oneline help when long help text is not available', () => {});

  // test('displays series', () => {});

  // test('handles lack of metric data gracefully', () => {});

  // test('handles lack of series gracefully', () => {});

  // test('shows loader when metric is being loaded', () => {});

  // test('hides loader when metric is loaded', () => {});
});

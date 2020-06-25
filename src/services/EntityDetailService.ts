import PmSearchApiService from './PmSearchApiService';
import PmSeriesApiService from './PmSeriesApiService';
import _ from 'lodash';
import { SeriesLabelsItemResponse, SeriesDescResponse } from 'models/endpoints/series';
import { MetricEntitySeries, MetricEntity } from 'models/entities/metric';

type LabelsAndMeta = SeriesLabelsItemResponse[] & SeriesDescResponse;

class EntityService {
  searchService: PmSearchApiService;
  seriesService: PmSeriesApiService;

  constructor(searchService: PmSearchApiService, seriesService: PmSeriesApiService) {
    this.searchService = searchService;
    this.seriesService = seriesService;
  }

  async metric(metric: string) {
    if (metric === '') {
      return null;
    }
    const { seriesService } = this;
    const series = (await seriesService.query({ expr: `${metric}*` })) as string[];
    if (series === null || series.length === 0) {
      return null;
    }
    const [metadata, labels] = await Promise.all([seriesService.descs({ series }), seriesService.labels({ series })]);
    // Transform data
    const entitySeries: _.Dictionary<LabelsAndMeta> = _.groupBy(
      _.merge(metadata ?? {}, labels ?? {}) as LabelsAndMeta,
      'series'
    );
    const entitySeriesTransformed: MetricEntitySeries[] = Object.keys(entitySeries).reduce<MetricEntitySeries[]>(
      (prev: MetricEntitySeries[], val: string) => {
        return [
          ...prev,
          ...(entitySeries[val]
            ? [
                {
                  series: val,
                  meta: _.omit(entitySeries[val][0], 'series', 'labels'),
                  labels: entitySeries[val][0].labels,
                },
              ]
            : {}),
        ];
      },
      []
    );
    return {
      name: metric,
      series: entitySeriesTransformed,
      oneline: 'Monkey patch text-online',
      help: 'Monkey patch text-help',
    } as MetricEntity;
  }

  async indom(indom: string) {}
}

export default EntityService;

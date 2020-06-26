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

  async metric(metric: string): Promise<MetricEntity> {
    if (metric === '') {
      throw Error('Metric identifier cannot be empty.');
    }
    const { seriesService } = this;
    const series: string[] = (await seriesService.query({ expr: `${metric}*` })) as string[];
    const [metadata, labels] = await Promise.all([seriesService.descs({ series }), seriesService.labels({ series })]);
    // Transform data
    const entitySeries: _.Dictionary<LabelsAndMeta> = _.groupBy(_.merge(metadata, labels) as LabelsAndMeta, 'series');
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
    };
  }

  async indom(indom: string) {}
}

export default EntityService;

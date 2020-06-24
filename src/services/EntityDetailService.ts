import PmSearchApiService from './PmSearchApiService';
import PmSeriesApiService from './PmSeriesApiService';

class EntityDetailService {
  searchService: PmSearchApiService;
  seriesService: PmSeriesApiService;

  constructor(searchService: PmSearchApiService, seriesService: PmSeriesApiService) {
    this.searchService = searchService;
    this.seriesService = seriesService;
  }

  async metric(metric: string) {}

  async indom(indom: string) {}
}

export default EntityDetailService;

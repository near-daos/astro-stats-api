import moment from 'moment';
import { Injectable } from '@nestjs/common';
import {
  ContractContext,
  DaoContractContext,
  DaoStatsFunc,
  DaoStatsHistoryService,
  DaoStatsMetric,
  DaoStatsService,
  LeaderboardMetricResponse,
  MetricQuery,
  MetricResponse,
  MetricType,
  PaginationDto,
  TotalMetric,
} from '@dao-stats/common';
import { getGrowth, patchMetricDays } from '../utils';

@Injectable()
export class MetricService {
  constructor(
    private readonly daoStatsService: DaoStatsService,
    private readonly daoStatsHistoryService: DaoStatsHistoryService,
  ) {}

  async total(
    context: DaoContractContext | ContractContext,
    metric: DaoStatsMetric | DaoStatsMetric[],
    func: DaoStatsFunc = 'sum',
  ): Promise<TotalMetric> {
    const { contractId, dao } = context as DaoContractContext;

    const dayAgo = moment().subtract(1, 'days');
    const weekAgo = moment().subtract(1, 'week');

    const [current, prev] = await Promise.all([
      this.daoStatsService.getValue({
        contractId,
        dao,
        metric,
        func,
      }),
      this.daoStatsHistoryService.getLastValue({
        contractId,
        dao,
        metric,
        func,
        from: weekAgo.valueOf(),
        to: dayAgo.valueOf(),
      }),
    ]);

    return {
      count: current,
      growth: getGrowth(current, prev),
    };
  }

  async history(
    context: ContractContext | DaoContractContext,
    metricQuery: MetricQuery,
    metric: DaoStatsMetric | DaoStatsMetric[],
    func?: DaoStatsFunc,
  ): Promise<MetricResponse> {
    const { contractId, dao } = context as DaoContractContext;
    const { from, to } = metricQuery;

    const history = await this.daoStatsHistoryService.getHistory({
      contractId,
      dao,
      metric,
      func,
      from,
      to,
    });

    return {
      metrics: patchMetricDays(
        metricQuery,
        history.map((row) => ({
          timestamp: row.date.valueOf(),
          count: row.value,
        })),
        MetricType.Total,
      ),
    };
  }

  async leaderboard(
    context: ContractContext,
    pagination: PaginationDto,
    metric: DaoStatsMetric | DaoStatsMetric[],
  ): Promise<LeaderboardMetricResponse> {
    const { contractId } = context;
    const { offset, limit } = pagination;

    const dayAgo = moment().subtract(1, 'day');
    const weekAgo = moment().subtract(1, 'week');
    const monthAgo = moment().subtract(1, 'month');

    const { data: leaderboard, total } =
      await this.daoStatsService.getLeaderboard({
        contractId,
        metric,
        offset,
        limit,
      });

    const metrics = await Promise.all(
      leaderboard.map(async ({ dao, value }) => {
        const [prevValue, history] = await Promise.all([
          this.daoStatsHistoryService.getLastValue({
            contractId,
            dao,
            metric,
            from: weekAgo.valueOf(),
            to: dayAgo.valueOf(),
          }),
          this.daoStatsHistoryService.getHistory({
            contractId,
            dao,
            metric,
            from: monthAgo.valueOf(),
          }),
        ]);

        return {
          dao,
          activity: {
            count: value,
            growth: getGrowth(value, prevValue),
          },
          overview: history.map((row) => ({
            timestamp: row.date.valueOf(),
            count: row.value,
          })),
        };
      }),
    );

    return { metrics, total };
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ContractContext,
  DaoContractContext,
  MetricQuery,
} from '@dao-stats/common';
import { FlowMetricType } from '@dao-stats/receipt';
import {
  FlowTotalResponse,
  FlowMetricResponse,
  FlowLeaderboardMetricResponse,
} from './dto';
import { FlowService } from './flow.service';
import { HasDaoContractContext } from '../decorators';
import { MetricQueryPipe } from '../pipes';

@ApiTags('Flow')
@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @ApiResponse({
    status: 200,
    type: FlowTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/')
  async totals(@Param() context: ContractContext): Promise<FlowTotalResponse> {
    return this.flowService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: FlowMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/funds')
  async funds(
    @Param() context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<FlowMetricResponse> {
    return this.flowService.history(context, FlowMetricType.Fund, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: FlowLeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/funds/leaderboard')
  async fundsLeaderboard(
    @Param() context: ContractContext,
  ): Promise<FlowLeaderboardMetricResponse> {
    return this.flowService.leaderboard(context, FlowMetricType.Fund);
  }

  @ApiResponse({
    status: 200,
    type: FlowMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/transactions')
  async transactions(
    @Param() context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<FlowMetricResponse> {
    return this.flowService.history(
      context,
      FlowMetricType.Transaction,
      metricQuery,
    );
  }

  @ApiResponse({
    status: 200,
    type: FlowLeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/transactions/leaderboard')
  async transactionsLeaderboard(
    @Param() context: ContractContext,
  ): Promise<FlowLeaderboardMetricResponse> {
    return this.flowService.leaderboard(context, FlowMetricType.Transaction);
  }

  @ApiResponse({
    status: 200,
    type: FlowTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao')
  async daoTotals(
    @Param() context: DaoContractContext,
  ): Promise<FlowTotalResponse> {
    return this.flowService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: FlowMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/funds')
  async daoFunds(
    @Param() context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<FlowMetricResponse> {
    return this.flowService.history(context, FlowMetricType.Fund, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: FlowMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/transactions')
  async daoTransactions(
    @Param() context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<FlowMetricResponse> {
    return this.flowService.history(
      context,
      FlowMetricType.Transaction,
      metricQuery,
    );
  }
}
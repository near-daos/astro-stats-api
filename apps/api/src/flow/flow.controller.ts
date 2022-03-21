import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ContractContext,
  DaoContractContext,
  MetricQuery,
  PaginationDto,
} from '@dao-stats/common';
import { FlowMetricType } from '@dao-stats/receipt';
import {
  FlowTotalResponse,
  FlowMetricResponse,
  FlowLeaderboardMetricResponse,
} from './dto';
import { FlowService } from './flow.service';
import { HasDaoContractContext } from '../decorators';
import {
  ContractContextPipe,
  MetricQueryPipe,
  PaginationQueryPipe,
} from '../pipes';

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
  async totals(
    @Param(ContractContextPipe) context: ContractContext,
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
  @Get('/funds')
  async funds(
    @Param(ContractContextPipe) context: ContractContext,
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
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<FlowLeaderboardMetricResponse> {
    return this.flowService.leaderboard(context, query, FlowMetricType.Fund);
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
    @Param(ContractContextPipe) context: ContractContext,
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
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<FlowLeaderboardMetricResponse> {
    return this.flowService.leaderboard(
      context,
      query,
      FlowMetricType.Transaction,
    );
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
    @Param(ContractContextPipe) context: DaoContractContext,
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
    @Param(ContractContextPipe) context: DaoContractContext,
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
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<FlowMetricResponse> {
    return this.flowService.history(
      context,
      FlowMetricType.Transaction,
      metricQuery,
    );
  }
}

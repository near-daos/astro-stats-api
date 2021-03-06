import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';

import {
  ContractContext,
  DaoContractContext,
  MetricResponse,
  MetricQuery,
  LeaderboardMetricResponse,
  PaginationDto,
  IntervalMetricQuery,
} from '@dao-stats/common';
import { GeneralTotalResponse } from './dto';
import { GeneralService } from './general.service';
import {
  ContractContextPipe,
  MetricQueryPipe,
  PaginationQueryPipe,
} from '../pipes';
import { HasDaoContractContext } from '../decorators';

@ApiTags('General')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @ApiResponse({
    status: 200,
    type: GeneralTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/')
  async totals(
    @Param(ContractContextPipe) context: ContractContext,
  ): Promise<GeneralTotalResponse> {
    return this.generalService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/daos')
  async daos(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.daos(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active')
  async active(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: IntervalMetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.active(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active/leaderboard')
  async activeLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<LeaderboardMetricResponse> {
    return this.generalService.activeLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active-daos')
  async activeDaos(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.activeDaos(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/groups')
  async groups(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.groups(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/groups/leaderboard')
  async groupsLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<LeaderboardMetricResponse> {
    return this.generalService.groupsLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/average-groups')
  async averageGroups(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.averageGroups(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: GeneralTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao')
  async daoTotals(
    @Param(ContractContextPipe) context: DaoContractContext,
  ): Promise<GeneralTotalResponse> {
    return this.generalService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/activity')
  async daoActivity(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.active(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/groups')
  async daoGroups(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.generalService.groups(context, metricQuery);
  }
}

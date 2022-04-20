import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';

import {
  ContractContext,
  DaoContractContext,
  MetricQuery,
  MetricResponse,
  LeaderboardMetricResponse,
  PaginationDto,
} from '@dao-stats/common';

import {
  GovernanceTotalResponse,
  ProposalsTypesLeaderboardResponse,
  ProposalsTypesHistoryResponse,
  VoteRateLeaderboardResponse,
} from './dto';
import { GovernanceService } from './governance.service';
import {
  ContractContextPipe,
  MetricQueryPipe,
  PaginationQueryPipe,
} from '../pipes';
import { HasDaoContractContext } from '../decorators';

@ApiTags('Governance')
@Controller('governance')
export class GovernanceController {
  constructor(private readonly governanceService: GovernanceService) {}

  @ApiResponse({
    status: 200,
    type: GovernanceTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/')
  async totals(
    @Param(ContractContextPipe) context: ContractContext,
  ): Promise<GovernanceTotalResponse> {
    return this.governanceService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/proposals')
  async proposals(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.proposals(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/proposals/leaderboard')
  async proposalsLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<LeaderboardMetricResponse> {
    return this.governanceService.proposalsLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: ProposalsTypesHistoryResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/proposals-types')
  async proposalsTypes(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<ProposalsTypesHistoryResponse> {
    return this.governanceService.proposalsTypes(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: ProposalsTypesLeaderboardResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/proposals-types/leaderboard')
  async proposalsTypesLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<ProposalsTypesLeaderboardResponse> {
    return this.governanceService.proposalsTypesLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/vote-rate')
  async rate(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.voteRate(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/vote-rate/leaderboard')
  async rateLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<VoteRateLeaderboardResponse> {
    return this.governanceService.voteRateLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active-proposals')
  async activeProposals(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.activeProposals(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active-proposals/leaderboard')
  async activeProposalsLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<LeaderboardMetricResponse> {
    return this.governanceService.activeProposalsLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active-votes')
  async activeVotes(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.activeProposals(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: LeaderboardMetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @Get('/active-votes/leaderboard')
  async activeVotesLeaderboard(
    @Param(ContractContextPipe) context: ContractContext,
    @Query(PaginationQueryPipe) query: PaginationDto,
  ): Promise<LeaderboardMetricResponse> {
    return this.governanceService.activeProposalsLeaderboard(context, query);
  }

  @ApiResponse({
    status: 200,
    type: GovernanceTotalResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao')
  async daoTotals(
    @Param(ContractContextPipe) context: DaoContractContext,
  ): Promise<GovernanceTotalResponse> {
    return this.governanceService.totals(context);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/proposals')
  async daoProposals(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.proposals(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: ProposalsTypesHistoryResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/proposals-types')
  async daoProposalsTypes(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<ProposalsTypesHistoryResponse> {
    return this.governanceService.proposalsTypes(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/vote-rate')
  async daoRate(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.voteRate(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/active-proposals')
  async daoActiveProposals(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.activeProposals(context, metricQuery);
  }

  @ApiResponse({
    status: 200,
    type: MetricResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Response based on the query params set',
  })
  @HasDaoContractContext()
  @Get('/:dao/active-votes')
  async daoActiveVotes(
    @Param(ContractContextPipe) context: DaoContractContext,
    @Query(MetricQueryPipe) metricQuery: MetricQuery,
  ): Promise<MetricResponse> {
    return this.governanceService.activeVotes(context, metricQuery);
  }
}

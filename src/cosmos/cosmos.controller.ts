import { Controller, Get, Param } from '@nestjs/common';
import { CosmosService } from './cosmos.service';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  getBlock(@Param('height') height: string) {
    return this.cosmosService.getBlockByHeight(height);
  }

  @Get('transactions/:hash')
  getTransaction(@Param('hash') hash: string) {
    return this.cosmosService.getTransactionByHash(hash);
  }
}

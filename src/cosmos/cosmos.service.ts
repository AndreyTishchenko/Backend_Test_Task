import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CosmosService {
  private rpcUrl = process.env.COSMOS_RPC;

  async getBlockByHeight(height: string) {
    const res = await axios.get(`${this.rpcUrl}/block?height=${height}`);
    const block = res.data.result.block;
    return {
      height,
      time: block.header.time,
      hash: block.header.last_block_id.hash,
      proposedAddress: block.header.proposer_address,
    };
  }

  async getTransactionByHash(hash: string) {
    const res = await axios.get(`${this.rpcUrl}/tx?hash=0x${hash}`);
    const tx = res.data.result;

    return {
      hash: tx.hash,
      height: tx.height,
      time: tx.tx_result.timestamp,
      gasUsed: tx.tx_result.gas_used,
      gasWanted: tx.tx_result.gas_wanted,
      fee: tx.tx.auth_info?.fee,
      sender: tx.tx.body?.messages?.[0]?.sender,
    };
  }
}

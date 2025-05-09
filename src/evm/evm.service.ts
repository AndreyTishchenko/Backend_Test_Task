import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EvmService {
  private rpcUrl = (() => {
    const url = process.env.EVM_RPC;
    if (!url) {
      throw new Error('EVM_RPC is not defined in environment variables');
    }
    return url;
  })();

  private async callRPC(method: string, params: any[]) {
    const res = await axios.post(this.rpcUrl, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });
    return res.data.result;
  }

  async getBlockByHeight(height: number) {
    const hexHeight = '0x' + height.toString(16);
    const block = await this.callRPC('eth_getBlockByNumber', [hexHeight, false]);
    return {
      height,
      hash: block.hash,
      parentHash: block.parentHash,
      gasLimit: block.gasLimit,
      gasUsed: block.gasUsed,
      size: block.size,
    };
  }

  async getTransactionByHash(hash: string) {
    const tx = await this.callRPC('eth_getTransactionByHash', [hash]);
    return {
      hash: tx.hash,
      to: tx.to,
      from: tx.from,
      value: tx.value,
      input: tx.input,
      maxFeePerGas: tx.maxFeePerGas,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
      gasPrice: tx.gasPrice,
    };
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  async post(url: string, data: any) {
    return this.client.post(url, data);
  }

  async get(url: string) {
    return this.client.get(url);
  }
}

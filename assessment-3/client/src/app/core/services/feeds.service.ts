import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedsService {
  constructor(private apiService: ApiService) { }

  public async getSources() {
    return await this.apiService.get(`api/v1/feeds`);
  }

  public async getBySource(params: any) {
    return await this.apiService.get(`api/v1/feeds/source?sources=${params.sources}&page=${params.page}`);
  }
}

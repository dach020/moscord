
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { each, extend } from 'lodash';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBaseUrl: string = '';

  private accessToken: string | null;
  private ACCESS_TOKEN_KEY: string = 'access_token';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = 'http://127.0.0.1:3000/';
  }

  public setAccessToken(token: string) {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
    this.accessToken = token;
  }

  public async post(path: string, data?: object): Promise<any> {
    this.accessToken = localStorage.getItem('access_token');
    const bodyString = JSON.stringify(data);
    const headers = new HttpHeaders(extend(this.getHeaders()));
    try {
      const res: any = await this.http.post(this.apiBaseUrl + path, bodyString, {headers}).toPromise();
      if (res.status === 204) { return res; }
      return res;
    } catch (err) {
      throw err.error;
    }
  }

  public async get(path: string, data?: object, apiURL?: string): Promise<any> {
    let params = new HttpParams();
    each(data || {}, (value, key) => {
      params = params.set(key, value);
    });
    const headers    = new Headers(extend(this.getHeaders()));
    const options    = new RequestOptions({ headers });
    try {
      const res: any = await this.http.get(apiURL ? apiURL : this.apiBaseUrl + path, { params }).toPromise();
      if (res && res[this.ACCESS_TOKEN_KEY]) {
        this.setAccessToken(res[this.ACCESS_TOKEN_KEY]);
      }
      if (res.status === 204) { return res; }
      return res;
    } catch (err) {
      throw err.error;
    }
  }

  private getHeaders() {
    const headers: any = {
      'Content-Type': 'application/json'
    };
    if (this.accessToken) {
      headers.Authorization = this.accessToken;
    }

    return headers;
  }

}

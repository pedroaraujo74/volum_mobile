import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import * as moment from 'moment';
import { GlobalConstants } from './global-constants';

@Injectable()
export class HttpClient {

    private theHeader;
    requestUrl: string;
    responseData: any;
    handleError: any;

    constructor(private http: Http) {
        this.http = http;
    }

    setAuthHeader(header: string) {
        this.theHeader = header;
    }

    removeAuthHeader() {
        this.theHeader = undefined;
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', this.theHeader);
    }

    get(url, queryParams = null) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url + this.serialize(queryParams), {
            headers: headers
        })
    }

    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    delete(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    private serialize(obj) {
        let str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        if (str.length > 0) {
            return "?" + str.join("&");
        }
        return "";
    }
}
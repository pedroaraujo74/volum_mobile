import { GlobalConstants } from './../shared/global-constants';
import { HttpClient } from './../shared/http-client';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

    constructor(public http: Http, public httpClient: HttpClient) {

    }

    search(query) {
        console.log("quey", query.length)


        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/search`, { search: query, amount: 100, startAt: 0 }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));

    }

}
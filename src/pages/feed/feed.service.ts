import { HttpClient } from './../../shared/http-client';
import { GlobalConstants } from './../../shared/global-constants';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeedService {

    constructor(public httpClient: HttpClient) {

    }

    getVols(amount, startAt) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols`, { amount: amount, startAt: startAt }).toPromise()
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err.json();
            });
    }

    // COUNT LIKES
    countLikes(id_vol) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/likes/count`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // CHECK LIKE
    checkLike(id_vol) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/checkLike`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

}
import { GlobalConstants } from './../../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeedService {

    constructor(private http: Http) {

    }

    getVols() {
          return this.http.get(`${GlobalConstants.API_ENDPOINT}/vols`).toPromise()
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err.json();
            });
    }
    
}
import { GlobalConstants } from '../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import 'rxjs/add/operator/toPromise';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class NewActionsService {

    constructor(public httpClient: HttpClient, public http: Http) {

    }

    getCategories() {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/list/categories`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    search(term) {
        let params = new URLSearchParams();
        params.set('address', term);

        let url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD6Vu6fjAgMtSRFFeMPLfhPxwx16EhqN0Y`
        let array = [];

        return this.http
            .get(url, { params })
            .map(response => array = response.json().results);
    }


    newAction(body) {
        return this.httpClient.post(`${GlobalConstants.API_ENDPOINT}/vols/`, body).toPromise()
            .then(res => { return res.json() })
            .catch(error => { return error.json() });
    }



}
import { GlobalConstants } from '../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class NotificationsService {


    constructor(public http: HttpClient) {

    }

    newNotificationCount() {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/notifications/not-read/count`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    };
    newRequestCount() {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/notifications/requests/not-read/count`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    };
    getNotifications(amount, startAt) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/notifications/list/all`, { amount: amount, startAt: startAt }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    };
    getRequests() {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/notifications/requests`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    };
    cleanRequests() {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/notifications/requests/read-all`, null).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
    cleanNotifications() {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/notifications/read-all`, null).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
}
import { GlobalConstants } from './global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from './http-client';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VolsService {

    constructor(public http: Http, public httpClient: HttpClient) {

    }

    getVols() {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols`).toPromise()
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err.json();
            });
    }


    getVolHistory(id) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id + '/vols').toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
    getMyVols(id) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/users/` + id + `/my-vols`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // GET VOLS COMPLETO
    getVolDetails(volId) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + volId).toPromise()
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err.json();
            });
    }

    // GET VOL ADDRESS
    getAddress(lat, lng) {
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=` + lat + `,` + lng + `&key=AIzaSyD6Vu6fjAgMtSRFFeMPLfhPxwx16EhqN0Y`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // GET CONFIRMED
    getConfirmed(id_vol, amount) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/applies/confirmed`, { amount: amount }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // COUNT CONFIRMED
    countConfirmeds(id_vol) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/applies/confirmed/count`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // GET CANDIDATES
    getCandidates(id_vol, amount) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/applies/candidates`, { amount: amount }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // COUNT CANDIDATES
    countCandidates(id_vol) {
        return this.httpClient.get(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + `/applies/candidates/count`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    // APPLY TO VOL
    apply(id_user, id_vol) {
        return this.httpClient.post(`${GlobalConstants.API_ENDPOINT}/vols/` + id_vol + '/apply', { id_user: id_user }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

}
import { GlobalConstants } from './../../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {

    constructor(public http: Http) {

    }

    checkEmail(email) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/auth/checkEmail`, { email: email }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    getCategories() {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/vols/list/categories`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    registerUser(email, birth_date, name, gender, type, password) {
        let body = {email: email, birth_date: birth_date, name: name, gender: gender, type: type, password: password}
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/auth/register`, body).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    
}
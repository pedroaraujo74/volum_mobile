import { GlobalConstants } from '../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UsersService {


    constructor(public http: HttpClient) {

    }

    
    getProfile(id) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

}
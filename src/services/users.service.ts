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

    follow(id_user) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/users/follow`, { id_user: id_user }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    unfollow(id_user) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/users/unfollow`, { id_user: id_user }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

    listFollows(id_user, type) {
        if (type == 1) {

            return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id_user + '/follows/users').toPromise()
                .then(res => { return res.json() })
                .catch(error => console.log(error));

        } else if (type == 2) {
            return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id_user + '/follows/inst').toPromise()
                .then(res => { return res.json() })
                .catch(error => console.log(error));
        }
    }

    countFollows(id_user, type) {
        if (type == 1) {

            return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id_user + '/follows/users/count').toPromise()
                .then(res => { return res.json() })
                .catch(error => console.log(error));

        } else if (type == 2) {
            return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id_user + '/follows/inst/count').toPromise()
                .then(res => { return res.json() })
                .catch(error => console.log(error));
        }
    }

    checkState(id_user) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id_user + '/checkFollow').toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

  

    engageConversation(id_user) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/chat/`, { id_user: id_user }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

}
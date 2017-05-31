import { HttpClient } from './../http-client';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

//import { HttpClient } from '../http-client';
//import { User } from '../user/user';
import { GlobalConstants } from '../global-constants';

@Injectable()
export class AuthenticationService {


    userPromise: Promise<any>
    constructor(private http: HttpClient, private storage: Storage) {
        this.loadUserCredentials();

        this.storage.get(this.LOCAL_TOKEN_KEY).then(result => {
            console.log("RESULT", result)
        });
    }

    private errorHandler = error => console.log('AuthenticationService error', error);
    //TODO load information about the roles
    private LOCAL_TOKEN_KEY = 'yourTokenKey';
    private authenticated = false;
    private authToken: string;
    public dataAvailable = false;

    reloadUser(id, self) {
        var temp = this.http.get(`${GlobalConstants.API_ENDPOINT}/users/` + id).toPromise()
            .then(res => {
                let response = res.json();
                this.dataAvailable = true;

                return response;
            })
            .catch(err => {
                this.errorHandler(err);
                return err.json();
            });
        if (self) {
            this.userPromise = temp;
        }
        return temp;
    }
    login(loginInfo) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/auth/login`, loginInfo).toPromise()
            .then(res => {
                this.storeUserCredentials(res.json().id_token);
                this.storage.set("USER_ID", res.json().id_user);
                return res.json();
            })
            .catch(err => {
                this.errorHandler(err);
                return err.json();
            });
    }
    logout() {
        this.destroyUserCredentials();
    }
    register(value) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/auth/register`, value).toPromise()
            .then(res => {
                return res.json();
            })
            .catch(err => {
                this.errorHandler(err);
                return err.json();
            });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    public loadUserCredentials(): Promise<any> {
        let token;
        let id;

        return this.storage.get('USER_ID').then(res => {
            id = res;
            this.storage.get(this.LOCAL_TOKEN_KEY).then(result => {

                token = result;

                if (token && id != 'undefined') {
                    console.log(id);
                    this.useCredentials(token);
                    this.reloadUser(id, true);
                    return result;
                }
            });
        });

    }

    public storeUserCredentials(token: string) {
        this.storage.set(this.LOCAL_TOKEN_KEY, token);
        this.useCredentials(token);
    }

    private useCredentials(token: string) {
        this.authenticated = true;
        this.authToken = token;

        this.http.setAuthHeader(this.authToken);
    }

    private destroyUserCredentials() {
        this.authToken = undefined;
        this.authenticated = false;
        this.http.removeAuthHeader();
        this.storage.clear();
    }
}
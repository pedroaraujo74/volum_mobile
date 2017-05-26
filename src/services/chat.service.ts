import { GlobalConstants } from '../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ChatService {


    constructor(public http: HttpClient) {

    }


    getConversations() {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/chat/`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
    getMessages(id_conversation) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/chat/` + id_conversation + '/messages').toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
    sendMessage(id_conversation, message) {
        return this.http.post(`${GlobalConstants.API_ENDPOINT}/chat/` + id_conversation + `/message`, { message: message }).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }
    getLastMessage(id_conversation) {
        return this.http.get(`${GlobalConstants.API_ENDPOINT}/chat/` + id_conversation + `/messages/last`).toPromise()
            .then(res => { return res.json() })
            .catch(error => console.log(error));
    }

}
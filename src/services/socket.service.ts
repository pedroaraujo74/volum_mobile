import { GlobalConstants } from '../shared/global-constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class SocketService {

    private url = GlobalConstants.SOCKET_ENDPOINT;
    private socket;
    constructor() {
        this.socket = io(this.url);
    }


    onConnect(id_user) {
        this.socket.emit("user", id_user);
    }


    onNotification() {
        let observable = new Observable(observer => {

            this.socket.on('notification', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })

        return observable;
    }

    onMessage() {
        let observable = new Observable(observer => {

            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });

        return observable;
    }

    joinRoom(id) {
        this.socket.emit("join", id)
    }

}
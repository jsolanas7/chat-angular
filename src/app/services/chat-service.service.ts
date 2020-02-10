import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ChatServiceService {

    private url = environment.url;
    // private socket;

    constructor(private socket: Socket) {
        // this.socket = io.connect(this.url);
    }

    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}

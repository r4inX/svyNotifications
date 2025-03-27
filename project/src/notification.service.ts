import { Injectable} from '@angular/core';

@Injectable()
export class notificationService {

    constructor() {
    }

    showNotification(_title: string, _body: string){
        window.Notification.requestPermission();

        try {
            if (typeof window === "undefined" || !Notification) {
              return;
            }
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification(_title, { body: _body });
              }
            });
          } catch (error) {
            // Safari doesn't return a promise for requestPermissions and it
            // throws a TypeError. It takes a callback as the first argument
            // instead.
            if (error instanceof TypeError) {
              Notification.requestPermission(() => {
                new Notification(_title, { body: _body });
              });
            } else {
              
              throw error;
            }
          }
    }

    requestPermission() {
        if (typeof window === "undefined" || !Notification) {
          return;
        }
        Notification.requestPermission().then(permission => {
          return permission;
        });
    }
} 
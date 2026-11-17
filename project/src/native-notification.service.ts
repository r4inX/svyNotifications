import { Injectable, inject } from '@angular/core';
import { LoggerFactory, LoggerService, WindowRefService } from '@servoy/public';

/**
 * Ergebnis einer Berechtigungsabfrage: der Status des Browsers oder "unsupported",
 * wenn der Browser keine Notification-API kennt.
 */
export type NativeNotificationPermission = NotificationPermission | 'unsupported';

/** Rückgabewert, wenn der Browser keine Benachrichtigungen unterstützt */
const C_UNSUPPORTED = 'unsupported';

/**
 * Browser-Service hinter plugins.notification: zeigt native Benachrichtigungen
 * des Betriebssystems über die Web-Notification-API an.
 *
 * Servoy bindet den Service über ng2Config.serviceName in notification.spec ein
 * und ruft die API-Funktionen direkt auf dieser Instanz auf.
 */
@Injectable({ providedIn: 'root' })
export class NativeNotificationService {
    private readonly windowRef = inject(WindowRefService);
    private readonly log: LoggerService = inject(LoggerFactory).getLogger('NativeNotificationService');

    /**
     * Fragt beim Browser die Berechtigung für Benachrichtigungen an. Ist bereits entschieden,
     * wird der gespeicherte Status ohne erneuten Dialog zurückgegeben.
     *
     * @returns {Promise<NativeNotificationPermission>} "granted", "denied", "default" oder "unsupported"
     */
    async requestPermission(): Promise<NativeNotificationPermission> {
        const loNotification = this.getNotificationApi();
        if (!loNotification) return C_UNSUPPORTED;
        if (loNotification.permission !== 'default') return loNotification.permission;
        if (!this.windowRef.nativeWindow.isSecureContext) {
            this.log.warn('Benachrichtigungen sind nur über HTTPS (oder localhost) möglich.');
        }
        return this.askPermission(loNotification);
    }

    /**
     * Zeigt eine Benachrichtigung an. Fehlt die Berechtigung noch, wird sie vorher angefragt.
     * Ohne Berechtigung oder ohne Browser-Unterstützung passiert nichts außer einem Log-Eintrag.
     *
     * @param {string} pcTitle Titel der Benachrichtigung
     * @param {string} pcBody Text der Benachrichtigung
     * @returns {Promise<void>}
     */
    async showNotification(pcTitle: string, pcBody: string): Promise<void> {
        const lcPermission = await this.requestPermission();
        if (lcPermission !== 'granted') {
            this.log.warn(`Benachrichtigung nicht angezeigt, Berechtigung: ${lcPermission}`);
            return;
        }

        const loNotification = this.getNotificationApi();
        if (!loNotification) return;
        try {
            new loNotification(pcTitle ?? '', { body: pcBody ?? '' });
        } catch (leError) {
            // z. B. Chrome auf Android: dort sind Benachrichtigungen nur über einen Service Worker erlaubt
            this.log.warn(`Benachrichtigung konnte nicht angezeigt werden: ${String(leError)}`);
        }
    }

    /**
     * Liefert die Notification-API des Browsers oder null, wenn sie fehlt.
     *
     * @returns {typeof Notification | null}
     */
    private getNotificationApi(): typeof Notification | null {
        const loWindow = this.windowRef.nativeWindow as Window & { Notification?: typeof Notification };
        return loWindow?.Notification ?? null;
    }

    /**
     * Öffnet den Berechtigungsdialog des Browsers. Ältere Safari-Versionen kennen nur die
     * Callback-Variante und liefern kein Promise, deshalb werden beide Wege bedient.
     *
     * @param {typeof Notification} poNotification Notification-API des Browsers
     * @returns {Promise<NotificationPermission>}
     */
    private askPermission(poNotification: typeof Notification): Promise<NotificationPermission> {
        return new Promise<NotificationPermission>((pfnResolve) => {
            const lprResult: Promise<NotificationPermission> | undefined = poNotification.requestPermission(pfnResolve);
            lprResult?.then(pfnResolve, () => pfnResolve(poNotification.permission));
        });
    }
}

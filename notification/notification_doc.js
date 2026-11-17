/**
 * Fragt beim Browser die Berechtigung für Benachrichtigungen an.
 * Ist die Frage bereits beantwortet, kommt der gespeicherte Status ohne erneuten Dialog zurück.
 * Benachrichtigungen funktionieren nur über HTTPS oder localhost.
 *
 * @example
 * var lcPermission = plugins.notification.requestPermission();
 * if (lcPermission == 'granted') {
 *     plugins.notification.showNotification('Neue Nachricht', 'Ticket 4711 wurde aktualisiert');
 * }
 *
 * @return {String} "granted", "denied", "default" (Dialog geschlossen ohne Entscheidung) oder "unsupported" (Browser ohne Notification-API)
 */
function requestPermission() { }

/**
 * Zeigt eine native Benachrichtigung des Betriebssystems an.
 * Fehlt die Berechtigung noch, fragt der Browser vorher nach. Wurde sie verweigert, passiert nichts.
 *
 * @example
 * plugins.notification.showNotification('Neue Nachricht', 'Ticket 4711 wurde aktualisiert');
 *
 * @param {String} title Titel der Benachrichtigung
 * @param {String} body Text der Benachrichtigung
 */
function showNotification(title, body) { }

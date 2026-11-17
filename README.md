# svyNotifications

Servoy-Web-Service für native Browser-Benachrichtigungen im Titanium Client (TiNG).
Die Benachrichtigungen erscheinen als Systemmeldung des Betriebssystems, auch wenn der Browser-Tab im Hintergrund liegt.

| Version | Servoy | Angular |
|---|---|---|
| 2.0.0 | 2026.9+ | 22.1 |
| 1.0 | 2024.12 – 2026.6 | 17 |

## Installation

`notifications.zip` aus dem [Release](https://github.com/r4inX/svyNotifications/releases) in den Ordner `ng_web_packages` der Solution kopieren (oder über den Servoy Package Manager installieren) und Servoy Developer neu starten.

## Verwendung

```js
// Berechtigung anfragen: "granted", "denied", "default" oder "unsupported"
var lcPermission = plugins.notification.requestPermission();

// Benachrichtigung anzeigen (fragt die Berechtigung bei Bedarf selbst an)
plugins.notification.showNotification('Neue Nachricht', 'Ticket 4711 wurde aktualisiert');
```

Hinweise:
- Benachrichtigungen funktionieren nur über **HTTPS** oder `localhost`.
- Hat der Benutzer die Berechtigung verweigert, kann sie nur in den Browser-Einstellungen wieder erteilt werden. `showNotification` tut dann nichts.
- Firefox und Safari zeigen den Berechtigungsdialog nur nach einer Benutzeraktion. `requestPermission` deshalb am besten direkt aus einem Klick-Handler aufrufen.
- Chrome auf Android erlaubt Benachrichtigungen nur über einen Service Worker. Dort erscheint nichts, der Fehler landet im Browser-Log.

## Entwicklung

Voraussetzung: Node.js `^22.22.3` oder `^24.15` (Angular CLI 22).

```bash
npm install
npm run make_release   # baut dist/ und erzeugt notifications.zip
npm run validate       # prüft MANIFEST, Spec und Service-Klasse auf Konsistenz
```

Aufbau:
- `notification/` – Spec, Doku (`_doc.js`) und NG1-Platzhalter
- `project/src/native-notification.service.ts` – Angular-Service, den Servoy über `ng2Config.serviceName` einbindet
- `META-INF/MANIFEST.MF` – Package-Manifest (`Package-Type: Web-Service`)

Neue Version: `version` in `package.json` und `project/package.json`, `Bundle-Version` im MANIFEST sowie einen Eintrag in `webpackage.json` anpassen.

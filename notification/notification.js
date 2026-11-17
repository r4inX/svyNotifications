// Platzhalter für den alten NG1-Client. Das Package unterstützt nur den Titanium-Client (TiNG),
// dort übernimmt NativeNotificationService (project/src) die API.
angular.module('notificationsNotification', ['servoy'])
.factory('notificationsNotification', function() {
	return {
		showNotification: function() { },
		requestPermission: function() { return 'unsupported'; }
	};
});

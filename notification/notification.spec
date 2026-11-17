{
    "name": "notification",
    "displayName": "NativeNotifications",
    "version": 1,
    "definition": "notifications/notification/notification.js",
    "doc": "notifications/notification/notification_doc.js",
    "ng2Config": {
        "packageName": "notifications",
        "serviceName": "NativeNotificationService",
        "entryPoint": "dist"
    },
    "libraries": [],
    "model": {},
    "api": {
        "showNotification": {
            "parameters": [
                { "name": "title", "type": "string" },
                { "name": "body", "type": "string" }
            ]
        },
        "requestPermission": {
            "returns": "string"
        }
    }
}

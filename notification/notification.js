angular.module('notificationsNotification',['servoy'])
.factory("notificationsNotification",function($services) 
{
	var scope = $services.getServiceScope('notificationsNotification');
	return {
		helloworld: function(text) {
			alert("helloworld: " + scope.model.text + text);
		}
	}
})
.run(function($rootScope,$services)
{
	var scope = $services.getServiceScope('notificationsNotification')
	scope.$watch('model', function(newvalue,oldvalue) {
	// handle state changes
		console.log(newvalue)
}, true);
})
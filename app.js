angular.module('app', ['Flags'])
    .run(function ($rootScope, FeatureFlags) {
        $rootScope.features = FeatureFlags.getFeatureFlags();
        $rootScope.done = FeatureFlags.getFeatureFlags() ? 'Booted!' : 'Failed';
    })
    .provider('Auth', AuthProvider)
    .directive('ngLoading', LoadingDirective)    
    .controller('appCtrl', appCtrl)

/**
 * Bootstrap the app if an asyncronous service
 * has resolved. Useful if this service is a 
 * critical dependency throughout the entire
 * application (e.g.: Feature Flags)
 */
angular.element(document).ready(function () {
  var $injector = angular.injector(['ng','Flags']);
  var FeatureFlags = $injector.get('FeatureFlags');
  FeatureFlags.init().then(function () {
    var el = document.getElementById('app');
    angular.bootstrap(el, ['app']);
  });
});


function LoadingDirective(){
    return function (scope, el) {
        el.remove();
    }
}

function appCtrl($scope, Auth){
    $scope.message = 'Hello: ' + Auth.getMessage();
}

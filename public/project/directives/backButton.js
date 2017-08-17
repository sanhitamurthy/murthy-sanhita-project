(function() {
    angular
        .module("backButton", [])
        .directive('backButton', ['$window', function($window) {
            return {
                restrict: 'EA',
                link: function (scope, element) {
                    element.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }]);
})();

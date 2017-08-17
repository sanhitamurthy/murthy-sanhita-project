(function() {
    angular
        .module('TVApp')
        .controller('adminController', adminController);

    function adminController(currentUser) {

        var model = this;
        model.currentUser = currentUser;
    }
})();
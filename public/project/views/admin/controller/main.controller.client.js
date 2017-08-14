(function() {
    angular
        .module('TVApp')
        .controller('adminController', adminController);

    //$ means created by underlined framework
    function adminController(currentUser) {

        var model = this;
        model.currentUser = currentUser;
    }
})();
(function(){
    angular
        .module('TVApp')
        .controller('homeController',homeController);

    //$ means created by underlined framework
    function homeController(apiService,currentUser) {

        var model = this;

        model.currentUser=currentUser;
        model.renderShows=renderShows;

        function init(){
            apiService
                .findShowsByPopularity()
                .then(renderShows);
        }

        init();

        function renderShows(shows){
           model.popularShows=shows.data.results;
           console.log(model.popularShows);
        }




    }
})();

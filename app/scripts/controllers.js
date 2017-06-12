'use strict';
angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
 
  $scope.showMenu = false;
  $scope.message = "Loading ...";
  menuFactory.getDishes().query(
      function(response) {
          $scope.dishes = response;
          $scope.showMenu = true;
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      });

  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                       agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
    $scope.invalidChannelSelection = false;                   
}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
  $scope.sendFeedback = function() {
    
    $scope.message = "Loading ...";

    
    //feedbackFactory.getFeedbacks().save($scope.feedback);
    
    if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) { 
      $scope.invalidChannelSelection = true;
        console.log('incorrect');
    }
    else {
        console.log($scope.feedback);
        feedbackFactory.getFeedbacks().save($scope.feedback);
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                           agree:false, email:"" };
        $scope.feedback.mychannel="";

        $scope.feedbackForm.$setPristine();
        
    }
  }; 

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
  $scope.dish={};
  $scope.showDish = false;
  $scope.message="Loading ...";
  $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
  .$promise.then(
    function(response){
        $scope.dish = response;
        $scope.showDish = true;
    },
    function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
    }
  );
  
}])


.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
  $scope.feedback = {author:"", rating:"5", comment:"", date:"" };
  
  $scope.checkRadio=true;
  $scope.submitComment = function () {

    $scope.feedback.date = new Date().toISOString();
    console.log($scope.mycomment);
    $scope.dish.comments.push($scope.feedback);

    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
    $scope.commentForm.$setPristine();
    $scope.feedback = {rating:"5", comment:"", author:"", date:""};
  };

}])

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
    
    $scope.showDish = false;
    $scope.dmessage="Loading ...";
    $scope.featuredDish = menuFactory.getDishes().get({id:0})
    .$promise.then(
        function(response){
            $scope.featuredDish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.dmessage = "Error: "+response.status + " " + response.statusText;
        }
    );

    $scope.showPromotion = false;
    $scope.pmessage="Loading ...";
    $scope.promotedDish = menuFactory.getPromotions().get({id:0})
    .$promise.then(
        function(response){
            $scope.promotedDish = response;
            $scope.showPromotion = true;
        },
        function(response) {
            $scope.pmessage = "Error: "+response.status + " " + response.statusText;
        }
    );

    $scope.showLeader = false;
    $scope.lmessage="Loading ...";
    $scope.leader = corporateFactory.getLeaders().get({id:3})
    .$promise.then(
        function(response){
            $scope.leader = response;
            $scope.showLeader = true;
        },
        function(response) {
            $scope.lmessage = "Error: "+response.status + " " + response.statusText;
        }
    ); 
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
  
  $scope.showLeader = false;
  $scope.message="Loading ...";
  corporateFactory.getLeaders().query(
      function(response) {
          $scope.leaders = response;
          $scope.showLeader = true;
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      });  

}]);

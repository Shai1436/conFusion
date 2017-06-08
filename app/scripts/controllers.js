'use strict';
angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.message = "Loading ...";
  $scope.promotedDish = menuFactory.getPromotions();  
  $scope.featuredDish = menuFactory.getDish(0);

  $scope.showMenu = false;
  $scope.message = "Loading ...";
  $scope.dishes = menuFactory.getDishes().query();

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

.controller('FeedbackController', ['$scope', function($scope) {
  $scope.sendFeedback = function() {
    console.log($scope.feedback);
    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) { 
      $scope.invalidChannelSelection = true;
        console.log('incorrect');
    }
    else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                           agree:false, email:"" };
        $scope.feedback.mychannel="";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
    }
  }; 

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
  $scope.dish={};
  $scope.showDish = false;
  $scope.message="Loading ...";
  $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
  
}])


.controller('DishCommentController', ['$scope', function($scope) {
  $scope.feedback = {author:"", rating:"", comment:"" };
  $scope.feedback.date=  new Date().toISOString();
  $scope.checkRadio=true;
  $scope.submitComment = function() {
    console.log($scope.dish);
    $scope.dish.comments.push($scope.feedback);
    $scope.feedback = {author:"", rating:"", comment:"",date:"" };
    $scope.commentForm.$setPristine();
  };

}])

.controller('IndexController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
  $scope.leader= corporateFactory.getLeader(3);
  //JSONObject object = $scope.promotedDish.getJSONObject(0);
  //console.log(object);
  //console.log($scope.featuredDish);
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
  $scope.leaders= corporateFactory.getLeaders();
  

}])
  
;

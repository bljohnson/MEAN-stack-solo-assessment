console.log('script.js is sourced in');

var heroApp = angular.module('heroApp',[]);

// create a controller to define heroApp's behavior
heroApp.controller('HeroController', ['$scope', '$http', function ($scope, $http) {
  // code that gets executed when this controller is called
  // define function that will create object from user input and send to herotrackerdb
  $scope.addHero = function () {
    event.preventDefault();
    // get the user input and store in an object to send to server, property names we assign, object put on body of request
    var objectToSendToDb = {
      alias: $scope.aliasIn,
      firstName: $scope.firstNameIn,
      lastName: $scope.lastNameIn,
      city: $scope.cityIn,
	powerName: $scope.powerIn
    };
    // make a call to server with object to be stored in db
    $http({
      method: 'POST',
      url: '/postHero',
      data: objectToSendToDb
    });
    // clear input fields on DOM
    $scope.aliasIn ='';
    $scope.firstNameIn ='';
    $scope.lastNameIn ='';
    $scope.cityIn ='';
    $scope.powerIn ='';
    // call getHeroes function within addHero function so updated list displays as soon as new hero is added
    $scope.getHeroes();
  }; // end addHero function

  // define function that will get heroes currently in herotrackerdb via HTTP call
  $scope.getHeroes = function () {
     $http({
       method: 'GET',
       url: '/getHeroes'
 }).then(function(response){
       $scope.allHeroes = response.data; // .data is the data in the response; allHeroes is the array of objects in herotrackerdb
       console.log($scope.allHeroes);
     }, function myError(response){
       console.log(response.statusText);
 }); // end 'then' success response (success and myError functions)
   }; // end getHeroes function

   // delete hero from DOM
   $scope.deleteHero = function (index) {
     var deleteOne = $scope.allHeroes[index];
     $scope.allHeroes.splice(index, 1);
     console.log('deleted hero:' + deleteOne._id);
     var heroId = {id: deleteOne._id};
     $http({
       method: 'POST',
       url: '/deleteHero',
       data: heroId
     });
   }; // end deleteHero function

}]); // end HeroController

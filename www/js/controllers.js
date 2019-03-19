angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};
    $scope.showLightOn1 = false;
    $scope.showLightOn2 = false;
    $scope.showLightOn3 = false;
    $scope.showLightOn4 = false;
    $scope.showLightOn5 = false;
    $scope.showLightOff1 = true;
    $scope.showLightOff2 = true;
    $scope.showLightOff3 = true;
    $scope.showLightOff4 = true;
    $scope.showLightOff5 = true;
    $scope.allLightsOn = false;
    $scope.buttonLightsLabel = "Encender todas las luces";
    $scope.host = "10.6.0.166";
    $scope.port = "12913";
    $scope.lockImages = ["img/lockOpen.png","img/lockOpen.png","img/lockOpen.png","img/lockOpen.png"];

    this.checkDoorsState = checkDoorsState;
    
    checkDoorsState();

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $http.get("http://"+$scope.host+":"+ $scope.port +"/doors/state")
        .then(function (response) {
          console.log(response);
          $scope.myWelcome = response.data;
        })
      console.log("hollaaa");
      $scope.modal.show();
    };

    $scope.TakePhoto = function () {
      var req = {
        method: 'GET',
        url: "http://"+$scope.host+":"+ $scope.port +"/photo",
      }
      $http(req).then(function (response) { var respon = response.data; console.log(respon) });
    };

    function checkDoorsState() {
      var req = {
        method: 'GET',
        url: "http://"+$scope.host+":"+$scope.port+"/doors",
      }
      $http(req).then(function (response) { 
        var respon = response.data; 
        setDoorImages (respon);
       });
    }

    function setDoorImages (dataDoors){
      var lastFour = dataDoors.substr(dataDoors.length - 5);
      for(var i = 0; i < lastFour.length; i++){
        if (lastFour[i] == "1"){ //abierto
          $scope.lockImages[i] = "img/lockOpen.png";
          console.log("abierto");
        }
        else{ //cerrado
          $scope.lockImages[i] = "img/lockClose.png";
          console.log("cerrado");
        }
      }


    }

    $scope.TurnOnLights = function (number) {
      if (number == 1) {
        $scope.showLightOn1 = true;
        $scope.showLightOff1 = false;
        var data = { "luz": "1" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });


      }
      else if (number == 2) {
        $scope.showLightOn2 = true;
        $scope.showLightOff2 = false;
        var data = { "luz": "2" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 3) {
        $scope.showLightOn3 = true;
        $scope.showLightOff3 = false;
        var data = { "luz": "3" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+ $scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 4) {
        $scope.showLightOn4 = true;
        $scope.showLightOff4 = false;
        var data = { "luz": "4" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 5) {
        $scope.showLightOn5 = true;
        $scope.showLightOff5 = false;
        var data = { "luz": "5" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
    };

    $scope.TurnOnOfflights = function () {
      if ($scope.allLightsOn) {
        $scope.allLightsOn = false;
        $scope.buttonLightsLabel = "Encender todas las luces"
        $scope.showLightOn1 = false;
        $scope.showLightOn2 = false;
        $scope.showLightOn3 = false;
        $scope.showLightOn4 = false;
        $scope.showLightOn5 = false;
        $scope.showLightOff1 = true;
        $scope.showLightOff2 = true;
        $scope.showLightOff3 = true;
        $scope.showLightOff4 = true;
        $scope.showLightOff5 = true;
        var data = { "luz": "6" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+ $scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });

      }
      else {
        $scope.allLightsOn = true;
        $scope.buttonLightsLabel = "Apagar todas las luces"
        $scope.showLightOff1 = false;
        $scope.showLightOff2 = false;
        $scope.showLightOff3 = false;
        $scope.showLightOff4 = false;
        $scope.showLightOff5 = false;
        $scope.showLightOn1 = true;
        $scope.showLightOn2 = true;
        $scope.showLightOn3 = true;
        $scope.showLightOn4 = true;
        $scope.showLightOn5 = true;
        var data = { "luz": "6" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/on",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });

      }

    }

    $scope.TurnOffLights = function (number) {
      if (number == 1) {
        $scope.showLightOn1 = false;
        $scope.showLightOff1 = true;
        var data = { "luz": "1" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });


      }
      else if (number == 2) {
        $scope.showLightOn2 = false;
        $scope.showLightOff2 = true;
        var data = { "luz": "2" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 3) {
        $scope.showLightOn3 = false;
        $scope.showLightOff3 = true;
        var data = { "luz": "3" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 4) {
        $scope.showLightOn4 = false;
        $scope.showLightOff4 = true;
        var data = { "luz": "4" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+ $scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
      else if (number == 5) {
        $scope.showLightOn5 = false;
        $scope.showLightOff5 = true;
        var data = { "luz": "5" };
        var req = {
          method: 'POST',
          url: "http://"+$scope.host+":"+$scope.port+"/lights/off",
          params: data
        }
        $http(req).then(function (response) { console.log(response.data) });
      }
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    }
    $scope.houseControl = function () {
      $state.go('app.search');
    };
  })


  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });

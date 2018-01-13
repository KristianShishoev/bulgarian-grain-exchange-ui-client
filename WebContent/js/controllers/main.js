angular
.module('app')
.controller('usersTableCtrl', usersTableCtrl)
.controller('insertNewsCtrl', insertNewsCtrl)
.controller('insertUserCtrl', insertUserCtrl)
.controller('newsTableCtrl', newsTableCtrl)
.controller('authentication', authentication);


authentication.$inject = [ '$scope', '$http', '$window' ]
function authentication($scope, $http, $window){
	
	$scope.isAuthenticated = function() {
		
		if(localStorage.getItem('isAuthenticate') == null){
			return false;
		}
		else {
			return localStorage.getItem('isAuthenticate');
		}
	};
	
	$scope.redirectLogin = function() {
		
		$window.location.href = '?#!/login';
	}
	
	$scope.logout = function() {
		
		var req = {
				 method: 'POST',
				 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/logout',
		}
		
		$http(req).then(
				function(response)
				{
					localStorage.setItem('id_token', "");
					$http.defaults.headers.common['Authorization'] = "";
					localStorage.setItem('isAuthenticate', false);
					$window.location.href = '?#!/dashboard';
				},
				function()
				{
					
				} 
			);
	}
	
	$scope.login = function(){
		
		var req = {
				 method: 'POST',
				 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/login',
				 headers: {
				   'Content-Type': 'application/x-www-form-urlencoded'
				 },
				 data: $.param({email : $scope.email, password: $scope.password})
		}
		
		$http(req).then(
				function(response)
				{
					localStorage.setItem('id_token', response.headers('Authorization'));
					localStorage.setItem('isAuthenticate', true);
					$http.defaults.headers.common['Authorization'] = response.headers('Authorization');
					$window.location.href = '?#!/dashboard';
				},
				function()
				{
					
				} 
			);
		};
}

newsTableCtrl.$inject = ['$scope', '$http', '$window']
function newsTableCtrl($scope, $http, $window){
	
	var req = {
			 method: 'GET',
			 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/news/findAll',
			 headers: {
			   'Content-Type': 'application/json'
			 }
	}
		
	$http(req).then(
		function(response)
		{
			$scope.news = response.data;
		},
		function(response)
		{
			if(response.status === 401 || response.status === 403){
				localStorage.setItem('isAuthenticate', false);
				$window.location.href = '?#!/login';
			}
			$scope.news = [];
		} 
	);
}

usersTableCtrl.$inject = ['$scope', '$http', '$window'];
function usersTableCtrl($scope, $http, $window) {
	
	var req = {
			 method: 'GET',
			 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/admin/findAllUsers',
	}
		
	$http(req).then(
		function(response)
		{
			$scope.users = response.data;
		},
		function(response)
		{
			if(response.status === 401 || response.status === 403){
				localStorage.setItem('isAuthenticate', false);
				$window.location.href = '?#!/login';
			}
			$scope.users = [];
		} 
	);
}

insertNewsCtrl.$inject = ['$scope', '$http', '$window'];
function insertNewsCtrl($scope, $http, $window){
	
	$scope.submit = function(){
		
		var result = {
				author: $scope.author,
				content: $scope.content,
				title: $scope.title,
				category: $scope.category,
				images: $scope.images
			}
				
		var req = {
				 method: 'POST',
				 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/admin/insertNews',
				 headers: {
				   'Content-Type': 'application/json'
				 },
				 data: result
			}
			
		$http(req).then(
			function()
			{ 
				$window.location.href = '#!/dashboard';
			},
			function(response)
			{
				if(response.status === 401 || response.status === 403){
					localStorage.setItem('isAuthenticate', false);
					$window.location.href = '?#!/login';
				}
			} 
		);
	};
}

insertUserCtrl.$inject = ['$scope', '$http', '$window']
function insertUserCtrl ($scope, $http, $window){
	
	$scope.submit = function(){
			
			var result = {
					userName: $scope.username,
					email: $scope.email,
					password: $scope.password,
					firstName: $scope.firstname,
					lastName: $scope.lastname,
					phone: $scope.phone,
					role: $scope.role,
					avatar: $scope.avatar
			}
					
			var req = {
					 method: 'POST',
					 url: 'https://localhost:8443/bulgarian-grain-exchange/rest/register',
					 headers: {
					   'Content-Type': 'application/json'
					 },
					 data: result
			}
			
			$http(req).then(
				function()
				{ 
					$window.location.href = '#!/dashboard';
				},
				function(response)
				{
					if(response.status === 401 || response.status === 403){
						localStorage.setItem('isAuthenticate', false);
						$window.location.href = '?#!/login';
					}
				} 
			);
		};
}

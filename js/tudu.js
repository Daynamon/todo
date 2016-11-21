var app = angular.module("app", ["xeditable"]);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller("contro", function($scope) {
 $scope.todoList = [];

if (localStorage.getItem("todoList")) {
 var localTodoToJson = JSON.parse(localStorage.getItem("todoList"));
 $scope.todoList = localTodoToJson;
}

 $scope.todoAdd=function() {
   console.log("Hola");
   $scope.todoList.push({muestra:$scope.todoInput});
   console.log($scope.todoList);
   var localTodo = JSON.stringify(angular.copy($scope.todoList));
   localStorage.setItem("todoList", localTodo);
   $scope.todoInput="";
 };

 $scope.remove = function() {
   $scope.todoList = [];
   localStorage.setItem("todoList", "");
 };

 $scope.delete=function(destroy) {
   $scope.todoList.splice(destroy, 1);
   var localTodo = JSON.stringify(angular.copy($scope.todoList));
   localStorage.setItem("todoList", localTodo);
 };

  $scope.updateLocalStorage = function(){
    var localTodo = JSON.stringify(angular.copy($scope.todoList));
    console.log(localTodo);
    localStorage.setItem("todoList", localTodo);
  };
});

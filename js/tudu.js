var app = angular.module("app", []);

app.controller("contro", function ($scope) {
  $scope.todoList = [];

  if (localStorage.getItem("todoList")) {
    var localTodoToJson = JSON.parse(localStorage.getItem("todoList"));
    $scope.todoList = localTodoToJson;
  }

  $scope.todoAdd = function () {
    console.log("Hola");
    $scope.todoList.push({ muestra: $scope.todoInput });
    console.log($scope.todoList);
    var localTodo = JSON.stringify(angular.copy($scope.todoList));
    localStorage.setItem("todoList", localTodo);
    $scope.todoInput = "";
  };

  $scope.remove = function () {
    $scope.todoList = [];
    localStorage.setItem("todoList", "");
  };

  $scope.delete = function (destroy) {
    $scope.todoList.splice(destroy, 1);
    var localTodo = JSON.stringify(angular.copy($scope.todoList));
    localStorage.setItem("todoList", localTodo);
  };

  $scope.updateLocalStorage = function(a){
    var localTodo = JSON.stringify(angular.copy($scope.todoList));
    localStorage.setItem("todoList", localTodo);
  }
});





// On esc event
app.directive('onEsc', function () {
  return function (scope, elm, attr) {
    elm.bind('keydown', function (e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.onEsc);
      }
    });
  };
});

// On enter event
app.directive('onEnter', function () {
  return function (scope, elm, attr) {
    elm.bind('keypress', function (e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.onEnter);
      }
    });
  };
});

// Inline edit directive
app.directive('inlineEdit', function ($timeout) {
  return {
    scope: {
      model: '=inlineEdit',
      handleSave: '&onSave',
      handleCancel: '&onCancel'
    },
    link: function (scope, elm, attr) {
      var previousValue;

      scope.edit = function () {
        scope.editMode = true;
        previousValue = scope.model;

        $timeout(function () {
          elm.find('input')[0].focus();
        }, 0, false);
      };
      scope.save = function () {
        scope.editMode = false;
        scope.handleSave({ value: scope.model });
      };
      scope.cancel = function () {
        scope.editMode = false;
        scope.model = previousValue;
        scope.handleCancel({ value: scope.model });
      };
    },
    templateUrl: 'inline-edit.html'
  };
});
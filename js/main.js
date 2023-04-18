(function () {
  var app = angular.module("myApp", []);

  app.controller("demoCtrl", ["$scope", DemoController]);

  // // Problem 1: Callbacks
  function DemoController($scope) {
    //    TODO: Code here!
    let urlUserApi = "https://jsonplaceholder.typicode.com/users";
    let urlPostApi = "https://jsonplaceholder.typicode.com/posts?userId=";
    let urlCommentApi = "https://jsonplaceholder.typicode.com/comments?postId="
    $.get(urlUserApi, function (users) {
      users.forEach((user) => {
        $.get(urlPostApi + user.id, function (postsData) {
          user.posts = postsData;
          postsData.forEach((comment) => {
            $.get(urlCommentApi + postsData.id, function (commentsData) {
              comment.comments = commentsData;
              $.get(user.id);
              $scope.$apply(function () {
                $scope.users = users;
              });
            })
          });
        });
      });
      try {
      } catch (error) { }
    });
  }

  // Problem 2: Promise
  // function DemoController($scope) {
  //    TODO: Code here!
  //helloWorld ad sd asd sa s 
  // }

  // Problem 03: Generators // BO QUA

  // Problem 04: async/await
  // async function DemoController($scope) {
  //   TODO: Code here!
  // }
})();

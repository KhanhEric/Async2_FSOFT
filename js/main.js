(function () {
  var app = angular.module("myApp", []);

  app.controller("demoCtrl", ["$scope", DemoController]);

  // // Problem 1: Callbacks
  // function DemoController($scope) {
  //   //    TODO: Code here!
  //   let urlUserApi = "https://jsonplaceholder.typicode.com/users";
  //   let urlPostApi = "https://jsonplaceholder.typicode.com/posts?userId=";
  //   let urlCommentApi = "https://jsonplaceholder.typicode.com/comments?postId="
  //   $.get(urlUserApi, function (users) {
  //     users.forEach((user) => {
  //       $.get(urlPostApi + user.id, function (postsData) {
  //         user.posts = postsData;
  //         postsData.forEach((comment) => {
  //           $.get(urlCommentApi + postsData.id, function (commentsData) {
  //             comment.comments = commentsData;
  //             $.get(user.id);
  //             $scope.$apply(function () {
  //               $scope.users = users;
  //             });
  //           })
  //         });
  //       });
  //     });
  //     try {
  //     } catch (error) { }
  //   });
  // }

  // Problem 2: Promise
  function DemoController($scope) {
    //    TODO: Code here!
    let userApi = "https://jsonplaceholder.typicode.com/users";
    let postApi = "https://jsonplaceholder.typicode.com/posts?userId=";
    let commentApi = "https://jsonplaceholder.typicode.com/comments?postId=";
    let users = [];
    function getData(url) {
      return new Promise((resolve, reject) => {
        $.get(url, function (data, status) {
          if (status == "success") {
            resolve(data);
          }
          reject(new Error(`Bao loi tai : ${url}`));
        });
      });
    }
    getData(userApi)
      .then((data) => {
        let userPromise = [];
        data.forEach((user) => {
          users = data;
          userPromise.push(getData(user.id));
        });
        $scope.$apply(function () {
          $scope.users = users;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Problem 03: Generators // BO QUA

  // Problem 04: async/await
  // async function DemoController($scope) {
  //   TODO: Code here!
  // }
})();

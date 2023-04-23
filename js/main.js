(function () {
  var app = angular.module("myApp", []);

  app.controller("demoCtrl", ["$scope", DemoController]);

  // Problem 1: Callbacks
  // function DemoController($scope) {
  //   //    TODO: Code here!
  //   let urlUserApi = "https://jsonplaceholder.typicode.com/users";
  //   let urlPostApi = "https://jsonplaceholder.typicode.com/posts?userId=";
  //   let urlCommentApi = "https://jsonplaceholder.typicode.com/comments?postId=";
  //   $.get(urlUserApi, function (users) {
  //     users.forEach((user) => {
  //       $.get(urlPostApi + user.id, function (postsData) {
  //         user.posts = postsData;
  //         postsData.forEach((post) => {
  //           $.get(urlCommentApi + post.id, function (commentsData) {
  //             post.comments = commentsData;
  //             $scope.$apply(function () {
  //               $scope.users = users;
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // }

  // Problem 2: Promise
  // function DemoController($scope) {
  //   //    TODO: Code here!
  //   let userApi = "https://jsonplaceholder.typicode.com/users";
  //   let postApi = "https://jsonplaceholder.typicode.com/posts?userId=";
  //   let commentApi = "https://jsonplaceholder.typicode.com/comments?postId=";
  //   let userPromise = [];
  //   let postPromise = [];
  //   let users = [];
  //   function getData(url) {
  //     return new Promise((resolve, reject) => {
  //       $.get(url, function (data) {
  //         resolve(data);
  //       });
  //     });
  //   }
  //   getData(userApi)
  //     .then((data) => {
  //       data.forEach((user) => {
  //         users = data;
  //         userPromise.push(getData(postApi + user.id));
  //       });
  //       return Promise.all(userPromise);
  //     })
  //     .then((postsData) => {
  //       users.forEach((user, index) => {
  //         user.posts = postsData[index];
  //         user.posts.forEach((post) => {
  //           postPromise.push(getData(commentApi + post.id));
  //         });
  //       });
  //       return Promise.all(postPromise);
  //     })
  //     .then((commentsData) => {
  //       users.forEach((user) => {
  //         user.posts.forEach((post) => {
  //           post.comments = commentsData[post.id];
  //         });
  //       });
  //       $scope.$apply(function () {
  //         $scope.users = users;
  //       });
  //     })
  //     .catch((err) => {});
  // }

  // Problem 03: Generators // BO QUA

  // Problem 04: async/await
  async function DemoController($scope) {
    //   TODO: Code here!
    let userApi = "https://jsonplaceholder.typicode.com/users";
    let postApi = "https://jsonplaceholder.typicode.com/posts?userId=";
    let commentApi = "https://jsonplaceholder.typicode.com/comments?postId=";
    let users = [];
    // function getData(url) {
    //   return new Promise((resolve, reject) => {
    //     $.get(url, function (data) {
    //       resolve(data);
    //     });
    //   });
    // }

    // (async function getDataFromAsync() {
    //   try {
    //     var userData = await getData(userApi);
    //   } catch (err) {}
    //   users = userData;
    //   for (let user of userData) {
    //     let postData = await getData(postApi + user.id);
    //     user.posts = postData;
    //     for (let post of postData) {
    //       let commentData = await getData(commentApi + post.id);
    //       post.comments = commentData;
    //     }
    //     $scope.$apply(function () {
    //       $scope.users = users;
    //     });
    //   }
    // })();

    // FIX
    try {
      users = await $.get(userApi);
      users.forEach(async (user) => {
        user.posts = await $.get(postApi + user.id);
        user.posts.forEach(async (post) => {
          post.comments = await $.get(commentApi + post.id);
          $scope.$apply(function () {
            $scope.users = users;
          });
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
})();

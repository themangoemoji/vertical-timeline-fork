jQuery(document).ready(function($){





  var timelineBlocks = $('.cd-timeline-block'),
  offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    (!window.requestAnimationFrame)
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }
});



var app = angular.module('myModule', []);

app.controller('mainCtrl', function($scope, $http) {
  $scope.events = [
    //{'title':'Application Deadline', 'description':'Complete the online application by today or you will likely die'},
    //{'title':'0st Round Interviews', 'description':'Plead with Sam and Brad for a spot it will work'},
    //{'title':'Second Round Interviews', 'description':'Roll on the ground and ask for a job trust me'}
  ];

  var url = 'https://spreadsheets.google.com/feeds/list/1rUiabmgoujPc1EWCSCvGiDhk80c9Y8ykcQ57D2Z7hfI/od6/public/values?alt=json';

  $http({
    method: 'GET',
    url: url
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.getSpreadsheetData = function() {
    $scope.webjson = $.getJSON(url, function(data){

      //grab spreadsheet data from google sheet
      $scope.spreadsheet = data;
      var entry_array = data.feed.entry;


      // Loop through the entries from the spreadsheet JSON
      for (var entry in entry_array) {

        // Grab elements from JSON
        var description = entry_array[entry].gsx$description.$t;
        var title       = entry_array[entry].gsx$title.$t;

        console.log(entry_array[entry]);
        // Push elements to JS array for angular to use
        $scope.events.push({"title":title, "description":description});

      } /* end of for loop*/


    }) /*end of getJSON function */

    console.log($scope.events);
  }

});

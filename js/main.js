var $ = require('jQuery');

jQuery(document).ready(function($){

  console.log("jQuery ready");

  //console.log("Users JSON: ", $users[1].dogs[0].name);

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

app.controller('mainCtrl', function($scope) {
  $scope.events = [
    {'title':'Application Deadline', 'description':'Complete the online application by today or you will likely die'},
    {'title':'1st Round Interviews', 'description':'Plead with Sam and Brad for a spot it will work'},
    {'title':'Second Round Interviews', 'description':'Roll on the ground and ask for a job trust me'}
  ];
});

/**
*
* -----------------------------------------------------------------------------
*
* Template : Brainda - Online Courses & Learning HTML Template
* Author : thecodude
* Author URI : http://thecodude.com/
*
* -----------------------------------------------------------------------------
*
**/

(function($) {
    "use strict";

    // Responsive Menu Toggle Class
    $(".canvas-menu-area .parent-menu a").on('click', function() {
        $(this).parents('.parent-menu').children('.hidden-menu').toggleClass("showhide");
    });
    
    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);

    win.on('scroll', function() {
       var scroll = win.scrollTop();
       if (scroll < 80) {
           header.removeClass("sticky");
       } else {
           header.addClass("sticky");
       }
    });

    // Smooth About
    if ($('.contactBtn').length){
        $(".contactBtn").on(' click ', function() {
            $('html, body').animate({
                scrollTop: $(".tcd-contact-form").offset().top
            }, 1200);
        });
    }

    // scrollTop init
    var totop = $('#toTop');    
    win.on('scroll', function() {
        if (win.scrollTop() > 150) {
            totop.fadeIn();
        } else {
            totop.fadeOut();
        }
    });

    // totop scroller
    totop.on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    });

    // Counter Number
    var counterNumber = $('.counter-number');
    if(counterNumber.length){
        counterNumber.counterUp({
            delay: 10,
            time: 1000
        });
    }

    //canvas menu
    $('#nav-expander').on('click',function(e){
        e.stopPropagation();
        $('body').toggleClass('nav-expanded');
    });
    
    $('#nav-close').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('nav-expanded');
    });

    // Course Carousel
    var courseCarousel = $('.course-list');
    if (courseCarousel.length) {
        courseCarousel.owlCarousel({
            items:4,
            autoPlay: true,
            loop: true,
            margin: 30,
            navSpeed: 1000,
            nav:true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive:{
                0:{
                    items:1,
                },
                768:{
                    items:2,
                },
                992:{
                    items:4,
                },
            }
        });
    }

    // Team Carousel
    var teamCarousel = $('.team-member');
    if (teamCarousel.length) {
        teamCarousel.owlCarousel({
            items:4,
            autoplay: true,
            loop: true,
            margin: 30,
            navSpeed: 1000,
            nav:true,
            dots: false,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive:{
                0:{
                    items:1,
                },
                768:{
                    items:2,
                },
                992:{
                    items:4,
                },
            }
        });
    }

    // Blog Carousel
    var blogCarousel = $('.blog-carousel');
    if (blogCarousel.length) {
        blogCarousel.owlCarousel({
            items:3,
            autoplay: true,
            loop: true,
            margin: 30,
            navSpeed: 1000,
            nav:true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                768:{
                    items:2,
                    nav:false
                },
                992:{
                    items:3,
                },
            }
        });
    }

    // Partner Carousel
    var partnerCarousel = $('.partner-carousel');
    if (partnerCarousel.length) {
        partnerCarousel.owlCarousel({
            items:6,
            autoplay: true,
            loop: true,
            margin: 30,
            navSpeed: 1500,
            dots: false,
            responsive:{
                0:{
                    items:2,
                },
                576:{
                    items:4,
                },
                768:{
                    items:4,
                },
                992:{
                    items:6,
                },
            }
        });
    }

    // Home Slider
    var homeSlider = $('.home-slider');
    if (homeSlider.length) {
        homeSlider.owlCarousel({
            items:1,
            autoplay: true,
            loop: true,
            margin: 0,
            autoHeight:true,
            navSpeed: 800,
            nav:true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        });
    }

    // Testi Carousel
    var testiCarousel = $('.testi-carousel');
    if (testiCarousel.length) {
        testiCarousel.owlCarousel({
            items:1,
            autoplay: true,
            loop: true,
            margin: 30,
            slideSpeed: 800,
            dots: false,
            smartSpeed: 800,
            responsive:{
                992:{
                    dots: true,
                },
            }
        });
    }

    // Google Map
    if ($('#googleMap').length) {
        var initialize = function() {
            var mapOptions = {
              zoom: 18,
              scrollwheel: false,
              center: new google.maps.LatLng(-37.8172729,144.9557679),
              styles: [{
                  stylers: [{
                      saturation: -30
                  }]
              }]
            };
            var map = new google.maps.Map(document.getElementById("googleMap"),
                mapOptions);
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: 'images/map-marker.png',
                map: map
            });
        }
        // Add the map initialize function to the window load function
        google.maps.event.addDomListener(window, "load", initialize);
    }
	
})(jQuery);
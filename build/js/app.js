// =========== Base module ===========

var BaseModule = function(){
    this.log = function(elem){
        return console.log(elem)
    };

    this.getPosition = function(elem,position){
        if(position == "left"){
            return $(elem).offset().left;
        }
        else if(position == "top"){
            return $(elem).offset().top;
        }

    };

    this.scrollTo = function(elem, speed){
        return $('body,html').animate({scrollTop: this.getPosition(elem,"top")}, speed);
    };

    this.cloneInsert = function(parent,element){
        return element.clone(true).prependTo(parent);
    };

    this.getUrl = function(){
        return document.location.href;
    };
    this.getPage = function(){
        if(document.location.pathname == "/"){
            return false;
        };
        return document.location.pathname.match(/([a-zA-Z]+)/)[0];
    };
    this.scrollPos = function(){
        return window.pageYOffset;
    };
    this.debagWindow = function(text,bgColor,textColor){
      if(!bgColor){
        bgColor = "rgba(255,180,255,.8)"
      }
      if(!textColor){
        textColor = "#333";
      }
      if($("div").is($(".debag__window"))){
        $('.debag__window').html(text);
      }else{
        $("<div class='debag__window'><div>").prependTo("body").css({
          "width" : "40vw",
          "max-height" : "auto",
          "background" : bgColor,
          "color" : textColor,
          "font-size" : "100%",
          "padding" : "10vh 0",
          "position" : "fixed",
          "z-index" : "99999999",
          "text-align" : "center",
          "top" : "50%",
          "left" : "50%",
          "transform" : "translate(-50%,-50%)",
          "margin" : "auto"
        }).html(text);
      }
    };



     this.getPositionTotal = function(elem){

        var $this = $(elem);
        //console.log($this.offset());
        /*return true;*/

        switch(elem){
           case "window":
                return {
                    "elem" : "window",
                    "height" : $(window).height(),
                    "width" : $(window).width(),
                    "bottom" : $(window).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(window).width(),
                    "centerTop" : $(window).height() / 2,
                    "centerleft" : $(window).width() / 2
                }
                break
            case "document":
                return {
                    "elem" : "document",
                    "height" : $(document).height(),
                    "width" : $(document).width(),
                    "bottom" : $(document).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(document).width(),
                    "centerTop" : $(document).height() / 2,
                }
                break
            case "scroll":
                return {
                    "elem" : "scroll",
                    "top" : $(document).scrollTop(),
                    "bottom" : $(document).scrollTop() + $(window).height(),
                    "left" : $(document).scrollLeft(),
                    "right" : $(document).scrollLeft() + $(document).width(),
                    "centerTop" : ($(document).scrollTop() + $(window).height()) / 2,
                    "centerLeft" : ($(document).scrollLeft() + $(window).width()) / 2,

                }
                break
            default:
                var obj = [];
                $.each($this,function(i){
                    var $this = elem.eq(i);
                    obj.push( 
                    {
                        "elem" : $this,
                        "width" : $this.outerWidth(),
                        "height" : $this.outerHeight(),
                        "top" : $this.offset().top,
                        "left" : $this.offset().left,
                        "right" : $this.outerWidth() + $this.offset().left,
                        "bottom" : $this.outerHeight() + $this.offset().top,
                        "centerTop" : ($this.outerHeight() + $this.offset().top) / 2,
                        "centerLeft" : ($this.outerWidth() + $this.offset().left) / 2,
                    })

                })
                return obj;    
            break
        };
    };







    this.inWindow = function(elem,topElem,position){
        if(!topElem){
            topElem = 0;
        }
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        var currentEls = elem;
        var result = [];
        currentEls.each(function(){
            var el = $(this);
            var offset = el.offset();

              switch(position){
                case "top":
                    offset = $(this).offset().top;
                    break
                case "bottom":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + $(this).height();
                    break
                case "center":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + ($(this).height() / 2);
                    break
                default:
                    offset = $(this).offset().top;
                    break
            }


            //console.log(scrollTop);
            if(scrollTop >= offset.top && scrollTop <= offset.top +(topElem) + el.height())
                //scrollTop >= offset && scrollTop <= offset + $(this).height()
            result.push(this);
        });
    return $(result);
    };

    this.getImgPath = function(){
    	return "./img/";
    }
    this.getTransition = function(){
        return 'transitionend webkitTransitionEnd oTransitionEnd';
    }

};



var commonModule = (function() {

		var scrollSpeed = 700;

		var base = new BaseModule;


		var animateSkills = function(){
			var skillValues = [];
			var circle = $('.skill__circle');

			$.each(circle,function(){
				skillValues.push($(this).attr('style'));
			});

			
			$(window).on('load',function(){
				if($('section').offset().top >= $(document).scrollTop()){
					circle.css({
						'stroke-dasharray': '0 100'
					})
				}
			})

			$(document).on('scroll',function(){
				if($('section').offset().top <= $(document).scrollTop()){
					$.each(circle,function(index){
						$(this).attr('style',skillValues[index]);
					})
				}
			})

		}

		var _setUpListener = function(){

			// svg polifill
			svg4everybody({});

			// scroll to section
			$('.header__button-ico').on('click',function(e){
				e.preventDefault();
				base.scrollTo('section',scrollSpeed);
			})

			//scroll to start page

			$('.section__button-up .arrow__link').on('click',function(e){
				e.preventDefault();
				base.scrollTo('body',scrollSpeed);
			})

		}

    return {
    	init: function(){
    		animateSkills();
    		_setUpListener();
    	}
    }
})();
var menuModule = (function() {


		var base = new BaseModule;
		var $button = $('.menu-button');

		var buttonAnimation = function(e){
			e.preventDefault();
			$(this).toggleClass('menu-button--active');
			$('.menu--popup').toggleClass('menu--popup-active');
		}

		var _setUpListener = function(){
			$button.on('click',buttonAnimation)
		}

		var _addMenu = function(){
			
				var $menu = $('.menu')
				.clone()
				.removeAttr('class')
				.addClass('menu menu--popup__nav')
				.appendTo('body')
				.wrap('<div class="menu--popup"></div>');
		}

    return {
    	init: function(){
    		if(base.getPage()){
    			_addMenu();
    		}
    		_setUpListener();
    	}
    }
})();
var parallaxModule = (function() {


		//var base = new BaseModule;

		var layer = $('.parallax').find('.parallax__layer');

			layer.map(function(key,value){
					$(value).css({
						'transform' : 'translate3d(0px,0px,0px)'
					});
				})

		function setParallax(){
			$(window).on('mousemove',function(e){
			var mouse_dx = e.pageX;
			var mouse_dy = e.pageY;

			var w = (window.innerWidth/2) - mouse_dx;
			var h = (window.innerHeight/2) - mouse_dy;

				

			layer.map(function(key,value){
					var widthPosition = w * ((key + 1)  / 100) /2.5;
					var heightPosition = h * ((key + 1) / 100) /2.5;
					$(value).css({
						'transform' : 'translate3d('+ widthPosition +'px, '+ heightPosition +'px, 0px)'
					});
				})
			})
		}

		var _setUpListener = function(){
			if((window).innerWidth >= 1200){
				setParallax();
			}
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();
var blurModule = (function() {

		//var base = new BaseModule;

		var section = $('.section__bg');
		var blur = $('.cover__blur');


		var setBlur = function(){
			var imgWidth = section.width();
			var posLeft = section.offset().left - blur.offset().left;
			var posTop = section.offset().top - blur.offset().top;

			blur.css({
				'background-size' : imgWidth + 'px',
				'background-position' : posLeft + 'px '+ posTop +'px'
			})
		}

		var _setUpListener = function(){
			
			$(window).on('resize',function(){
				setBlur();
			})
			$(window).on('load',function(){
				setBlur();
			})
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();
var base = new BaseModule();

if(base.getPage() == "about"){
function initMap() {
        var position = {lat: 60.00863023, lng: 30.24842441};
        var markerPosition =  {lat: 60.017391, lng: 30.273618};
        var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        scrollwheel: false,
        zoom: 14,
        disableDefaultUI: true
        });
        var image = {
              url: base.getImgPath() + "map-marker.png",
              size: new google.maps.Size(71, 71),
              anchor: new google.maps.Point(17, 40),
              scaledSize: new google.maps.Size(40, 56)
            };
        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,
            title: 'Hello World!',
            icon: image,
            });
        var styles = [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#00bfa5"
            }
        ]
    }
]
map.setOptions({styles: styles});
}
}
$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();
	parallaxModule.init();
	if(base.getPage() == 'works'){
		blurModule.init();
	}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiX3BhcmFsbGF4LmpzIiwiX2JsdXIuanMiLCJfbWFwLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PSBCYXNlIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIEJhc2VNb2R1bGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbihlbGVtKXtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZWxlbSlcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uID09IFwibGVmdFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwb3NpdGlvbiA9PSBcInRvcFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbihlbGVtLCBzcGVlZCl7XHJcbiAgICAgICAgcmV0dXJuICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdGhpcy5nZXRQb3NpdGlvbihlbGVtLFwidG9wXCIpfSwgc3BlZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNsb25lSW5zZXJ0ID0gZnVuY3Rpb24ocGFyZW50LGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsb25lKHRydWUpLnByZXBlbmRUbyhwYXJlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFVybCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZXRQYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9cIil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvKFthLXpBLVpdKykvKVswXTtcclxuICAgIH07XHJcbiAgICB0aGlzLnNjcm9sbFBvcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIH07XHJcbiAgICB0aGlzLmRlYmFnV2luZG93ID0gZnVuY3Rpb24odGV4dCxiZ0NvbG9yLHRleHRDb2xvcil7XHJcbiAgICAgIGlmKCFiZ0NvbG9yKXtcclxuICAgICAgICBiZ0NvbG9yID0gXCJyZ2JhKDI1NSwxODAsMjU1LC44KVwiXHJcbiAgICAgIH1cclxuICAgICAgaWYoIXRleHRDb2xvcil7XHJcbiAgICAgICAgdGV4dENvbG9yID0gXCIjMzMzXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYoJChcImRpdlwiKS5pcygkKFwiLmRlYmFnX193aW5kb3dcIikpKXtcclxuICAgICAgICAkKCcuZGViYWdfX3dpbmRvdycpLmh0bWwodGV4dCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoXCI8ZGl2IGNsYXNzPSdkZWJhZ19fd2luZG93Jz48ZGl2PlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpLmNzcyh7XHJcbiAgICAgICAgICBcIndpZHRoXCIgOiBcIjQwdndcIixcclxuICAgICAgICAgIFwibWF4LWhlaWdodFwiIDogXCJhdXRvXCIsXHJcbiAgICAgICAgICBcImJhY2tncm91bmRcIiA6IGJnQ29sb3IsXHJcbiAgICAgICAgICBcImNvbG9yXCIgOiB0ZXh0Q29sb3IsXHJcbiAgICAgICAgICBcImZvbnQtc2l6ZVwiIDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBcInBhZGRpbmdcIiA6IFwiMTB2aCAwXCIsXHJcbiAgICAgICAgICBcInBvc2l0aW9uXCIgOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICBcInotaW5kZXhcIiA6IFwiOTk5OTk5OTlcIixcclxuICAgICAgICAgIFwidGV4dC1hbGlnblwiIDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIFwidG9wXCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJsZWZ0XCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIiA6IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIixcclxuICAgICAgICAgIFwibWFyZ2luXCIgOiBcImF1dG9cIlxyXG4gICAgICAgIH0pLmh0bWwodGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgdGhpcy5nZXRQb3NpdGlvblRvdGFsID0gZnVuY3Rpb24oZWxlbSl7XHJcblxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQoZWxlbSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy5vZmZzZXQoKSk7XHJcbiAgICAgICAgLypyZXR1cm4gdHJ1ZTsqL1xyXG5cclxuICAgICAgICBzd2l0Y2goZWxlbSl7XHJcbiAgICAgICAgICAgY2FzZSBcIndpbmRvd1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwid2luZG93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJCh3aW5kb3cpLmhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlcmxlZnRcIiA6ICQod2luZG93KS53aWR0aCgpIC8gMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJkb2N1bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJChkb2N1bWVudCkud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJChkb2N1bWVudCkuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcInNjcm9sbFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwic2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlckxlZnRcIiA6ICgkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdykud2lkdGgoKSkgLyAyLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gW107XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goJHRoaXMsZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gZWxlbS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHVzaCggXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6ICR0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkdGhpcy5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICR0aGlzLm91dGVyV2lkdGgoKSArICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkdGhpcy5vdXRlckhlaWdodCgpICsgJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogKCR0aGlzLm91dGVySGVpZ2h0KCkgKyAkdGhpcy5vZmZzZXQoKS50b3ApIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJMZWZ0XCIgOiAoJHRoaXMub3V0ZXJXaWR0aCgpICsgJHRoaXMub2Zmc2V0KCkubGVmdCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7ICAgIFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHRoaXMuaW5XaW5kb3cgPSBmdW5jdGlvbihlbGVtLHRvcEVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKCF0b3BFbGVtKXtcclxuICAgICAgICAgICAgdG9wRWxlbSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRFbHMgPSBlbGVtO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGVsLm9mZnNldCgpO1xyXG5cclxuICAgICAgICAgICAgICBzd2l0Y2gocG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRvcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldFRvcCArICQodGhpcykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgKCQodGhpcykuaGVpZ2h0KCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzY3JvbGxUb3ApO1xyXG4gICAgICAgICAgICBpZihzY3JvbGxUb3AgPj0gb2Zmc2V0LnRvcCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0LnRvcCArKHRvcEVsZW0pICsgZWwuaGVpZ2h0KCkpXHJcbiAgICAgICAgICAgICAgICAvL3Njcm9sbFRvcCA+PSBvZmZzZXQgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldCArICQodGhpcykuaGVpZ2h0KClcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gJChyZXN1bHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldEltZ1BhdGggPSBmdW5jdGlvbigpe1xyXG4gICAgXHRyZXR1cm4gXCIuL2ltZy9cIjtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG4iLCJ2YXIgY29tbW9uTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBzY3JvbGxTcGVlZCA9IDcwMDtcclxuXHJcblx0XHR2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cclxuXHJcblx0XHR2YXIgYW5pbWF0ZVNraWxscyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBza2lsbFZhbHVlcyA9IFtdO1xyXG5cdFx0XHR2YXIgY2lyY2xlID0gJCgnLnNraWxsX19jaXJjbGUnKTtcclxuXHJcblx0XHRcdCQuZWFjaChjaXJjbGUsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRza2lsbFZhbHVlcy5wdXNoKCQodGhpcykuYXR0cignc3R5bGUnKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHJcblx0XHRcdCQod2luZG93KS5vbignbG9hZCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKCdzZWN0aW9uJykub2Zmc2V0KCkudG9wID49ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpKXtcclxuXHRcdFx0XHRcdGNpcmNsZS5jc3Moe1xyXG5cdFx0XHRcdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6ICcwIDEwMCdcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKCdzZWN0aW9uJykub2Zmc2V0KCkudG9wIDw9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpKXtcclxuXHRcdFx0XHRcdCQuZWFjaChjaXJjbGUsZnVuY3Rpb24oaW5kZXgpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmF0dHIoJ3N0eWxlJyxza2lsbFZhbHVlc1tpbmRleF0pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBfc2V0VXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHQvLyBzdmcgcG9saWZpbGxcclxuXHRcdFx0c3ZnNGV2ZXJ5Ym9keSh7fSk7XHJcblxyXG5cdFx0XHQvLyBzY3JvbGwgdG8gc2VjdGlvblxyXG5cdFx0XHQkKCcuaGVhZGVyX19idXR0b24taWNvJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0YmFzZS5zY3JvbGxUbygnc2VjdGlvbicsc2Nyb2xsU3BlZWQpO1xyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly9zY3JvbGwgdG8gc3RhcnQgcGFnZVxyXG5cclxuXHRcdFx0JCgnLnNlY3Rpb25fX2J1dHRvbi11cCAuYXJyb3dfX2xpbmsnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRiYXNlLnNjcm9sbFRvKCdib2R5JyxzY3JvbGxTcGVlZCk7XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0fVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICBcdGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0YW5pbWF0ZVNraWxscygpO1xyXG4gICAgXHRcdF9zZXRVcExpc3RlbmVyKCk7XHJcbiAgICBcdH1cclxuICAgIH1cclxufSkoKTsiLCJ2YXIgbWVudU1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cdFx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRcdHZhciAkYnV0dG9uID0gJCgnLm1lbnUtYnV0dG9uJyk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbkFuaW1hdGlvbiA9IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ21lbnUtYnV0dG9uLS1hY3RpdmUnKTtcclxuXHRcdFx0JCgnLm1lbnUtLXBvcHVwJykudG9nZ2xlQ2xhc3MoJ21lbnUtLXBvcHVwLWFjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBfc2V0VXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRidXR0b24ub24oJ2NsaWNrJyxidXR0b25BbmltYXRpb24pXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9hZGRNZW51ID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHJcblx0XHRcdFx0dmFyICRtZW51ID0gJCgnLm1lbnUnKVxyXG5cdFx0XHRcdC5jbG9uZSgpXHJcblx0XHRcdFx0LnJlbW92ZUF0dHIoJ2NsYXNzJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ21lbnUgbWVudS0tcG9wdXBfX25hdicpXHJcblx0XHRcdFx0LmFwcGVuZFRvKCdib2R5JylcclxuXHRcdFx0XHQud3JhcCgnPGRpdiBjbGFzcz1cIm1lbnUtLXBvcHVwXCI+PC9kaXY+Jyk7XHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRpZihiYXNlLmdldFBhZ2UoKSl7XHJcbiAgICBcdFx0XHRfYWRkTWVudSgpO1xyXG4gICAgXHRcdH1cclxuICAgIFx0XHRfc2V0VXBMaXN0ZW5lcigpO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pKCk7IiwidmFyIHBhcmFsbGF4TW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblx0XHQvL3ZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGU7XHJcblxyXG5cdFx0dmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG5cclxuXHRcdFx0bGF5ZXIubWFwKGZ1bmN0aW9uKGtleSx2YWx1ZSl7XHJcblx0XHRcdFx0XHQkKHZhbHVlKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJyA6ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFBhcmFsbGF4KCl7XHJcblx0XHRcdCQod2luZG93KS5vbignbW91c2Vtb3ZlJyxmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyIG1vdXNlX2R4ID0gZS5wYWdlWDtcclxuXHRcdFx0dmFyIG1vdXNlX2R5ID0gZS5wYWdlWTtcclxuXHJcblx0XHRcdHZhciB3ID0gKHdpbmRvdy5pbm5lcldpZHRoLzIpIC0gbW91c2VfZHg7XHJcblx0XHRcdHZhciBoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlX2R5O1xyXG5cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdGxheWVyLm1hcChmdW5jdGlvbihrZXksdmFsdWUpe1xyXG5cdFx0XHRcdFx0dmFyIHdpZHRoUG9zaXRpb24gPSB3ICogKChrZXkgKyAxKSAgLyAxMDApIC8yLjU7XHJcblx0XHRcdFx0XHR2YXIgaGVpZ2h0UG9zaXRpb24gPSBoICogKChrZXkgKyAxKSAvIDEwMCkgLzIuNTtcclxuXHRcdFx0XHRcdCQodmFsdWUpLmNzcyh7XHJcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nIDogJ3RyYW5zbGF0ZTNkKCcrIHdpZHRoUG9zaXRpb24gKydweCwgJysgaGVpZ2h0UG9zaXRpb24gKydweCwgMHB4KSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9zZXRVcExpc3RlbmVyID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoKHdpbmRvdykuaW5uZXJXaWR0aCA+PSAxMjAwKXtcclxuXHRcdFx0XHRzZXRQYXJhbGxheCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRfc2V0VXBMaXN0ZW5lcigpO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pKCk7IiwidmFyIGJsdXJNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly92YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cclxuXHRcdHZhciBzZWN0aW9uID0gJCgnLnNlY3Rpb25fX2JnJyk7XHJcblx0XHR2YXIgYmx1ciA9ICQoJy5jb3Zlcl9fYmx1cicpO1xyXG5cclxuXHJcblx0XHR2YXIgc2V0Qmx1ciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbWdXaWR0aCA9IHNlY3Rpb24ud2lkdGgoKTtcclxuXHRcdFx0dmFyIHBvc0xlZnQgPSBzZWN0aW9uLm9mZnNldCgpLmxlZnQgLSBibHVyLm9mZnNldCgpLmxlZnQ7XHJcblx0XHRcdHZhciBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldCgpLnRvcCAtIGJsdXIub2Zmc2V0KCkudG9wO1xyXG5cclxuXHRcdFx0Ymx1ci5jc3Moe1xyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXNpemUnIDogaW1nV2lkdGggKyAncHgnLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXBvc2l0aW9uJyA6IHBvc0xlZnQgKyAncHggJysgcG9zVG9wICsncHgnXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9zZXRVcExpc3RlbmVyID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHJcblx0XHRcdCQod2luZG93KS5vbigncmVzaXplJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNldEJsdXIoKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0JCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNldEJsdXIoKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgXHRcdF9zZXRVcExpc3RlbmVyKCk7XHJcbiAgICBcdH1cclxuICAgIH1cclxufSkoKTsiLCJ2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG5pZihiYXNlLmdldFBhZ2UoKSA9PSBcImFib3V0XCIpe1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHtsYXQ6IDYwLjAwODYzMDIzLCBsbmc6IDMwLjI0ODQyNDQxfTtcclxuICAgICAgICB2YXIgbWFya2VyUG9zaXRpb24gPSAge2xhdDogNjAuMDE3MzkxLCBsbmc6IDMwLjI3MzYxOH07XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgY2VudGVyOiBwb3NpdGlvbixcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgem9vbTogMTQsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBpbWFnZSA9IHtcclxuICAgICAgICAgICAgICB1cmw6IGJhc2UuZ2V0SW1nUGF0aCgpICsgXCJtYXAtbWFya2VyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDcxLCA3MSksXHJcbiAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMTcsIDQwKSxcclxuICAgICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNTYpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogbWFya2VyUG9zaXRpb24sXHJcbiAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0hlbGxvIFdvcmxkIScsXHJcbiAgICAgICAgICAgIGljb246IGltYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc3R5bGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Q2ZDZkNlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwYmZhNVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl1cclxubWFwLnNldE9wdGlvbnMoe3N0eWxlczogc3R5bGVzfSk7XHJcbn1cclxufSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRjb21tb25Nb2R1bGUuaW5pdCgpO1xyXG5cdG1lbnVNb2R1bGUuaW5pdCgpO1xyXG5cdHBhcmFsbGF4TW9kdWxlLmluaXQoKTtcclxuXHRpZihiYXNlLmdldFBhZ2UoKSA9PSAnd29ya3MnKXtcclxuXHRcdGJsdXJNb2R1bGUuaW5pdCgpO1xyXG5cdH1cclxufSk7Il19

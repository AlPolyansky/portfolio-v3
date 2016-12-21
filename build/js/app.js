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
    	return "./assets/img/";
    }
    this.getTransition = function(){
        return 'transitionend webkitTransitionEnd oTransitionEnd';
    }

};



var commonModule = (function() {

		var scrollSpeed = 700;

		var base = new BaseModule;
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

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();
var parallaxModule = (function() {


		//var base = new BaseModule;

		alert(50);
		var layer = $('.parallax').find('.parallax__layer');

		var _setUpListener = function(){
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

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();
$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();
	parallaxModule.init();

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiX3BhcmFsbGF4LmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09IEJhc2UgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgQmFzZU1vZHVsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uKGVsZW0pe1xyXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlbGVtKVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oZWxlbSxwb3NpdGlvbil7XHJcbiAgICAgICAgaWYocG9zaXRpb24gPT0gXCJsZWZ0XCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJChlbGVtKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBvc2l0aW9uID09IFwidG9wXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJChlbGVtKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zY3JvbGxUbyA9IGZ1bmN0aW9uKGVsZW0sIHNwZWVkKXtcclxuICAgICAgICByZXR1cm4gJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0aGlzLmdldFBvc2l0aW9uKGVsZW0sXCJ0b3BcIil9LCBzcGVlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2xvbmVJbnNlcnQgPSBmdW5jdGlvbihwYXJlbnQsZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xvbmUodHJ1ZSkucHJlcGVuZFRvKHBhcmVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0VXJsID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldFBhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL1wiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC8oW2EtekEtWl0rKS8pWzBdO1xyXG4gICAgfTtcclxuICAgIHRoaXMuc2Nyb2xsUG9zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgfTtcclxuICAgIHRoaXMuZGViYWdXaW5kb3cgPSBmdW5jdGlvbih0ZXh0LGJnQ29sb3IsdGV4dENvbG9yKXtcclxuICAgICAgaWYoIWJnQ29sb3Ipe1xyXG4gICAgICAgIGJnQ29sb3IgPSBcInJnYmEoMjU1LDE4MCwyNTUsLjgpXCJcclxuICAgICAgfVxyXG4gICAgICBpZighdGV4dENvbG9yKXtcclxuICAgICAgICB0ZXh0Q29sb3IgPSBcIiMzMzNcIjtcclxuICAgICAgfVxyXG4gICAgICBpZigkKFwiZGl2XCIpLmlzKCQoXCIuZGViYWdfX3dpbmRvd1wiKSkpe1xyXG4gICAgICAgICQoJy5kZWJhZ19fd2luZG93JykuaHRtbCh0ZXh0KTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJChcIjxkaXYgY2xhc3M9J2RlYmFnX193aW5kb3cnPjxkaXY+XCIpLnByZXBlbmRUbyhcImJvZHlcIikuY3NzKHtcclxuICAgICAgICAgIFwid2lkdGhcIiA6IFwiNDB2d1wiLFxyXG4gICAgICAgICAgXCJtYXgtaGVpZ2h0XCIgOiBcImF1dG9cIixcclxuICAgICAgICAgIFwiYmFja2dyb3VuZFwiIDogYmdDb2xvcixcclxuICAgICAgICAgIFwiY29sb3JcIiA6IHRleHRDb2xvcixcclxuICAgICAgICAgIFwiZm9udC1zaXplXCIgOiBcIjEwMCVcIixcclxuICAgICAgICAgIFwicGFkZGluZ1wiIDogXCIxMHZoIDBcIixcclxuICAgICAgICAgIFwicG9zaXRpb25cIiA6IFwiZml4ZWRcIixcclxuICAgICAgICAgIFwiei1pbmRleFwiIDogXCI5OTk5OTk5OVwiLFxyXG4gICAgICAgICAgXCJ0ZXh0LWFsaWduXCIgOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgXCJ0b3BcIiA6IFwiNTAlXCIsXHJcbiAgICAgICAgICBcImxlZnRcIiA6IFwiNTAlXCIsXHJcbiAgICAgICAgICBcInRyYW5zZm9ybVwiIDogXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKVwiLFxyXG4gICAgICAgICAgXCJtYXJnaW5cIiA6IFwiYXV0b1wiXHJcbiAgICAgICAgfSkuaHRtbCh0ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgICB0aGlzLmdldFBvc2l0aW9uVG90YWwgPSBmdW5jdGlvbihlbGVtKXtcclxuXHJcbiAgICAgICAgdmFyICR0aGlzID0gJChlbGVtKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCR0aGlzLm9mZnNldCgpKTtcclxuICAgICAgICAvKnJldHVybiB0cnVlOyovXHJcblxyXG4gICAgICAgIHN3aXRjaChlbGVtKXtcclxuICAgICAgICAgICBjYXNlIFwid2luZG93XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJ3aW5kb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiIDogJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVybGVmdFwiIDogJCh3aW5kb3cpLndpZHRoKCkgLyAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtXCIgOiBcImRvY3VtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICQoZG9jdW1lbnQpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICQoZG9jdW1lbnQpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICQoZG9jdW1lbnQpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwic2Nyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJzY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogJChkb2N1bWVudCkuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSArICQoZG9jdW1lbnQpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJUb3BcIiA6ICgkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyTGVmdFwiIDogKCQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSArICQod2luZG93KS53aWR0aCgpKSAvIDIsXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBbXTtcclxuICAgICAgICAgICAgICAgICQuZWFjaCgkdGhpcyxmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSBlbGVtLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wdXNoKCBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogJHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICR0aGlzLm91dGVyV2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICR0aGlzLm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAkdGhpcy5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogJHRoaXMub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJHRoaXMub3V0ZXJXaWR0aCgpICsgJHRoaXMub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICR0aGlzLm91dGVySGVpZ2h0KCkgKyAkdGhpcy5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAoJHRoaXMub3V0ZXJIZWlnaHQoKSArICR0aGlzLm9mZnNldCgpLnRvcCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNlbnRlckxlZnRcIiA6ICgkdGhpcy5vdXRlcldpZHRoKCkgKyAkdGhpcy5vZmZzZXQoKS5sZWZ0KSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajsgICAgXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgdGhpcy5pbldpbmRvdyA9IGZ1bmN0aW9uKGVsZW0sdG9wRWxlbSxwb3NpdGlvbil7XHJcbiAgICAgICAgaWYoIXRvcEVsZW0pe1xyXG4gICAgICAgICAgICB0b3BFbGVtID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICB2YXIgY3VycmVudEVscyA9IGVsZW07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRFbHMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWwub2Zmc2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgIHN3aXRjaChwb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidG9wXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgJCh0aGlzKS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXRUb3AgKyAoJCh0aGlzKS5oZWlnaHQoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNjcm9sbFRvcCk7XHJcbiAgICAgICAgICAgIGlmKHNjcm9sbFRvcCA+PSBvZmZzZXQudG9wICYmIHNjcm9sbFRvcCA8PSBvZmZzZXQudG9wICsodG9wRWxlbSkgKyBlbC5oZWlnaHQoKSlcclxuICAgICAgICAgICAgICAgIC8vc2Nyb2xsVG9wID49IG9mZnNldCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0ICsgJCh0aGlzKS5oZWlnaHQoKVxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiAkKHJlc3VsdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0SW1nUGF0aCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBcdHJldHVybiBcIi4vYXNzZXRzL2ltZy9cIjtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG4iLCJ2YXIgY29tbW9uTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBzY3JvbGxTcGVlZCA9IDcwMDtcclxuXHJcblx0XHR2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cdFx0dmFyIF9zZXRVcExpc3RlbmVyID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRcdC8vIHN2ZyBwb2xpZmlsbFxyXG5cdFx0XHRzdmc0ZXZlcnlib2R5KHt9KTtcclxuXHJcblx0XHRcdC8vIHNjcm9sbCB0byBzZWN0aW9uXHJcblx0XHRcdCQoJy5oZWFkZXJfX2J1dHRvbi1pY28nKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRiYXNlLnNjcm9sbFRvKCdzZWN0aW9uJyxzY3JvbGxTcGVlZCk7XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQvL3Njcm9sbCB0byBzdGFydCBwYWdlXHJcblxyXG5cdFx0XHQkKCcuc2VjdGlvbl9fYnV0dG9uLXVwIC5hcnJvd19fbGluaycpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGJhc2Uuc2Nyb2xsVG8oJ2JvZHknLHNjcm9sbFNwZWVkKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgXHRcdF9zZXRVcExpc3RlbmVyKCk7XHJcbiAgICBcdH1cclxuICAgIH1cclxufSkoKTsiLCJ2YXIgbWVudU1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cdFx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRcdHZhciAkYnV0dG9uID0gJCgnLm1lbnUtYnV0dG9uJyk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbkFuaW1hdGlvbiA9IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ21lbnUtYnV0dG9uLS1hY3RpdmUnKTtcclxuXHRcdFx0JCgnLm1lbnUtLXBvcHVwJykudG9nZ2xlQ2xhc3MoJ21lbnUtLXBvcHVwLWFjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBfc2V0VXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRidXR0b24ub24oJ2NsaWNrJyxidXR0b25BbmltYXRpb24pXHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRfc2V0VXBMaXN0ZW5lcigpO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pKCk7IiwidmFyIHBhcmFsbGF4TW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblx0XHQvL3ZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGU7XHJcblxyXG5cdFx0YWxlcnQoNTApO1xyXG5cdFx0dmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG5cclxuXHRcdHZhciBfc2V0VXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQod2luZG93KS5vbignbW91c2Vtb3ZlJyxmdW5jdGlvbihlKXtcclxuXHRcdFx0XHR2YXIgbW91c2VfZHggPSBlLnBhZ2VYO1xyXG5cdFx0XHRcdHZhciBtb3VzZV9keSA9IGUucGFnZVk7XHJcblxyXG5cdFx0XHRcdHZhciB3ID0gKHdpbmRvdy5pbm5lcldpZHRoLzIpIC0gbW91c2VfZHg7XHJcblx0XHRcdFx0dmFyIGggPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gbW91c2VfZHk7XHJcblxyXG5cdFx0XHRcdFxyXG5cclxuXHRcdFx0XHRsYXllci5tYXAoZnVuY3Rpb24oa2V5LHZhbHVlKXtcclxuXHRcdFx0XHRcdHZhciB3aWR0aFBvc2l0aW9uID0gdyAqICgoa2V5ICsgMSkgIC8gMTAwKSAvMi41O1xyXG5cdFx0XHRcdFx0dmFyIGhlaWdodFBvc2l0aW9uID0gaCAqICgoa2V5ICsgMSkgLyAxMDApIC8yLjU7XHJcblx0XHRcdFx0XHQkKHZhbHVlKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJyA6ICd0cmFuc2xhdGUzZCgnKyB3aWR0aFBvc2l0aW9uICsncHgsICcrIGhlaWdodFBvc2l0aW9uICsncHgsIDBweCknXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRfc2V0VXBMaXN0ZW5lcigpO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pKCk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuXHR2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cdGNvbW1vbk1vZHVsZS5pbml0KCk7XHJcblx0bWVudU1vZHVsZS5pbml0KCk7XHJcblx0cGFyYWxsYXhNb2R1bGUuaW5pdCgpO1xyXG5cclxufSk7Il19

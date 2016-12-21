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
$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PSBCYXNlIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIEJhc2VNb2R1bGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbihlbGVtKXtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZWxlbSlcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uID09IFwibGVmdFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwb3NpdGlvbiA9PSBcInRvcFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbihlbGVtLCBzcGVlZCl7XHJcbiAgICAgICAgcmV0dXJuICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdGhpcy5nZXRQb3NpdGlvbihlbGVtLFwidG9wXCIpfSwgc3BlZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNsb25lSW5zZXJ0ID0gZnVuY3Rpb24ocGFyZW50LGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsb25lKHRydWUpLnByZXBlbmRUbyhwYXJlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFVybCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZXRQYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9cIil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvKFthLXpBLVpdKykvKVswXTtcclxuICAgIH07XHJcbiAgICB0aGlzLnNjcm9sbFBvcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIH07XHJcbiAgICB0aGlzLmRlYmFnV2luZG93ID0gZnVuY3Rpb24odGV4dCxiZ0NvbG9yLHRleHRDb2xvcil7XHJcbiAgICAgIGlmKCFiZ0NvbG9yKXtcclxuICAgICAgICBiZ0NvbG9yID0gXCJyZ2JhKDI1NSwxODAsMjU1LC44KVwiXHJcbiAgICAgIH1cclxuICAgICAgaWYoIXRleHRDb2xvcil7XHJcbiAgICAgICAgdGV4dENvbG9yID0gXCIjMzMzXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYoJChcImRpdlwiKS5pcygkKFwiLmRlYmFnX193aW5kb3dcIikpKXtcclxuICAgICAgICAkKCcuZGViYWdfX3dpbmRvdycpLmh0bWwodGV4dCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoXCI8ZGl2IGNsYXNzPSdkZWJhZ19fd2luZG93Jz48ZGl2PlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpLmNzcyh7XHJcbiAgICAgICAgICBcIndpZHRoXCIgOiBcIjQwdndcIixcclxuICAgICAgICAgIFwibWF4LWhlaWdodFwiIDogXCJhdXRvXCIsXHJcbiAgICAgICAgICBcImJhY2tncm91bmRcIiA6IGJnQ29sb3IsXHJcbiAgICAgICAgICBcImNvbG9yXCIgOiB0ZXh0Q29sb3IsXHJcbiAgICAgICAgICBcImZvbnQtc2l6ZVwiIDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBcInBhZGRpbmdcIiA6IFwiMTB2aCAwXCIsXHJcbiAgICAgICAgICBcInBvc2l0aW9uXCIgOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICBcInotaW5kZXhcIiA6IFwiOTk5OTk5OTlcIixcclxuICAgICAgICAgIFwidGV4dC1hbGlnblwiIDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIFwidG9wXCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJsZWZ0XCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIiA6IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIixcclxuICAgICAgICAgIFwibWFyZ2luXCIgOiBcImF1dG9cIlxyXG4gICAgICAgIH0pLmh0bWwodGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgdGhpcy5nZXRQb3NpdGlvblRvdGFsID0gZnVuY3Rpb24oZWxlbSl7XHJcblxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQoZWxlbSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy5vZmZzZXQoKSk7XHJcbiAgICAgICAgLypyZXR1cm4gdHJ1ZTsqL1xyXG5cclxuICAgICAgICBzd2l0Y2goZWxlbSl7XHJcbiAgICAgICAgICAgY2FzZSBcIndpbmRvd1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwid2luZG93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJCh3aW5kb3cpLmhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlcmxlZnRcIiA6ICQod2luZG93KS53aWR0aCgpIC8gMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJkb2N1bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJChkb2N1bWVudCkud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJChkb2N1bWVudCkuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcInNjcm9sbFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwic2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlckxlZnRcIiA6ICgkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdykud2lkdGgoKSkgLyAyLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gW107XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goJHRoaXMsZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gZWxlbS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHVzaCggXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6ICR0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkdGhpcy5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICR0aGlzLm91dGVyV2lkdGgoKSArICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkdGhpcy5vdXRlckhlaWdodCgpICsgJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogKCR0aGlzLm91dGVySGVpZ2h0KCkgKyAkdGhpcy5vZmZzZXQoKS50b3ApIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJMZWZ0XCIgOiAoJHRoaXMub3V0ZXJXaWR0aCgpICsgJHRoaXMub2Zmc2V0KCkubGVmdCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7ICAgIFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHRoaXMuaW5XaW5kb3cgPSBmdW5jdGlvbihlbGVtLHRvcEVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKCF0b3BFbGVtKXtcclxuICAgICAgICAgICAgdG9wRWxlbSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRFbHMgPSBlbGVtO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGVsLm9mZnNldCgpO1xyXG5cclxuICAgICAgICAgICAgICBzd2l0Y2gocG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRvcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldFRvcCArICQodGhpcykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgKCQodGhpcykuaGVpZ2h0KCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzY3JvbGxUb3ApO1xyXG4gICAgICAgICAgICBpZihzY3JvbGxUb3AgPj0gb2Zmc2V0LnRvcCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0LnRvcCArKHRvcEVsZW0pICsgZWwuaGVpZ2h0KCkpXHJcbiAgICAgICAgICAgICAgICAvL3Njcm9sbFRvcCA+PSBvZmZzZXQgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldCArICQodGhpcykuaGVpZ2h0KClcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gJChyZXN1bHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldEltZ1BhdGggPSBmdW5jdGlvbigpe1xyXG4gICAgXHRyZXR1cm4gXCIuL2Fzc2V0cy9pbWcvXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldFRyYW5zaXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuIiwidmFyIGNvbW1vbk1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgc2Nyb2xsU3BlZWQgPSA3MDA7XHJcblxyXG5cdFx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRcdHZhciBfc2V0VXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHQvLyBzdmcgcG9saWZpbGxcclxuXHRcdFx0c3ZnNGV2ZXJ5Ym9keSh7fSk7XHJcblxyXG5cdFx0XHQvLyBzY3JvbGwgdG8gc2VjdGlvblxyXG5cdFx0XHQkKCcuaGVhZGVyX19idXR0b24taWNvJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0YmFzZS5zY3JvbGxUbygnc2VjdGlvbicsc2Nyb2xsU3BlZWQpO1xyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly9zY3JvbGwgdG8gc3RhcnQgcGFnZVxyXG5cclxuXHRcdFx0JCgnLnNlY3Rpb25fX2J1dHRvbi11cCAuYXJyb3dfX2xpbmsnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRiYXNlLnNjcm9sbFRvKCdib2R5JyxzY3JvbGxTcGVlZCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRfc2V0VXBMaXN0ZW5lcigpO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pKCk7IiwidmFyIG1lbnVNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHRcdHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGU7XHJcblx0XHR2YXIgJGJ1dHRvbiA9ICQoJy5tZW51LWJ1dHRvbicpO1xyXG5cclxuXHRcdHZhciBidXR0b25BbmltYXRpb24gPSBmdW5jdGlvbihlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdtZW51LWJ1dHRvbi0tYWN0aXZlJyk7XHJcblx0XHRcdCQoJy5tZW51LS1wb3B1cCcpLnRvZ2dsZUNsYXNzKCdtZW51LS1wb3B1cC1hY3RpdmUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX3NldFVwTGlzdGVuZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkYnV0dG9uLm9uKCdjbGljaycsYnV0dG9uQW5pbWF0aW9uKVxyXG5cdFx0fVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICBcdGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0X3NldFVwTGlzdGVuZXIoKTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG59KSgpOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRjb21tb25Nb2R1bGUuaW5pdCgpO1xyXG5cdG1lbnVNb2R1bGUuaW5pdCgpO1xyXG5cclxufSk7Il19

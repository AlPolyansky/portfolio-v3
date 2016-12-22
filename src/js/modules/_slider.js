// =========== Slider module ===========

var sliderModule = (function() {

    var base = new BaseModule();

    function slider(elem){
        // Slider

        var $slider = elem;
        var $sliderContent = $slider.find(".slider__content");
        var $sliderDesk = $slider.find(".slider__desk");
        var $deskContent = $sliderDesk.find(".desk__content");



        var $sliderControls = $sliderContent.find(".slider__controll");
        var $sliderButtons = $slider.find(".slider__button");
        var $sliderView = $sliderContent.find(".slider__view");
        var $sliderItems = $sliderView.find(".slider__item");
        var $sliderList = $sliderView.find(".slider__list");
        
        var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd';
        var flag = true;

        // Buttons

        var $buttonUp = $sliderButtons.find(".slider__up").siblings(".slider__ico");
        var $buttonDown = $sliderButtons.find(".slider__down").siblings(".slider__ico");



        // Classes
        var active = "slider__active";
        var down = "slide--down";
        var up = "slide--up";
        var slideShow = "slide--show";





        var cloneSlides = function(container,activeIndex){
            $container = container.siblings(".slider__list-container");
            
            $sliderList.clone().appendTo($container);
            var curentItems = $container.find(".slider__item");
            curentItems.removeClass(active);
            curentItems.eq(activeIndex).addClass(active);
            curentItems.eq(activeIndex).prev().addClass(up);
            curentItems.eq(activeIndex).next().addClass(down);
            if(!curentItems.eq(activeIndex).next().length){
                curentItems.first().addClass(down);
            }
        }

        cloneSlides($buttonUp,-1);
        cloneSlides($buttonDown,1);


        var addClass = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
        }
        var addClassPrev = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
            if(!slide.next().length){
                slide.removeClass(className);
            }      
        }

        var addClassSibling = function(slide,className,direction){
            var slideFirst = slide.parent().find(".slider__item").first().addClass(className);
            var slideLast = slide.parent().find(".slider__item").last().addClass(className);


            if(direction == "next"){
                slide.next().addClass(className).siblings().removeClass(className);
                if(!slide.next().length){
                    slide.removeClass(className);
                    slideFirst.addClass(className);
                }
            }
            else{
                slide.prev().addClass(className).siblings().removeClass(className);
                if(!slide.prev().length){
                    slide.removeClass(className);
                    slide.siblings().removeClass(className);
                    slideLast.addClass(className);
                }
            }
            
        }

        var addContent = function(slide){
            var index = slide.index();
            var className = "active__desk__content";
            $deskContent.eq(index).addClass(className).siblings().removeClass(className);
                
            
        }



        var activeSlideInit = function(elem,reverse){

            var $curentElement = elem;
            var $curentList = $curentElement.find(".slider__list");
            var $curentItems = $curentList.find(".slider__item");
            var $curentActiveItem = $curentItems.filter(".slider__active");


            var $nextSlide = $curentActiveItem.next();
            var $prevSlide = $curentActiveItem.prev();

            var $firstSlide = $curentItems.first();
            var $lastSlide = $curentItems.last();


        if(!$curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){     
                if($nextSlide.length){
                    addClass($nextSlide,active);
                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");

            addContent($newActive);
            
            
                
            
        }

        if($curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){    
                if($nextSlide.length){
                    addClass($nextSlide,active);

                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");
            addClassSibling($newActive,down,"next");
            addClassSibling($newActive,up,"last");      
        }



       
    }

           

       

        $buttonUp.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView,true);
                activeSlideInit($this,true);
                activeSlideInit($buttonDown.siblings(".slider__list-container"),true);
                flag = false;

            }
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
            })

        })


        $buttonDown.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView);
                activeSlideInit($this);
                activeSlideInit($buttonUp.siblings(".slider__list-container"));
                flag = false;

            }
            
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
                
            })
        })
    }






    function sliderInit(){
        if(base.getPage() == "works"){
            slider($("#slider"));
            
        }
    }

    return {
        init: function () {
            sliderInit();
        }
    }
})();
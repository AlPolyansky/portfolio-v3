$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();
	parallaxModule.init();
	preloaderModule.init();
	if(base.getPage() == 'works'){
		blurModule.init();
		sliderModule.init();
	}
});
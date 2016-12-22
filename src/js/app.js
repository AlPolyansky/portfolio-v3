$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();
	parallaxModule.init();
	if(base.getPage() == 'works'){
		blurModule.init();
	}
});
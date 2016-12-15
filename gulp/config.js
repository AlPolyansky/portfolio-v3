$.path.source = {}; 
$.path.build = {};
$.path.files = {}; 
$.options = {
	browserSync: {},
	pug: {},
};

// ============== Общие настроки ==============

	$.options.start 				= 'front';		// Версия gulp (front,server)
	//$.options.cssCompile 		= 'postcss';			// css прероцессор (sass,postcss)
	$.options.htmlCompile 	= 'pug';			// html прероцессор (pug)
	$.options.clearDep   		= true;  			// Очищать не используемые зависимости
	$.options.clearBuiild   = true;  			// Очищать папку с компилированными файлами при запуске gulp
	$.options.minJsLibs			= true;				// Минифицировать Js библиотеки
	$.options.minAppJs			= false;			// Минифицировать Js модули приложения
	$.options.minAppCss			= true;				// Минифицировать css библиотеки
	$.options.babel					= true;				// Использовать Babel
	$.options.sourcemaps		= true;				// Добавлять sourcemap в файлы
	$.options.notify 				= false;  		// Подсказки BrowserSync
	$.options.openTarget 		= false; 			// Открытьвать новую вкладку браузера, при запуске gulp


// ============== Настройки папок ============== 

	// == Исходники ==
	$.path.source.folder = 'src'; 							// Папка c исходниками
	$.path.source.css = 'style';  							// Папка c sass файлами
	$.path.source.templates = 'templates';  		// Папка c файлами шаблонизатора
	$.path.source.views = 'views';  						// Папка c файлами шаблонизатора (для сервера)
	$.path.source.js = 'js';  									// Папка c js модулями
	$.path.source.svgSprite = 'sprite';					// Папка c svg файлами для спрайта
	$.path.source.fonts = 'fonts';							// Папка cо шрифтами
	$.path.source.img = 'images';								// Папка c изображениями


	// == Готовые файлы ==
	$.path.build.folder = 'assets'; 						// Папка c готовыми файлами
	$.path.build.css = 'css'; 									// Папка c готовым css
	$.path.build.pug = '';											// Папка с готовыми pug файлами (html), если пусто, то файлы будут находиться в корне папки с готовыми файлами
	$.path.build.js = 'js';											// Папка с готовыми js файлами
	$.path.build.svgSprite = 'img'							// Папка с готовым svg спрайтам
	$.path.build.fonts = 'fonts';								// Папка c готовыми шрифтами
	$.path.build.img = 'img';										// Папка c готовыми изображениями
	$.path.build.jsLibsFile = 'foundation.js';	// Файл с js библиотеками
	$.path.build.jsAppFile = 'app.js';					// Файл с js модулями проекта
	$.path.build.cssLibsFile = 'foundation.css';// Файл с сss библиотеками





// ==== Массивы файлов для порядковой компиляции ====

	// файлы scss или sass (точка входа sass файлов, где собраны все imports);
	// Используется, только если выбран sass, как прероцессор
	$.path.files.sass = [
		'app.scss',
	];

	// файлы css
	// Используется, только если выбран postcss, как прероцессор
	$.path.files.postcss = [
		'main.css',
	];


	// файлы js библиотек
	// Эти файлы склеиваются в файл указанный в настройка и минифицируются. Тут находятся все js(jquery) библиотеки
	$.path.files.jsLibs = [
		'./node_modules/jquery/dist/jquery.js'
	]

	// модули js разрабатываемого приложения
	// Эти файлы склеиваются в файл указанный в настройка. Тут находятся все модули ваших js скриптов, порядок файлов важен
	$.path.files.jsAppFiles = [
		/*`./${$.path.source.folder}/${$.path.build.js}/modules/_base.js`,
		`./${$.path.source.folder}/${$.path.build.js}/app.js`*/
		`${$.path.source.folder}/${$.path.build.js}/app.js`
	]

	// css библиотеки
	// Эти файлы склеиваются в файл указанный в настройка и минифицируются.
	$.path.files.cssLibs = [
		'./node_modules/normalize.css/normalize.css'
	]






// ============== Детальные Настройки тасков ==============

// autoprefixer

	$.options.autoprefixer = ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']; // Автопрефиксер

// Pug
	$.options.pug.source = 'pages/';  // Папка из которой pug будет компилировать файлы, если пустая строка, файлы будут браться из корня.
	$.options.pug.build = $.path.build.pug;	// Папка для скомпилированных файлов
	$.options.pug.pretty = true; // Если true, файлы html не будут минифицироваться

// Browser sync

	$.options.browserSync.openTarget = $.options.openTarget; 	// Открытьвать новую вкладку браузера, при запуске gulp
	$.options.browserSync.port = 3000;  // Локальный порт
	$.options.browserSync.proxy = '127.0.0.1:4000';  // Прокси, к которому будет подключаться(только для server)
	$.options.browserSync.notify = $.options.notify;  // Уведомления
	$.options.browserSync.folder = $.path.build.folder + $.options.pug.build; // Папка с которой будет запускаться сервер
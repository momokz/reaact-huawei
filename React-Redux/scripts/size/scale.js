const calcScale = () => {
	const win = $(window);
	const resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
	const resizeFun = () => {
		const winWidth = win.width();
		if (!winWidth) return;
		if (winWidth > 640) {
			$('html').css('fontSize', '100px');
		} else {
			$('html').css('fontSize', (100 * (winWidth / 640)).toFixed(2) + 'px');
		}
		$('body').show();
	};
	resizeFun();
	window.addEventListener('load', resizeFun, false);
	window.addEventListener(resizeEvt, resizeFun, false);
};
export default calcScale;
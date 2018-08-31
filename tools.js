//返回当前滚动条滚动的距离
function getScrollOffset() {
	if(window.pageXOffset) {
		return {
			x : window.pageXOffset,
			y : window.pageYOffset
		}
	}else {
		return {
			x : document.body.scrollLeft + document.documentElement.scrollLeft,
			y : document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}
//返回浏览器可视区尺寸
function getViewportOffset() {
	if(window.innerHeight) {
		return {
			w : window.innerWidth,
			h : window.innerHeight
		}
	}else if(document.compatMode === 'BackCompat') {
		return {
			w : document.body.clienWidth,
			h : document.body.clientHeight
		}
	}else {
		return {
			w : document.documentElement.clienWidth,
			h : document.documentElement.clientHeight
		}
	}
}
//获取元素样式
function getStyle (elem, prop) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}
//针对不同浏览器，绑定事件函数
function addEvent (elem, type, handle) {
	if(elem.addEventListener) {
		elem.addEventListener(type, handle, false);
	}else if(elem.attachEvent){
		elem.attachEvent('on' + type, function () {
			handle.call(elem);
		})
	}else{
		elem['on' + type] = handle;
	}
}
//针对不同浏览器，解除绑定事件函数
function removeEvent (elem, type, handle) {
	if(elem.removeEventListener) {
		elem.removeEventListener(type, handle, false);
	}else if(elem.detachEvent) {
		elem.detachEvent('on' + type, function () { handle.call(elem); });
	}else{
		elem['on' + type] = null;
	}
}
//取消冒泡事件
function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}
//取消默认事件
function cancelHandler(event) {
	if(event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}
//元素拖动实现（需要绑定事件函数和解除绑定事件函数）
function elemDrag(elem) {
	addEvent(elem, 'mousedown', mousedown);
	function mousedown(event) {
		var e = event || window.event;
		disX = e.pageX - parseInt(elem.style.left);
		disY = e.pageY - parseInt(elem.style.top);
		addEvent(document, 'mousemove', mousemove);
		addEvent(document, 'mouseup', mouseup);
	}
	function mousemove(event) {
		var e = event || window.event;
		elem.style.left = e.pageX - disX + 'px';
		elem.style.top = e.pageY - disY + 'px';
	}
	function mouseup() {
		removeEvent(document, 'mousemove', mousemove);
	}
}
//按需导入js
function loadNeedScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if(script.readyState) { //IE
		script.onreadystatechange = function () {
			if(script.readyState == 'complete' || script.readyState == 'loaded') {
				callback();
			}
		}
	}else{ // Safari chrome firefox opera
		script.onload = function () {
		callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}
//深度克隆
function deepclone(origin, target) {
	target = target || {};
	var prop;
	for(prop in origin){
		if(origin.hasOwnProperty(prop))
		{
			var str = Object.prototype.toString.call(origin[prop]);
			if(str != '[object Array]' && str != '[object Object]' && str != null)
			{
				target[prop] = origin[prop];
			}
			else if(str == '[object Array]')
			{
				target[prop] = [];
				deepclone(origin[prop],target[prop]);
			}
			else if(str == '[object Object]')
			{
				target[prop] = {};
				deepclone(origin[prop],target[prop]);
			}
		}
	}
}
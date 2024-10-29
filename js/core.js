function AutoResponse(width = 750) {
	const target = document.documentElement;
	if (target.clientWidth >= 600) {
		target.style.fontSize = "80px";
	} else {
		target.style.fontSize = target.clientWidth / width * 100 + "px";
	}
	$(".container").css({
		width: target.clientWidth + "px"
	})
}
AutoResponse();
window.addEventListener("resize", () => AutoResponse());



/**
 * @description 自定义 layer 弹出层
 * @param {Object} msg	显示消息
 * @param {Object} i	显示图标
 * @param {Object} time	显示时间
 * 
 * layer-black-text 自定义样式 class
 */
function tips(msg, i, time, ft) {
	layer.msg(msg, {
		icon: i,
		time: time,
		skin: 'layer-black-text'
	}, function() {
		if (typeof ft == "function") {
			ft();
		}
	});
}

/**
 * @description 网页平滑滚动到顶部
 */
function pagescrollTop() {
	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

function pagescrollButtom() {
	window.scroll({
		top: document.documentElement.scrollHeight - window.innerHeight,
		right: 0,
		behavior: 'smooth'
	});
}

/**
 * @description		获取浏览器地址拦中的某个参数值
 * @param	paras 	参数KEY
 * 
 */
function request(paras) {
	let url = location.href;
	let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	let paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	let returnValue = paraObj[paras.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return null;
	} else {
		return returnValue;
	}
}



/**
 * @deprecated 	写入数据本地 sessionData 页面关闭后立即失效
 * @param key	KEY
 * @param value	写入数据
 */
function setData(key, value) {
	layui.sessionData('LocalData', {
		key: key,
		value: value
	});
}

/**
 * @description		获取本地 sessionData 值
 * @param key		获取 cookie 的 KEY
 */
function getData(key) {
	var localData = layui.sessionData('LocalData');
	return localData[key];
}

/**
 * @description 时间戳 转  时间
 * @param {Object} timestamp	13位时间戳
 */
function timestampToDate(timestamp) {
	//let date = new Date(timestamp);
	//return date.toLocaleString();
	return layui.util.toDateString(timestamp, 'yyyy-MM-dd')
}

/**
 * @description 时间戳 转  时间
 * @param {Object} timestamp	13位时间戳
 */
function timestampToDateTime(timestamp) {
	//let date = new Date(timestamp);
	//return date.toLocaleString();
	return layui.util.toDateString(timestamp, 'yyyy-MM-dd HH:mm')
}

/** 
 * @description 将内容添加到剪切板 --- 点击复制按钮
 * 
 * @param 	value ---> 复制内容
 * @param 	cb ---> 回调函数
 * 
 */
function copy(value, cb) {

	// 动态创建 textarea 标签
	const textarea = document.createElement('textarea')

	// 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
	textarea.readOnly = 'readonly'
	textarea.style.position = 'absolute'
	textarea.style.left = '-9999px'

	// 将要 copy 的值赋给 textarea 标签的 value 属性  
	// 网上有些例子是赋值给innerText,这样也会赋值成功，但是识别不了\r\n的换行符，赋值给value属性就可以
	textarea.value = value

	// 将 textarea 插入到 body 中
	document.body.appendChild(textarea)

	// 选中值并复制
	textarea.select()
	textarea.setSelectionRange(0, textarea.value.length)
	document.execCommand('Copy')
	document.body.removeChild(textarea)

	if (cb && Object.prototype.toString.call(cb) === '[object Function]') {
		cb();
	}
}
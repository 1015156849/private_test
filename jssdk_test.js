let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
let x_PI = 3.14159265358979324 * 3000.0 / 180.0;

function _custome_launchNav(params) {
    console.log(params);
    try {
        let bdfromLatlng = gcj02tobd09(params.fromLat, params.fromLng);
        let bdtoLatlng = gcj02tobd09(params.toLat, params.toLng);
        let newParams = {
            // 说明 该坐标为 GCJ02 坐标系，请封装时自行转换
            // 关于导航起点的传入为根据 getLocation 方法获取的结果，第三方APP可选择是否使用，如不使用，应重新获取用户位置信息
            fromLng: bdfromLatlng[1],	// 导航起始点经度
            fromLat: bdfromLatlng[0],		// 导航起始点纬度
            toLng: bdtoLatlng[1],			// 导航终点经度
            toLat: bdtoLatlng[0],			// 导航终点纬度
            toName: params.toName
        };

        let requestParams = {action: 'requestThirdNav', params: JSON.stringify(newParams), requestCode: '10000'};

        if (isiOS) {
            window.webkit.messageHandlers.requestAppAction.postMessage(requestParams);
        } else {
            window.JsObject.requestAppAction(JSON.stringify(requestParams));
        }
    } catch (err) {
        console.log(err);
    }
    // callDSBridge(getMethodNamePath('requestAppAction'), requestParams);
}

/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/

function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}
var module = {
    urls: {
        root: 'https://play9.pcauto.com.cn/auto200106/action/',
        login: 'https://pangku.com/alilogin?atid=1232&callback=',
        
        //非活动或则获取不到定位跳转此链接
		otherUrl:'alipays://platformapi/startapp?appId=2017101709350139&page=pages/ar_list/ar_list&query=brandid%3d2%26isar%3d1%26originType%3dar_paiChe%26toArList%3d1'
    },
    activeArea:["云南省","贵州省","广西"],  //

    tips:function(str,ico,fn,t){
        if(!t){
            t = 1500;
        }
        new hdpop({
            alert : str,
            alert_time : t,
            dw : 'px',
            closeBack : function(){
                fn&&fn();
            }
        })
    },

    getSearchData:function(){
        var search = decodeURIComponent(location.search);
        var itemArr = search.slice(1).split("&");
        var obj = {}
        itemArr.forEach(function(item) {
            var arr = item.split("=");

            obj[arr[0]] = arr[1];
        });
        return obj;
    }
}
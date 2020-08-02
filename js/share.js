window.onload=function  () {
    var comm={
        data:null,
        shareId:module.getSearchData().shareId||'',

        //生成二维码
        qrcode: function (fn) {
            var width = $('#qrcode').width(),
                height = $('#qrcode').height();

            var url='https://www1.pcauto.com.cn/zt/gz20200210/daz/index.html?shareId='+comm.shareId;

            $('#qrcode').html('');
            new QRCode('qrcode', {
                text: url,
                width: width,
                height: height,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.L
            });
            fn && fn();
        },
        //生成截图
        picSave: function () {
            var width=$('.pics').width()-1,
                height=$('.pics').height();

            html2canvas(document.querySelector(".share .pics"), {
                scale: 2,
                useCORS: true,
                width: width,
                height: height
            }).then(canvas => {
                var img1 = comm.convertCanvasToImage(canvas);
                $('.mkpic').show();
                comm.getpic($(img1).attr('src'));
            });
        },
        
        getpic: function (img) {
            var t = this;            
            var url = '//upc.pcauto.com.cn/upload_quick_base64.jsp?referer=http://play10.pcauto.com.cn/';
            $.post(url, {
                application: 'play',
                readExif: 'yes',
                keepSrc: 'yes',
                data: img
            }, function (data) {
                if (data.retCode < 1) {
                    var fnum = data.files.length;
                    if (fnum > 0) {
                        for (var i = 0; i < fnum; i++) {
                            if (data.files[i].isorg == 1) {
                                var turl = data.files[i].url;
                                $('.mkpic').attr('src', turl);
                            }
                        }
                    }
                    ap.hideLoading()
                } else {
                    ap.hideLoading()
                    module.tips("生成图片失败");
                }
            }, "json");
        },
        convertCanvasToImage: function (canvas) {
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = canvas.toDataURL("image/jpeg");
            //生成截图
            return image;
        },
        ready(callback) {
            // 如果jsbridge已经注入则直接调用
            if (window.AlipayJSBridge) {
                callback && callback();
            } else {
                // 如果没有注入则监听注入的事件
                document.addEventListener('AlipayJSBridgeReady', callback, false);
            }
        },
        share:function(){
            console.log(11)
			var url='https://www1.pcauto.com.cn/zt/gz20200210/daz/index.html?shareId='+comm.shareId;
			$('head').append('<meta name="Alipay:link" content='+url+' />')
		},

        init:function(){
            comm.share();
            window.setTimeout(function(){
                ap.showLoading({
                    content: '图片生成中'
                });
                window.scrollTo(0,0);
                comm.qrcode(comm.picSave)
            },100)

            var box = document.getElementById('box');
            box.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });

            this.ready(function(){
                $('.share .close').on('click',function(){
                    AlipayJSBridge.call('popWindow');
                });
            });
        }
    }
    comm.init();
}




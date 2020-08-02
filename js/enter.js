$(function(){
    var comm={
		shareId:"",
    	uid:"",
		action:module.urls.root,
		sum:0,
		province:'',
		city:'',
		state:false,
		list:'',

		getUserInfo:function(){
			var _this=this;
			$.ajax({
				url: comm.action+"getUserInfo.jsp",
				type: "GET",
				xhrFields: {withCredentials: true},
				data: {},
				success:function(data){
					console.log(data)

					if(data.code==1){
						_this.shareId=data.id;
						_this.uid=data.uid;
						console.log('score10:'+data.score)

						
						if(data.ticketIds.length>0){
							$('.enter-2').removeClass('success')
							$('.btn_check').hide();
							$('.repeat').show().siblings('.result').hide();
						}else{

							if(data.isPlay==0){
								comm.loadItems();
								$('.que').show().siblings('.result').hide();
								$('.g-doc').addClass('spc')
							}else{
								//没领券但是上次答题成功
								if(data.score>60){
									$('.succ').show().siblings('.result').hide();
									$('.btn_check').hide();
									$('.succ .sum span').text(data.score);
									$('.g-doc').removeClass('spc')
								}else{
									$('.enter-2').removeClass('success')
									$('.btn_check').hide();
									
									if(data.num==0){
										$('.fixed').show();
										$('.tips').show();
										$('.g-doc').removeClass('spc')
									}else{
										comm.loadItems();
										$('.que').show().siblings('.result').hide()
										$('.g-doc').addClass('spc')
									}
								}
							}
							
						}
					}
					else if(data.code===-1){
						window.location.href="index.html";
					}else{
						module.tips(data.msg)
					}
					console.log('comm.shareId3:'+comm.shareId);
						comm.changeShare(comm.shareId);
                },
                error:function(err){
                    module.tips('网络错误，请稍后再试')
				}
			})
		},
		location2: function () {
			Locate.init({
				bDisableIp: true,
				// bDebugShow: true,
				bDebug: true,
				sDebugType: 'alert',
				sCookieName: 'wap190499',
				bCookie: true,
				nH5Timeout:60000,
				nCookieTime: 864 * 1e5
			}, function (data) {
				if (data.dataType === 'default') {
					comm.getUserInfo();
					// alert("获取不到定位，请打开定位后刷新页面");
					// if (window.history.length > 1) {
					// 	window.history.go(-1)
					// }else{
					// 	window.location.href="index.html";
					// }
				} else {
					if (module.activeArea.indexOf(data.data.pro) === -1) {
						comm.getUserInfo();
						comm.province=data.data.pro||'';
						comm.city=data.data.city||'';
						// alert("抱歉，您不在活动地区");
						// if (window.history.length > 1) {
						// 	window.history.go(-1)
						// }else{
						// 	window.location.href="index.html";
						// }

					} else {
						comm.province=data.data.pro||'';
						comm.city=data.data.city||'';
						comm.getUserInfo();
					}
					
				}
			});
		},

		location: function () {
			Locate.init({
				bDisableIp: true,
				// bDebugShow: true,
				bDebug: true,
				sDebugType: 'alert',
				sCookieName: 'wap190499',
				bCookie: true,
				nH5Timeout:60000,
				nCookieTime: 864 * 1e5
			}, function (data) {
				if (data.dataType === 'default') {
					comm.getUserInfo();
						// alert("获取不到定位，请打开定位后刷新页面");
						// console.log('comm.shareId1:'+comm.shareId);
						// comm.changeShare(comm.shareId);
						// AlipayJSBridge.call('pushWindow', {
						// 	url: module.urls.otherUrl
						// });
				} else {
					if (module.activeArea.indexOf(data.data.pro) === -1) {
						comm.province=data.data.pro||'';
						comm.city=data.data.city||'';
						comm.getUserInfo();
						// console.log('comm.shareId2:'+comm.shareId);
						// comm.changeShare(comm.shareId);
						// alert("抱歉，您不在活动地区");
						// AlipayJSBridge.call('pushWindow', {
						// 	url: module.urls.otherUrlS
						// });
					} else {
						comm.province=data.data.pro||'';
						comm.city=data.data.city||'';
						comm.getUserInfo();
					}
					
				}
			});
		},
		
		//生成随机元素方法
		randomSort:function(arr){
			arr.sort(function(a,b){
				return Math.random() - 0.5;
			});
			return arr;
		},
		//随机排列各个数组元素,获取前5个元素
		getNewArr1:function(arr){
			var oldData=arr,newData=[],oldArr=[0,1,2,3,4,5,6,7,8,9],newArr=[];
			newArr=comm.randomSort(oldArr)//新随机排序数组
			
			for(var i=0;i<5;i++){
				newData.push(oldData[newArr[i]])
			}
			return newData;
		},
		getNewArr2:function(arr){
			var oldData=arr,newData=[],oldArr=[0,1,2,3,4,5,6,7,8,9,10,11],newArr=[];
			newArr=comm.randomSort(oldArr)//新随机排序数组
			
			for(var i=0;i<5;i++){
				newData.push(oldData[newArr[i]])
			}
			return newData;
		},
		//随机排列结合的数组元素,获取前10个元素
		getItems:function(){
			var arr1=comm.getNewArr1(data1);
			var arr2=comm.getNewArr2(data2);

			var items=arr1.concat(arr2);

			var finalItems=[],oldArr=[0,1,2,3,4,5,6,7,8,9],newArr=[];
			newArr=comm.randomSort(oldArr)//新随机排序数组
			
			for(var i=0;i<10;i++){
				finalItems.push(items[newArr[i]])
			}
			return finalItems;
		},
		//加载题目
		loadItems:function(){
			var items=comm.getItems(), vhtml='';
			// for(var j=1;j<11;j++){
			// 		vhtml+='<div class="box" id="'+j+
			// 		'"><span class="num1">'+j+
			// 		'/10</span><div class="num2">0'+j+
			// 		'</div><div class="item"><p>'+items[j-1].que+
			// 		'</p></div><div class="ans"><div class="ansA" data-score="'+items[j-1].s0+
			// 		'"><span>A</span>'+items[j-1].ans0+
			// 		'</div><div class="ansB" data-score="'+items[j-1].s1+
			// 		'"><span>B</span>'+items[j-1].ans1+
			// 		'</div></div><div class="next"></div><div class="sub"></div></div>'
			// }

			for(var j=1;j<11;j++){
				vhtml+='<div class="box" id="'+j+
				'"><span class="num1">'+j+
				'/10</span><div class="num2">0'+j+
				'</div><div class="item"><p>'+items[j-1].que+
				'</p></div><div class="ans"><div class="ansA" data-score="'+items[j-1].s0+
				'"><span>A</span>'+items[j-1].ans0+
				'</div><div class="ansB" data-score="'+items[j-1].s1+
				'"><span>B</span>'+items[j-1].ans1+
				'</div></div><div class="next"></div><div class="sub"></div></div>'

				comm.list+='<li><p class="tit">'+j+'. '+items[j-1].que+
				'</p><div class="des"><div class="sp" data-score="'+items[j-1].s0+
				'">A. '+items[j-1].ans0+                   
				'</div><div class="sp" data-score="'+items[j-1].s1+
				'">B. '+items[j-1].ans1+
				'</div></div></li>'

			}
			$('.wrap .con').html(vhtml)
			


			$('.con .box').eq(0).show().siblings('.box').hide();
			
			$('.box').eq(9).find('.sub').show()
			$('.box').eq(9).find('.next').hide()
			$('.box').eq(9).find('.num2').text('10')
			comm.play();
			comm.state=true;
			comm.loadList();
			
		},
		//渲染答案列表
		loadList:function(){

			// $('.scroll ul').html('');
			$('.scroll ul').html(comm.list)
			$(".sp[data-score='10']").addClass('tClass');
			$(".scroll").mCustomScrollbar({
                scrollInertia: 600,
                //滚动的惯性值
                autoDraggerLength: false,
                //根据内容区域，自动调整滚动条拖块的长度，值true，false
                advanced: {
                  updateOnContentResize: true
                }
            })
		},
		
		answer:function(sum){
			$.ajax({
				url: comm.action+"answer.jsp",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {
					score:sum
				},
				success:function(data){
					console.log(data)
					if(data.code==1){
						console.log('提交成功')
					}else{
						module.tips(data.msg)
					}
                },
                error:function(err){
                    module.tips('网络错误，请稍后再试')
                }
			})
		},

		play:function(){
			comm.sum=0;
			//答题部分
			$('.ans div').click(function(){
				$(this).addClass('sel').siblings('.ans div').removeClass('sel')
			})
			//下一题按钮除了切换外，还有记录分数
			$('.next').unbind().click(function(){
				var idx=$(this).parent().attr('id');
				if($(this).parent().find('.ans div').hasClass('sel')){	
					var score=+$(this).parent().find('.sel').attr('data-score')
					comm.sum+=score;
					console.log(comm.sum)
					$('.con .box').eq(idx).show().siblings('.box').hide();
				}else{
					module.tips('请选择答案');
				}
			})
			//分数提交
			$('.sub').unbind().click(function(){
				var idx=$(this).parent().attr('id');
				if($(this).parent().find('.ans div').hasClass('sel')){

					var score=+$(this).parent().find('.sel').attr('data-score')
					comm.sum+=score;
					console.log(comm.sum)
					
					if(comm.sum>60){
						$('.succ').show().siblings('.result').hide()
						$('.enter-2').addClass('success')
						$('.succ .sum span').text(comm.sum)
						$('.g-doc').removeClass('spc')
					}else{
						$('.sorry').show().siblings('.result').hide()
						$('.sorry .sum span').text(comm.sum)
						$('.g-doc').addClass('spc')
					}
					comm.answer(comm.sum);
				}else{
					module.tips('请选择答案');
				}
				$('.btn_check').show();
				$('.btn_check').click(function(){
					// module.tips('请查看答案')
					$('.pop_res').show()
					$('.fixed').fadeIn()
				})
			})
			
		},
		showSelect:function(id){
			$('.pop_select').show();
			$('.fixed').fadeIn();

			//选择车型
			$('.btn_get').unbind().click(function(){
				var model = $(".model").val();
				if(!model){
					alert('请选择车型')
					return;
				}else{
					comm.haveCoupon(id,model);
				}
			})

		},
		
		clickEvent:function(){

			
			$('.declare').on('click',function(){
                AlipayJSBridge.call('pushWindow', {
                    url: 'https://cat.pangku.com/static/agreement/index.html'
                });
            })

			$('.quan').on('click',function(){
				var isAllow = $('#J-declare').get(0).checked
				if(!isAllow){
					module.tips('请勾选“我已阅读并同意隐私政策”');
					return;
				}
				var id=$(this).attr('data-id');
				comm.showSelect(id);
			})

			//需要分享弹窗tips
			$('.tips .btn_share').on('click',function(){
				AlipayJSBridge.call('pushWindow', {
					url: 'https://www1.pcauto.com.cn/zt/gz20200210/daz/share.html?shareId='+comm.shareId
				});
			})
			//答题失败分享sorry
			$('.sorry .btn_share').on('click',function(){
				console.log(comm.shareId)
				AlipayJSBridge.call('pushWindow', {
					url: 'https://www1.pcauto.com.cn/zt/gz20200210/daz/share.html?shareId='+comm.shareId
				});
			})
			//已领券的分享
			$('.repeat .btn_share').on('click',function(){
				AlipayJSBridge.call('pushWindow', {
					url: 'https://www1.pcauto.com.cn/zt/gz20200210/daz/share.html'
				});
			})
			$('.tips .close').click(function(){
				if (window.history.length > 1) {
					window.history.go(-1)
				}else{
					window.location.href="index.html";
				}
			})

			$('.pop_select .close').click(function(){
				$('.pop_select').hide()
				$('.fixed').fadeOut()
			})
			$('.pop_res .close').click(function(){
				$('.pop_res').hide()
				$('.fixed').fadeOut()
			})

			
		},

		haveCoupon: function(id,model){
			var _this=this;
			var u = navigator.userAgent;
			var uid=_this.uid;
			var url=encodeURIComponent(comm.action+'haveCoupon.jsp?model='+model+'&province='+comm.province+'&city='+comm.city);
			url='https://merchant.pangku.com/client/getcoupon?coupon_id='+id+'&uid='+uid+'&callback='+url;

			if(u.indexOf('iPhone') > -1){
				AlipayJSBridge.call('pushWindow', {
					url: url,
					param: {
						readTitle: true,
						showOptionMenu: false
					},
				});
			}else{
				location.href=url;
			}

			$('.fixed').fadeOut();
			$('.pop_select').hide();
		},

		ready:function(callback){
			if (window.AlipayJSBridge) {
				callback && callback();
			} else {
				// 如果没有注入则监听注入的事件
				document.addEventListener('AlipayJSBridgeReady', callback, false);
			}
		},
		delCookie: function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=comm.getCookie(name);
			if(cval!=null){
				document.cookie = name + "="+ escape (cval) + ";expires=" + exp.toGMTString()+";path=/; domain=pcauto.com.cn";
			}
		},
		getCookie: function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return arr[2];
			}else{
				return null;
			}
		},
		showError:function(data,id){
            if(!data) return false;
            // module.tips(data)
			var tar=$('.quan[data-id="'+id+'"]');
			$('.enter-2').removeClass('success')
			$('.btn_check').hide();
            if(data=='您已领取该优惠券，不能再领取了哦'){
				tar.unbind('click');
				$('.repeat').show().siblings('.result').hide()
				$('.g-doc').removeClass('spc')
            }else if(data=='领取成功'){
				tar.unbind('click');
				$('.repeat').show().siblings('.result').hide()
				$('.g-doc').removeClass('spc')
            }else{

			}
            comm.delCookie('pcautoAlipay');
        },
		changeShare:function(shareId){
			var _shareId=shareId||'';
			// alert('fun'+comm. _shareId)
			var url='https://www1.pcauto.com.cn/zt/gz20200210/daz/index.html?shareId='+_shareId;
			$('head').append('<meta name="Alipay:link" content='+url+' />')
		},
		

    	init:function(){
			// module.tips('66');
			this.loadItems();
			// this.location();
      		this.clickEvent();
      		this.ready(function(){ //手机领券回退按钮 页面刷新处理
				document.addEventListener('resume', function(event) {
					comm.state==false?comm.location2():'';
					var pcautoAlipay=(comm.getCookie('pcautoAlipay'));
					if (!pcautoAlipay) return false;
					pcautoAlipay= JSON.parse(pcautoAlipay);
					comm.showError(decodeURI(pcautoAlipay.error_msg),decodeURI(pcautoAlipay.coupid))
				});
			});

		}

	}
  comm.init();
})
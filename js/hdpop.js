;(function(){function hdpop(option){this.config={obj:[],fixed:true,follow:false,followDelay:300,followTime:800,close:true,tips:'提示信息',tips_center:false,tips_show:true,ico:'',ico_text:'',text:'',dz_html:'',width:500,height:220,iframe:'',exter_id:'',exter_reset:true,alert:'',alert_time:1000,toast:false,toast_time:1000,toast_text:'',toast_ico:'',toast_img:'',toast_reset:{},zIndex:999,zIndex_reset:true,bgColor:'',bgClose:false,bgOpacity:0.7,openDelay:0,closeDelay:0,openClass:'',closeClass:'',hasBg:true,animate_time:0,popObg:[],openBack:function(){},closeBack:function(){}};this.pop_extend(this.config,option);this.pop_init()}hdpop.zIndex=999;hdpop.prototype={pop_extend:function(obj1,obj2){for(var attr in obj2){if(obj2.hasOwnProperty(attr)){obj1[attr]=obj2[attr]}}},pop_class:[],pop_timer:null,pop_set_index:function(){var t=this;var c=t.config;var i=0;if(!c.zIndex_reset){return}if(c.popObg){for(i in c.popObg){if(c.popObg.hasOwnProperty(i)){if(i>1){return}c.popObg[i].css({'z-index':hdpop.zIndex});hdpop.zIndex++}}}},pop_class_remove:function(obj){var t=this;if(t.pop_class.length>0){for(var i in t.pop_class){if(obj){obj.removeClass(t.pop_class[i])}else{t.config.popObg[1].removeClass(t.pop_class[i])}}}},pop_open_class:function(obj){var t=this;if(t.config.openClass){obj.addClass('animated');obj.addClass(t.config.openClass);t.pop_class.push('animated');t.pop_class.push(t.config.openClass)}},pop_close_class:function(obj){var t=this;if(t.config.closeClass){obj.addClass('animated');obj.addClass(t.config.closeClass);t.pop_class.push('animated');t.pop_class.push(t.config.closeClass)}},pop_close_time:null,pop_close:function(){var t=this;var c=t.config;if(c.closeDelay>0){clearTimeout(t.pop_close_time);t.pop_close_time=setTimeout(function(){c.popObg[1].fadeOut(c.animate_time);if(c.hasBg){c.popObg[0].fadeOut(c.animate_time)}},c.closeDelay)}else{c.popObg[1].fadeOut(c.animate_time);if(c.hasBg){c.popObg[0].fadeOut(c.animate_time)}}t.pop_class_remove();t.pop_close_class(c.popObg[1]);c.closeBack(c.obj)},open:function(){this.show()},close:function(){var t=this;if(t.config.alert){t.pop_alert_close()}else if(t.config.toast){t.pop_toast_close()}else{t.pop_close()}},pop_open_time:null,pop_open:function(){var t=this;var c=t.config;t.pop_set_index();if(c.hasBg){c.popObg[0].show()}if(c.openDelay>0){clearTimeout(t.pop_open_time);t.pop_open_time=setTimeout(function(){c.popObg[1].fadeIn(c.animate_time);t.pop_bind()},c.openDelay)}else{c.popObg[1].fadeIn(c.animate_time);t.pop_bind()}t.pop_class_remove();t.pop_open_class(c.popObg[1]);c.openBack(c.obj)},hide:function(){this.close()},show:function(){var t=this;if(t.config.alert){t.pop_alert()}else if(t.config.toast){t.pop_toast()}else{t.pop_open()}},pop_follow:function(vy,vh){var t=this;var c=t.config;var ysh=vy;var timer=null;$(window).bind('scroll',function(){if(!c.follow){return}clearTimeout(timer);timer=setTimeout(function(){ysh=$(window).scrollTop();c.popObg[1].stop();c.popObg[1].animate({'top':parseInt(ysh+vh,10)},c.followTime)},c.followDelay)})},pop_bind:function(){var t=this;var c=t.config;$('.hdpop-close',c.popObg[1]).unbind();$('.hdpop-close',c.popObg[1]).bind('click',function(){t.pop_close()});if(c.close){$('#hdpop-close',c.popObg[1]).show()}else{$('#hdpop-close',c.popObg[1]).hide()}if(c.popObg[1]&&(!c.exter_id||(c.exter_id&&c.exter_reset))){if(c.fixed===false){c.popObg[1].css('position','absolute');var stoph=$(window).scrollTop();if(c.popObg[1].height()<$(window).height()){var viewHeigh=($(window).height()-c.popObg[1].height())/2;stoph=parseInt($(window).scrollTop()+viewHeigh,10);if(c.follow){if(!c.popObg[1].attr('hasBind')){c.popObg[1].attr('hasBind','yes');t.pop_follow(stoph,viewHeigh)}}}c.popObg[1].css({'top':stoph,'margin-top':0})}else{if(c.popObg[1].height()>$(window).height()){c.popObg[1].css('position','absolute');c.popObg[1].css({'top':$(window).scrollTop(),'margin-top':0})}else{c.popObg[1].css('position','fixed');c.popObg[1].css({'top':'50%','margin-top':-(c.popObg[1].height()/2)+'px'})}}}if(c.popObg[0]&&c.hasBg===true){if(c.bgClose===true){c.popObg[0].bind('click',function(){t.pop_close()})}else{c.popObg[0].unbind()}if(c.bgColor){c.popObg[0].css('background-color',c.bgColor)}else{c.popObg[0].css('background-color','#000')}c.popObg[0].css('opacity',c.bgOpacity)}},pop_set:function(){var t=this;var c=t.config;c.popObg[1].css({'width':c.width,'height':c.height,'marginLeft':-c.width/2,'marginTop':-c.height/2});c.popObg[2].css({'width':c.width,'height':c.height})},pop_create:function(){var t=this;var str='';var str_tips='';var str_body='';var thh=54;var c=t.config;str_tips+='<div class="hdpop-hd">';if(c.tips_center){str_tips+='<cite class="center">'}else{str_tips+='<cite>'}str_tips+=c.tips+'</cite></div>';if(!c.tips_show){str_tips='';thh=0}if(c.dz_html){str_body+=c.dz_html}else{if(c.ico){c.ico=c.ico.replace('warn','warm');if(c.text){str_body+='<div class="hdpop-ico">';str_body+='   <p><i><em class="'+c.ico+'"></em>'+c.ico_text+'</i></p>';str_body+='</div>'}else{str_body+='<div class="hdpop-ico">';str_body+='   <i><em class="'+c.ico+'"></em>'+c.ico_text+'</i>';str_body+='</div>'}}if(c.text){if(c.ico){str_body+='<div class="hdpop-text"><span>'+c.text+'</span></div>'}else{str_body+='<div class="hdpop-text"><p><span>'+c.text+'</span></p></div>'}}}if(c.iframe){str_body+='<iframe src="'+c.iframe+'" frameborder="0" width="100%" ';str_body+='height="'+(c.height-thh)+'"></iframe>'}str=str_tips+str_body;c.popObg[2].html(str);t.pop_open()},pop_alert_close:function(){var t=this;var c=t.config;var antime=c.animate_time||500;var altg=c.popObg[0];clearTimeout(t.pop_timer);t.pop_class_remove(altg);t.pop_close_class(altg);altg.fadeOut(antime+c.closeDelay,function(){altg.attr('data-tips','');c.closeBack(c.obj)})},pop_alert:function(){var t=this;var c=t.config;var antime=c.animate_time||500;var altg=c.popObg[0];if(altg.attr('data-tips')){return}c.obj.push(altg);altg.html('<span>'+c.alert+'</span>');altg.attr('data-tips','show');t.pop_class_remove(altg);t.pop_open_class(altg);t.pop_set_index();altg.fadeIn(antime,function(){clearTimeout(t.pop_timer);t.pop_timer=setTimeout(function(){t.pop_alert_close()},c.alert_time)});c.openBack(c.obj)},pop_toast_close:function(){var t=this;var c=t.config;var antime=c.animate_time||500;var altg=c.popObg[0];clearTimeout(t.pop_timer);t.pop_class_remove(altg);t.pop_close_class(altg);altg.fadeOut(antime+c.closeDelay,function(){altg.attr('data-tips','');c.closeBack(c.obj)})},pop_toast:function(){var t=this;var c=t.config;var antime=c.animate_time||500;var altg=c.popObg[0];var html='';if(altg.attr('data-tips')){return}c.obj.push(altg);altg.attr('style','display:none');if(c.toast_ico){if(c.toast_ico==='success'||c.toast_ico==='loading'||c.toast_ico==='warn'||c.toast_ico==='warm'){html+='<i class="toast_ico toast_'+c.toast_ico.replace('warn','warm')+'"></i>'}}else{if(c.toast_img){html+='<i class="toast_ico"><img src="'+c.toast_img+'" alt="" /></i>'}}if(c.toast_text){html+='<i class="toast_text '+(html?'toast_text_ts':'')+'">'+c.toast_text+'</i>'}if(!html){return}html='<span>'+html+'</span>';altg.html(html);altg.attr('data-tips','show');if(c.toast_reset){altg.css(c.toast_reset);if(c.toast_reset.span){var spa=$('span',altg);spa.css(c.toast_reset.span)}}t.pop_class_remove(altg);t.pop_open_class(altg);t.pop_set_index();altg.fadeIn(antime,function(){clearTimeout(t.pop_timer);t.pop_timer=setTimeout(function(){t.pop_toast_close()},c.toast_time)});c.openBack(c.obj)},pop_initDone:function(bd,fn){if(!document.getElementById('hdpop-cov')){var str='<div class="hdpop-tips hdpop-toast" id="hdpop-toast"><span></span></div>';str+='<div class="hdpop-tips" id="hdpop-tips"><span></span></div>';str+='<div class="hdpop-cov" id="hdpop-cov"></div>';str+='<div class="hdpop-wk" id="hdpop-wk">';str+='    <a href="javascript:void(0)" class="hdpop-close hdpop-close-btn" id="hdpop-close"></a>';str+='    <div class="hdpop-con" id="hdpop-con"></div>';str+='</div>';bd.append(str)}if(!document.getElementById('hdpop-style')){var doc=document;var style=doc.createElement('style');var cssString='.hdpop-cov{width: 100%; height: 100%; background: #000; position: fixed; z-index: 999; left: 0; top: 0;background:#000; filter:alpha(opacity=70);opacity: 0.7; display: none;}* html { background:url(*) fixed; }* html body { margin:0; height:100%; }* html .hdpop-cov {position: absolute; left: expression (documentElement.scrollLeft + documentElement.clientWidth - this.offsetWidth); top: expression (documentElement.scrollTop + documentElement.clientHeight - this.offsetHeight);display:none;  }.hdpop-wk{width: 500px; height: 220px; padding: 5px; position: absolute; position: fixed; z-index: 1002; left: 50%; top: 50%; margin: -110px 0 0 -250px; display: none;margin-left:-250px;margin-top:-110px;}.hdpop-con{width: 500px; height: 220px; background: #fff; text-align: center; border-radius: 5px; position: relative; z-index: 1;}.hdpop-close-btn{display: block; width: 21px; height: 21px; background: url(//www1.pcauto.com.cn/zt/ztlib/hdpop/pop-ico.png) no-repeat 0 0; position: absolute; right: 25px; top: 20px; z-index: 2;}.hdpop-hd{height: 54px; line-height: 54px; border-bottom: 1px solid #f0f0f0}.hdpop-hd cite{font-size: 20px; text-align: left; padding: 0 20px; text-align: left; display: block; font-style: normal;}.hdpop-hd .center{text-align: center;}.hdpop-ico p{padding-top: 30px;}.hdpop-ico i{display: inline-block; padding-top: 57px; line-height: 50px; font-size: 16px; color: #333;}.hdpop-ico i em{display: block; float: left; width: 50px; height: 50px; background: url(//www1.pcauto.com.cn/zt/ztlib/hdpop/pop-ico.png) no-repeat 0 -22px; margin-right: 15px;}.hdpop-ico i .success{background-position: 0 -22px;}.hdpop-ico i .warm{background-position: 0 -73px;}.hdpop-ico p i{padding-top: 0;}.hdpop-text p{padding-top: 30px;}.hdpop-text span{display: block; padding: 20px 20px 0; color: #888; font-size: 14px;}.hdpop-text span cite{color: #f44; font-style: normal;}.hdpop-tips{position:fixed; width: 100%; left:0; top:46%; z-index:9999;_position:absolute; _top:expression (documentElement.scrollTop + 300 +"px"); text-align: center; display: none;}.hdpop-tips span{display: inline-block; padding: 7px 17px; color: #fff; background:#333; border:1px solid #333; text-align: center; color: #fff; border-radius: 5px; margin: 0 auto;}.hdpop-btn-text{font-size: 16px; height: 90px; line-height: 90px; text-align: center;}.hdpop-toast{z-index: 10000;}.hdpop-btn-item{clear: both; padding-top: 5px;}.hdpop-btn-item a{display: inline-block; width: 86px; height: 34px; border-radius: 3px; font-size: 14px; color: #fa0; border:1px solid #fa0; margin: 0 5px; line-height: 34px;}.hdpop-btn-item .hdpop-btn-sure{background: #ffaa00; color: #fff;}.hdpop-btn-item a:hover{background: #f70; color: #fff;}@-o-keyframes loading360 {from {-webkit-transform:rotate(0deg);transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);transform:rotate(360deg);} } @-moz-keyframes loading360 {from {-webkit-transform:rotate(0deg);transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);transform:rotate(360deg);} } @-webkit-keyframes loading360 {from {-webkit-transform:rotate(0deg);transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);transform:rotate(360deg);} } @-webkit-keyframes loading360 {from {-webkit-transform:rotate(0deg);transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);transform:rotate(360deg);} } @keyframes loading360 {from {-webkit-transform:rotate(0deg);transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);transform:rotate(360deg);} } .hdpop-toast{z-index: 10000; margin-top: -25px;} .hdpop-tips .toast_ico{width: 40px; height: 40px; padding:8px 0; display: inline-block; clear: both; margin: 0 auto; opacity: .8; overflow:hidden} .toast_ico img{max-width:100%;max-height:100%;}.hdpop-tips .toast_text{display: block; padding: 3px 5px;} .hdpop-tips .toast_text_ts{padding: 8px 8px 3px; margin-top: -8px;min-width:54px;} .hdpop-tips .toast_success{background:url("//www1.pcauto.com.cn/zt/ztlib/hdpop/success.png") no-repeat center center; } .hdpop-tips .toast_loading{background:url("//www1.pcauto.com.cn/zt/ztlib/hdpop/loading.png") no-repeat center center; -o-animation:loading360 2s linear infinite;-moz-animation:loading360 2s linear infinite;-webkit-animation:loading360 2s linear infinite;animation:loading360 2s linear infinite;} .hdpop-tips .toast_warm{background:url("//www1.pcauto.com.cn/zt/ztlib/hdpop/warm.png") no-repeat center center; }';style.setAttribute('type','text/css');style.id='hdpop-style';if(style.styleSheet){style.styleSheet.cssText=cssString}else{var cssText=doc.createTextNode(cssString);style.appendChild(cssText)}var heads=doc.getElementsByTagName('head');if(heads.length){heads[0].appendChild(style)}else{doc.documentElement.appendChild(style)}}fn&&fn()},pop_init:function(){var t=this;var c=t.config;var bd=$('body');t.pop_initDone(bd,function(){if(c.closeClass||c.openClass){var css=document.createElement('link');css.type='text/css';css.rel='stylesheet';css.href='//www1.pconline.com.cn/zt/commcss/animate.css';document.getElementsByTagName('head')[0].appendChild(css)}if(c.zIndex>hdpop.zIndex){hdpop.zIndex=c.zIndex}if(c.alert){var tips=$('#hdpop-tips').clone();bd.append(tips);c.popObg[0]=tips;t.pop_alert()}else if(c.toast){var toast=$('#hdpop-toast').clone();bd.append(toast);c.popObg[0]=toast;t.pop_toast()}else{var cov=$('#hdpop-cov').clone();bd.append(cov);c.popObg[0]=cov;c.obj.push(c.popObg[0]);if(c.exter_id){c.popObg[1]=$(c.exter_id);t.pop_open();c.obj.push(c.popObg[1])}else{var wk=$('#hdpop-wk').clone();bd.append(wk);c.popObg[1]=wk;c.popObg[2]=$('.hdpop-con',c.popObg[1]);c.obj.push(c.popObg[1]);c.obj.push(c.popObg[2]);t.pop_set();t.pop_create()}}})}};window.hdpop=hdpop})();
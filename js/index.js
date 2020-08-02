$(function(){
    var comm={
        userToId:module.getSearchData().shareId,
        login:function(){
            console.log(comm.userToId);
            var callback=encodeURIComponent(module.urls.root+'ali/oauthAli_callback.jsp?userToId='+comm.userToId);
            var url =module.urls.login+callback;

            $('.g-btn').on('click',function(){
                window.location.href= url;
            })
        },
        clickEvent:function(){
            $('.btn_rule').on('click',function(){
                $('.fixed').fadeIn();
                $('.pop_rule').show();
            })
            $('.pop_rule .close').on('click',function(){
                $('.pop_rule').hide();
                $('.fixed').fadeOut();
            })
        },
        init:function(){
            this.login();
            this.clickEvent();
        }
    }
    comm.init();
})




(function($,root){
    var controlmanager;
    var $scope=$(document.body)
    var $playlist=$( 
    `<div class="list-wrapper">
        <div class="list-header">播放列表</div>
        <ul class="play-list"></ul>
        <div class="close-btn">关闭</div>
    </div>`);
    function renderlist(data){
        var html='';
        var len=data.length;
        for(var i=0;i<len;i++)
        {
            html+='<li><h3>'+data[i].song+'-<span>'+data[i].singer+'</span></h3></li>'
        }
        $playlist.find('.play-list').html(html);
        $scope.append($playlist);
        bindEvent();
    }
    function show(control){
        controlmanager=control;
        $playlist.addClass('show');
        var index=controlmanager.index;
        sign(index)

    }
    function sign(index){
        $playlist.find('.sign').removeClass('sign');
        $playlist.find('li').eq(index).addClass('sign');

    }
    function bindEvent(){
        $playlist.find('.close-btn').on('click',function(){
            $playlist.removeClass('show');
        })
        $playlist.find('li').on('click',function(){
            var index=$(this).index();
            sign(index);
            controlmanager.index=index;
            $scope.trigger('play:change',[index,true]);
            $scope.find('.play-btn').addClass('playing')
            setTimeout(function(){
                $playlist.removeClass('show');
            },500);
        })
    }
    root.playlist={
        renderlist:renderlist,
        show:show
    }
}(window.Zepto,window.player))
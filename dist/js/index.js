var $=window.Zepto;
var root=window.player;
var render=root.render;
var $scope=$(document.body);
var songList
var index=0;
var controlmanager;
var audiomanager=new root.audioManager();
var proccess=root.proccessManager;
var playlist=root.playlist;
function bindTouch(){
    var $sliderPoint=$scope.find('.slide-point');//圆点
    var offset=$scope.find('.pro-wrapper').offset();//父级
    var left=offset.left;
    var width=offset.width;
    $sliderPoint.on('touchstart',function(){
        proccess.stopPro();
    }).on('touchmove',function(e){
        var x=e.changedTouches[0].clientX;
        var percent=(x-left)/width;
        if(percent>1||percent<0){
            percent=0;
        }
        proccess.upDate(percent);
    }).on('touchend',function(e){
        var x=e.changedTouches[0].clientX;
        var percent=(x-left)/width;
        if(percent>1||percent<0){
            percent=0;
        }
        proccess.startPro(percent,lrclist);
        var time=percent*songList[controlmanager.index].duration;
        audiomanager.jumpToPlay(time);
        $scope.find('.play-btn').addClass('playing')
    })
}
function bindClick(){
    $scope.on('play:change',function(event,index,flag){
        var song=songList[index];
        render(song); 
        audiomanager.setAudioSource(song.audio);
        if(audiomanager.status=='play'||flag){
            audiomanager.play();
            proccess.startPro();
        }
        proccess.renderAllTime(song.duration);
        
        if(song.lrc){
            lrclist=root.lrclist;
            lrclist.getLrc(song.lrc);
            $scope.find('.lrc-list').css({
                display:'block'
            })
        }else{
            lrclist=null;
            $scope.find('.lrc-list').css({
                display:'none'
            })
        }

        proccess.upDate(0);
       
    })
    $scope.find('.prev-btn').on('click',function(){
        var index=controlmanager.prev();
        $scope.trigger('play:change',[index]);
    })
    $scope.find('.next-btn').on("click",function(){
        var index=controlmanager.next();
        $scope.trigger('play:change',[index]);
    })
    $scope.on('click','.play-btn',function(){
        if(audiomanager.status=='pause'){
            audiomanager.play();
            proccess.startPro(null, lrclist);
            $scope.find('.play-btn').addClass('playing');
        }else{
            audiomanager.pause();
            proccess.stopPro();
            $scope.find('.play-btn').removeClass('playing');
        }
    })
    $scope.find('.list-btn').on('click',function(){
        playlist.show(controlmanager);
    })
    
};

function getData(url){
    $.ajax({
        type:'get',
        url:url,
        success:function(data){
            
            songList=data; 
            controlmanager=new root.controlManager(data.length);
            bindClick();
            bindTouch();
            playlist.renderlist(data)
            $scope.trigger('play:change',0)
           
            console.log('success')
        }

    })
}


getData('./mock/data.json')

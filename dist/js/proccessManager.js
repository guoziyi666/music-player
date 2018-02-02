(function($,root){
    var $scope=$(document.body);
    var curDuration;
    var frameId;
    var lastPercent=0;
    var startTime;
    var CurTime;
    var curTime;
    function formateTime(duration){
        duration=Math.round(duration);
        var minute=Math.floor(duration/60);
        var second=duration-minute*60;
        if(minute<10){
           minute='0'+minute;
       }
        if(second<10){
            second='0'+second;
        }
        return minute+':'+second;
    }
    function renderAllTime(duration){
        lastPercent=0;
        curDuration=duration;//全局的总时间
        var alltime=formateTime(duration);
        $scope.find('.all-time').html(alltime);

    }
    function upDate(percent,lrclist){
        CurTime=percent*curDuration;
        CurTime=formateTime(CurTime);
        $scope.find('.cur-time').html(CurTime);
        renderPro(percent);
        if(percent==0){
            $scope.find('.lrc-list').css({
                transform:'translateY(0%)'
            })
            $scope.find('.lrc-list').find('li').removeClass('sign-li')
        }
       
    }
       
        
    
    
    function goon(curTime,lrc){ 
        var len=lrc.length;
        for(var i=0;i<len;i++){
            if(curTime==lrc[i]&&lrc[i]!=-1){
                console.log(curTime,lrc[i])
                $scope.find('.lrc-list').css({
                    transform:'translateY('+-(100/len)*(i-2)+'%)'
                })
                $scope.find('.lrc-list').find('li').removeClass('sign-li')
                $scope.find('.lrc-list').find('li').eq(i).addClass('sign-li');
            }
    }
    }
    function startPro(percentage,lrclist){
        percentage?lastPercent=percentage:lastPercent;
        cancelAnimationFrame(frameId);
        startTime=new Date().getTime();
        function frame(){
            var curTime=new Date().getTime();
            var percent=lastPercent+(curTime-startTime)/(curDuration*1000)
            if(percent<1){
                frameId=requestAnimationFrame(frame);
                upDate(percent);
                if(lrclist){
                    // setTimeout(function(){
                        goon(CurTime,lrclist.lrc);
                    // },300)
                }
            }else{
                cancelAnimationFrame(frameId);

            }
        }
        frame();
    }
    function renderPro(percent){
        var percentage=(percent-1)*100+'%';
        $scope.find('.pro-top').css({
            transform:'translateX('+percentage+')'
        })
    }
    function stopPro(){
        var stop=new Date().getTime();
        lastPercent=lastPercent+(stop-startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId);
    }
    root.proccessManager=
    {
        renderAllTime:renderAllTime,
        startPro:startPro,
        stopPro:stopPro,
        upDate:upDate,
        curTime:curTime
    };
}(window.Zepto,window.player))
(function($,root){
    
    var $scope=$(document.body);
   var lrc=new Array();
   var linetext=new Array();
    function getLrc(url){
        $.ajax({
            type:'get',
            url:url,
            success:function(data){
                getline(data)
                show()
            }
        })
    
    function getline(data){
        var lrcline=data.split('\r\n');
        var len=lrcline.length;
        
        
        for(var i=0;i<len;i++){
            var d =String( lrcline[i].match(/\[\d{2}:\d{2}\.\d{2}\]/g));
            var t = lrcline[i].split(d);
            if(t.length==2){
                linetext[i]=t[1];
                var time=d.split('[')[1].split(']')[0].split('.');
                lrc[i]=time[0];
            }else{
                linetext[i]=t;
                lrc[i]=-1;
            }
        }
    }
    function show(){
        var len=linetext.length
        for(var i=0;i<len;i++){
            var li=document.createElement('li');
            li.innerText=linetext[i];
            $scope.find('.lrc-list').append(li);
        }
    }
}
    root.lrclist={
        getLrc :getLrc,
        lrc:lrc,
        linetext:linetext
    }
    
}(window.Zepto,window.player))
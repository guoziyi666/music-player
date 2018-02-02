(function($,root){
    var $scope=$(document.body);
    function renderInfo(data){
        var html=`<div class="song-name">${data.song}</div>
        <div class="singer-name">${data.singer}</div>
        <div class="album-name">${data.album}</div>`;
        $scope.find('.song-info').html(html);
    }
    function renderImg(src){
        var img=new Image();
        img.onload=function(){
            $scope.find('.song-img img').attr('src',src);
            root.blurImg(img,$scope);
        }
        img.src=src;

    }
    function renderIsLike(islike){
        if(islike){
            $scope.find('.like-btn').addClass('like');
        }else{
            $scope.find('.like-btn').removeClass('like');
        }
    }
    
    root.render=function(data){
        renderInfo(data)
        renderImg(data.image);
        renderIsLike(data.isLike);
    }
}(window.Zepto,window.player))
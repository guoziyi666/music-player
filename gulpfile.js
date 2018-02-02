var gulp=require('gulp'),
connect = require('gulp-connect'),
less=require('gulp-less');
//四个语法
/*{
    task 任务
    src 目录
    dest 转移
    watch 监听
}*/
// gulp.task('task2',function(){
//     console.log(2);
// })
// gulp.task('task1',['task2'],function(){
//     console.log(11);
// })
// gulp.task('default',['task1']);
//在命令行输入gulp触发默认操作
gulp.task('html',function(){
    gulp.src('./src/index.html').pipe(connect.reload()).pipe(gulp.dest('./dist'));
})
//转移html到dist文件夹,pipe是node的方法，用流的方式读取文件

//监听
gulp.task('watch',function(){
    gulp.watch('./src/index.html',['html']);
    gulp.watch('./src/less/*.less',['less']);
    gulp.watch('./src/js/*.js',['js']);
})
//服务器开启
gulp.task('server',function(){
    connect.server({
        root:'./dist',//从哪个目录开启server
        port:8080,//将服务开启在哪个端口
        livereload:true
    });
})
//把less转换css
gulp.task('less',function(){
    gulp.src('./src/less/*.less')
        .pipe(connect.reload())    
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'));
})
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js/'));
})
gulp.task('default',['html','watch','server','less','js']);
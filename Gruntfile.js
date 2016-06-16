module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            /*development: {
                options: {
                    paths: ['src/css/less'],//@improt根目录
                    rootpath: 'src/css',//根目录
                    compress: false,//是否压缩,去掉空格
                    cleancss: false,//使用cleancss压缩css文件
                    relativeUrls:true,//重写url为相对url
                    report:'gzip',//压缩方式'min','gzip'
                }
            },*/
            lessall: {
                files: [{
                    expand: true,
                    cwd: 'src/css/less',
                    src: ['./*.less'],
                    dest: './src/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            html:{
                files:['src/html/*.html'],
                options:{livereload:true}
            },
            js:{
                files:['src/js/*.js'],
                options:{livereload:true}
            },
            lesscss: {
                files: ['./src/css/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                    livereload:true
                }
            },
            /*css:{
                files:['src/css/!*.css'],
                options:{
                    livereload:true
                }
            }*/
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less','watch']);
};
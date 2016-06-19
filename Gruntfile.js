module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            lessall: {
                files: [{
                    expand: true,
                    cwd: './build/less',
                    src: ['./*.less'],
                    dest: './src/css',
                    ext: '.css'
                }]
            }
        },
        react: {
            tojsx: {
                files: [{
                    expand: true,
                    cwd: './build/jsx',
                    src: './*.jsx',
                    dest: './src/js',
                    ext: '.js'
                }]
            }
        },
        watch: {
            html: {
                files: ['src/html/*.html'],
                options: {livereload: true}
            },
            lesscss: {
                files: ['./build/less/*'],
                tasks: ['less'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            js:{
                files:['src/js/*'],
                options:{livereload:true}
            },
            /*reactjs: {
                files: ['./build/jsx/!*'],
                tasks: ['react'],
                options: {
                    livereload: true
                }
            }*/
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('default', ['less', 'watch']);
};
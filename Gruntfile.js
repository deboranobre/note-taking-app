module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: ['app/**/*.jsx','actions/*.js','stores/**/*.js'],
                tasks: ['browserify']
            }
        },

        browserify: {
            options: {
                transform: [['babelify', {presets: ['es2015', 'react']}]]
            },
            client: {
                src: ['app/**/*.jsx'],
                dest: 'public/js/browserify/bundle.js'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options:{
                    ext:'js,jsx,html,ejs'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-reactify');

    grunt.registerTask('default', [
        'browserify'
    ]);
};
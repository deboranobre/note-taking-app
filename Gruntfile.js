module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
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
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', [
        'browserify'
    ]);
};
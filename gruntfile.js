var credentials = require('./credentials')

module.exports = function(grunt) {
    grunt.initConfig({
        screeps: {
            options: {
                email: credentials.email,
                password: credentials.password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/**/*.js']
            },
            source: {
                src: ['src/**/*.js']
            }
        },
        concat: {
            options: {
                seperator: ';',
            },
            default: {
                src: ['src/**/*.js'],
                dest: 'dist/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);
    grunt.registerTask('uploadMin', ['concat', 'screeps']);
    grunt.registerTask('uploadFull', ['screeps']);
}
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
                src: ['src/**/*.js']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'src/**',
                        dest: 'dist/',
                        filter: 'isFile',
                        rename: function(dest, src) {
                            return dest + src.replace(/[PATH]/, '.');
                        }
                    }
                ]
            }
        },
        clean: {
            default: ['dist']
        }
    });

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['screeps']);
    grunt.registerTask('flatten', ['copy']);
}
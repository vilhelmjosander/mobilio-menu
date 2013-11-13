module.exports = function(grunt) {

    grunt.initConfig({

        projectName: 'mobilio-menu',

        sass: {
            dist: {
                files: {
                    'src/styles/<%= projectName %>.css' : 'src/styles/<%= projectName %>.scss'
                }
            }
        },

        uglify: {
            build: {
                src: 'src/js/<%= projectName %>.js',
                dest: 'dist/<%= projectName %>.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    "dist/<%= projectName %>.min.css": "src/styles/<%= projectName %>.css"
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/styles/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify', 'cssmin']);
    grunt.registerTask('watch-sass', ['watch']);

}
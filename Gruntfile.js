module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        assemble: {
            dev: {
                options: {
                    layout: "structure.hbs",
                    layoutdir: 'src/templates/layouts',
                    partials: ['src/templates/partials/*.hbs' ],
                    assets: 'web/assets',
                    production: false
                },
                files: {
                    'web/': ['src/templates/pages/*.hbs']
                }
            },


            prod: {
                options: {
                    layout: "structure.hbs",
                    layoutdir: 'src/templates/layouts',
                    partials: ['src/templates/partials/*.hbs' ],
                    assets: 'web/assets',
                    flatten: true,
                    production: true
                },
                files: {
                    'web/': ['src/templates/pages/*.hbs'],
                },
                home: {
                  options: {
                    layout: 'homeStructure.hbs',
                    files: {'layouts/': ['src/templates/pages/*.hbs' ]}
                  }
                }
            }
        },


        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets/',
                        src: ['**'],
                        dest: 'web/assets/'
                    },
                ]
            }
        },


        clean: {
            all: ['web/**/*', 'index.html']
        },


        watch: {
            files: ['src/**/*.js', 'src/*.hbs', 'src/**/*.hbs',  'assets/**', 'src/css/*.less'],
            tasks: ['clean','assemble:prod', 'copy', 'less:development','uglify','prettify']
        },


        less: {
          development: {
            options: {
              paths: ["src/css"],
              relativeUrls:true,
            },
            files: [{
              src: 'src/css/app.less',
              dest: 'web/css/main.css'
            }]
          },
          production: {
            options: {
              paths: ["src/css"],
              compress: true,
              relativeUrls:true
            },
            files: [{
              src: 'src/css/app.less',
              dest: 'web/css/main.css'
            }]
          }
        },


        uglify: {
            my_target: {
              files: [{
                  expand: true,
                  cwd: 'src/templates/pages/js',
                  src: '**/*.js',
                  dest: 'web/js'
              }]
            }
          },


          prettify: {
            options: {
              "indent": 2,
              "condense": true,
              "indent_inner_html": true,
              'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u','li']
            },
            all: {
                expand: true,
                cwd: 'web/',
                ext: '.html',
                src: ['*.html'],
                dest: 'web/'
              }
          }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['clean', 'assemble:dev', 'copy','less','uglify','prettify']);
    grunt.registerTask('prod', ['clean', 'assemble:prod', 'copy', 'less','uglify','prettify']);

    /**
     * Log 'watch' event changes
     */
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        whatch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev: {
                bsFiles: { //browser files
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' // Directorio base para nuestro servidor
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'images/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },
        uglify: {
            dist: {
            },

            filerev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    lenth: 20
                },

                release: {
                    // filerev:release hashes(md5) all assets (images, js and css)
                    // in dist directory
                    files: [{
                        src: [
                            'dist/js/*.js',
                            'dist/css/*.css'
                        ]
                    }]
                }
            },
            concat: {
                options: {
                    separador: ';'
                },
                dist: {}
            },

            useminPrepare: {
                foo: {
                    dest: 'dist',
                    src: ['index.html', 'nosotros.html', 'precios.html', 'contacto.html']
                },
            options: {
                    flow: {
                        steps: {
                            css: ['cssmin'],
                            js: ['uglifly']
                        },
                        post: {
                            css: [{
                                name: 'cssmin',
                                createConfig: function (context, block) {
                                    var generated = context.options.generated;
                                    generated.options = {
                                        keepSpecialComments: 0,
                                        rebase: false
                                    }
                                }
                            }]
                        }
                    }
                }
            },




            usemin: {
                html: ['dist/index.html', 'dist/nosotros.html', 'dist/precios.html', 'dist/contactos.html', 'dist/termino.html'],
                options: {
                    assetsDir: ['dist', 'dist/css', 'dist/js']

                }
            }

        }


    });


    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
}
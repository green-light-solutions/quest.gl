module.exports = function(grunt) {

  var libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery/dist/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
  ];

  var stylesheets = [
    'node_modules/bootstrap/scss/bootstrap.scss',
    'node_modules/bootstrap/scss/bootstrap-grid.scss',
    'node_modules/bootstrap/scss/bootstrap-reboot.scss',
  ];

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    paths: {
      src: {
        assets: 'src/assets/**',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss',
      },
      dest: {
        code: 'dist',
        assets: 'dist/assets',
      },
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['<%= paths.src.assets %>'], dest: '<%= paths.dest.assets %>', filter: 'isFile' },
        ],
      },
    },
    htmlmin: {
      main: {
        options: {
          removeComments: true,
        },
        files: {
          '<%= paths.dest.code %>/index.html': 'src/index.html',
        },
      },
    },
    uglify: {
      main: {
        options: {
          compress: true,
          sourceMap: {
            includeSources: true,
          },
        },
        files: [
          {
            src: ['<%= paths.src.js %>'],
            dest: '<%= paths.dest.code %>/bundle.min.js',
          },
        ],
      },
      lib: {
        options: {
          compress: true,
        },
        files: [
          {
            src: libs,
            dest: '<%= paths.dest.code %>/lib.min.js',
          },
        ],
      },
    },
    sass: {
      lib: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
          sourceMapContents: true,
        },
        files: [
          {
            src: stylesheets,
            dest: '<%= paths.dest.code %>/lib.min.css',
          },
        ],
      },
      main: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
          sourceMapContents: true,
        },
        files: [
          {
            src: ['<%= paths.src.scss %>'],
            dest: '<%= paths.dest.code %>/bundle.min.css',
          },
        ],
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      index: {
        files: ['src/index.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['<%= paths.src.js %>'],
        tasks: ['uglify:main'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['<%= paths.src.scss %>'],
        tasks: ['sass:main'],
        options: {
          spawn: false,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: ['dist'],
          open: true,
          livereload: true,
        },
      },
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json',
      },
      target: ['<%= paths.src.js %>'],
    },
    sasslint: {
      options: {
        configFile: '.sasslint.yml',
      },
      target: ['<%= paths.src.scss %>'],
    },
  });

  grunt.registerTask('default', ['uglify', 'sass', 'copy', 'htmlmin', 'connect', 'watch']);
  grunt.registerTask('build', ['eslint', 'sasslint', 'uglify', 'sass', 'copy', 'htmlmin']);
};

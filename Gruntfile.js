module.exports = function(grunt) {

  const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/fullpage.js/dist/jquery.fullpage.js',
  ];

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    paths: {
      src: {
        js: 'src/js/**/*.js',
        scss: 'src/scss/main.scss',
      },
      dest: {
        code: 'dist'
      },
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src', src: 'assets/**', dest: '<%= paths.dest.code %>', filter: 'isFile' },
          { src: 'src/favicon.ico', dest: '<%= paths.dest.code %>/favicon.ico', filter: 'isFile' },
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
        files: ['src/scss/**'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      assets: {
        files: ['src/assets/**'],
        tasks: ['copy'],
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
    githooks: {
      all: {
        'pre-commit': 'lint',
      }
    }
  });

  grunt.registerTask('lint', ['eslint', 'sasslint']);
  grunt.registerTask('default', ['githooks', 'uglify', 'sass', 'copy', 'htmlmin', 'connect', 'watch']);
  grunt.registerTask('build', ['lint', 'uglify', 'sass', 'copy', 'htmlmin']);
};

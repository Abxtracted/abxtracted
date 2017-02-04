var fs = require('fs');
var project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    'uglify': {
      options: {
        mangle: false
      },
      vendor: {
        files: {
          [project.paths.scripts.dist.vendor.requirejs]: project.paths.scripts.vendor.requirejs,
          [project.paths.scripts.dist.vendor.jquery]: project.paths.scripts.vendor.jquery
        }
      }
    },

    'concat': {
      options: {
        sourceMap: true
      },
      scripts: {
        src: [
          project.paths.scripts.source.main,
          project.paths.scripts.source.files,
          project.paths.scripts.source.boot
        ],
        dest: project.paths.scripts.dist.bundle
      }
    },

    'stylus': {
      source: {
        files: {
          [project.paths.styles.dist.bundle]: project.paths.styles.source.files
        }
      },
      vendor: {
        files: {
          [project.paths.styles.dist.vendor.bundle]: project.paths.styles.vendor.files
        }
      }
    },

    'copy': {
      fonticons: {
        files: [{
          expand: true,
          cwd: project.paths.fonts.icons.root,
          src: ['**/*.*'],
          dest: project.paths.fonts.dist.vendor.root
        }]
      }
    },

    'imagemin': {
      source: {
        files: [{
          expand: true,
          cwd: project.paths.images.source.root,
          src: ['**/*.*'],
          dest: project.paths.images.dist.root
        }]
      }
    },

    'karma': {
      unit: {
        configFile: project.paths.scripts.spec.config
      }
    },

    'watch': {
      scripts: {
        files: [
          project.paths.scripts.source.main,
          project.paths.scripts.source.files,
          project.paths.scripts.source.boot
        ],
        tasks: ['concat']
      },
      images: {
        files: project.paths.images.source.files,
        tasks: ['newer:imagemin']
      },
      styles: {
        files: project.paths.styles.source.files,
        tasks: ['stylus']
      }
    },

    'http-server': {
      dev: {
        port: 8000,
        host: '0.0.0.0',
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: true
      }
    }

  });

  grunt.registerTask('build', [
    'uglify',
    'concat',
    'stylus',
    'copy',
    'imagemin'
  ]);

  grunt.registerTask('start', [
    'build',
    'http-server',
    'watch'
  ]);

}

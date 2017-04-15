var fs = require('fs'),
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

module.exports = function(grunt) {

  var env = grunt.option('env') || 'dev';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    'uglify': {
      options: {
        mangle: false
      },
      vendor: {
        files: {
          [project.scripts.dist.vendor.requirejs]: project.scripts.vendor.requirejs,
          [project.scripts.dist.vendor.jquery]: project.scripts.vendor.jquery,
          [project.scripts.dist.vendor.highlightjs]: project.scripts.vendor.highlightjs
        }
      },
      environment: {
        files: {
          [project.environments.dist.file]: `${project.environments.source.root}/${env}.js`
        }
      }
    },

    'concat': {
      options: {
        sourceMap: true
      },
      scripts: {
        src: [
          project.scripts.source.main,
          project.scripts.source.files,
          project.scripts.source.boot
        ],
        dest: project.scripts.dist.bundle
      }
    },

    'stylus': {
      source: {
        files: {
          [project.styles.dist.bundle]: project.styles.source.files
        }
      },
      vendor: {
        files: {
          [project.styles.dist.vendor.bundle]: project.styles.vendor.files
        }
      }
    },

    'imagemin': {
      source: {
        files: [{
          expand: true,
          cwd: project.images.source.root,
          src: ['**/*.*'],
          dest: project.images.dist.root
        }]
      }
    },

    'pug': {
      source: {
        files: [{
          expand: true,
          cwd: project.templates.source.root.pages,
          src: [project.templates.source.files],
          dest: project.templates.dist.root,
          ext: '.html'
        }]
      }
    },

    'karma': {
      unit: {
        configFile: project.scripts.spec.config
      }
    },

    'watch': {
      templates: {
        files: `${project.templates.source.root.all}/${project.templates.source.files}`,
        tasks: ['pug']
      },
      scripts: {
        files: [
          project.scripts.source.main,
          project.scripts.source.files,
          project.scripts.source.boot
        ],
        tasks: ['concat']
      },
      styles: {
        files: project.styles.source.files,
        tasks: ['stylus']
      },
      images: {
        files: project.images.source.files,
        tasks: ['newer:imagemin']
      },
      environments: {
        files: `${project.environments.source.root}/${project.environments.source.files}`,
        tasks: ['uglify:environment']
      }
    },

    'replace': {
      fingerprint: {
        options: {
          patterns: [{
            match: 'fingerprint',
            replacement: new Date().getTime()
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: project.index.dist.file,
          dest: project.index.dist.root
        }]
      }
    },

    'http-server': {
      dev: {
        root: 'dist',
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
    'imagemin',
    'pug'
  ]);

  grunt.registerTask('start', [
    'build',
    'http-server',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'replace'
  ]);

}

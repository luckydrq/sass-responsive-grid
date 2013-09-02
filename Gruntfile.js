var path = require('path')
var buildDir = path.join(__dirname, 'build')

var dev_sassdir = path.join(__dirname,'public/sass')
var build_cssdir = path.join(__dirname,'build/css')

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      exec: {
        command: [
          'sass index.scss:' + path.join(buildDir,'css/index.css'),
          'cp -R ../scripts ' + buildDir,
          'cd ' + __dirname,
          'grunt cssmin:minify'
        ].join('&&'),
        options: {
          stdout: true,
          execOptions: {
            cwd: dev_sassdir
          }
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: build_cssdir,
        src: ['index.css'],
        dest: build_cssdir,
        ext: '-min.css'
      }
    },
    watch: {
      inspect: {
        files: ['public/**/**'],
        tasks: ['shell:exec'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['shell:exec'])
}
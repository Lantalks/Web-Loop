module.exports = function(grunt) {
	console.log('Starts Grunt'); 
	// Task configuration will go here
	grunt.initConfig({
		// Express task config
		express: {
			dev: {
				options: {
					script: 'program.js'
				}
			}
		}, 
		// SASS task config
		sass: {
			dist: {
				options: {
					style: 'expanded' 
				}, 
				files: [{
					expand: true,
					cwd: 'site/sass',			// Source file 
					src: ['*.scss'],
					dest: 'site/css',			// Destination 
					ext: '.css'
				}]
			}
		}, 
		// Cofeescript task config 
		coffee: {
			compile: {
				files: {
					'site/js/scripts.js': 'site/coffee/scripts.coffee', // 1:1 compile
				}
			}
		},
		// Watch task config
		watch: {
			options: { livereload: 35729 }, 
			sass: {
				files: "site/sass/*.scss",
				tasks: ['sass'] 
			},  
			coffee: {
				files: 'site/coffee/*.coffee', 
				tasks: ['coffee']
			}, 
			html: {
				files: ['site/*.html'] 
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-express-server');
	grunt.registerTask('default', ['express', 'watch']); 
};
module.exports = function(grunt) {
	console.log('Starts Grunt'); 
	// Task configuration will go here
	grunt.initConfig({
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['sass', 'coffee']); 
};
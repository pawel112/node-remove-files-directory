function checkDirectory (directory, callback) {
	var fs = require('fs');
	fs.exists(directory, function(exists) {
		if (exists) {
			callback(true);
		} else {
			callback(false);
		}
	});
};

function readDirectory (directory, callback) {
	var fs = require('fs');
	fs.readdir(directory, (err, files) => {
		callback(files);
	});
};

function rmFile (file) {
	var fs = require('fs');
	fs.unlinkSync(file);
};

exports.remove = function(file) {
	var rimraf = require('rimraf');
	checkDirectory(file, function (check) {
		if (check == true) {
			//file / directory are exist
			readDirectory(file, function (check) {
				if (check != "undefined") {
					//is directory
					var rimraf = require('rimraf');
					rimraf(file, function() {
						console.log ("Done");
					});	
				} else {
					//is file
					rmFile(file);
					console.log ("Done");
				}
			});
		} else {
			throw Error('ERROR: File / directory are not exist.');
		}
	});
}
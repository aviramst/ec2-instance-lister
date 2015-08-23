#!/usr/bin/env node

var AWS = require('aws-sdk');
var rc = require('rc');
var config = rc('ec2-instance-lister');
var searchString;

if (config.s) {
	searchString = config.s;
} else {
	searchString = config.searchString;
}

var ec2params = {
	Filters: [{
		Name: 'instance-state-code',
		Values: [
			'16'
		]
	}]
};

var credentials = config.aws

if (config.account) {
	if (config[config.account]) {
		credentials = config[config.account]
	} else {
		return console.error('you specified an account %s, but the config did not include actual credential data, try adding config.[account name] = { ... credentials here ...}', config.account)
	}
}

var listPrivateInstances = typeof(config.listPrivateInstances) === 'boolean' ? config.listPrivateInstances : false

var ec2 = new AWS.EC2(credentials);
ec2.describeInstances(ec2params, onResponse);

function onResponse(err, data) {
	if (err) {
		console.error(err);
		return;
	}

	var res = data.Reservations;
	if (res === undefined) {
		console.error('No instances found!');
		return;
	}

	var result = [];

	for (var i = 0; i < res.length; i++) {
		var group = res[i].Instances;
		if (group !== undefined) {
			for (var j = 0; j < group.length; j++) {
				var instance = group[j];
				var tags = instance.Tags;
				for (var k = 0; k < tags.length; k++) {
					if ((tags[k].Key === 'Name') && (tags[k].Value.indexOf(searchString) > -1)) {
						if (instance.PublicIpAddress) {
							console.log(instance.PublicIpAddress);
						} else if (listPrivateInstances) {
							console.log(instance.PrivateIpAddress);
						}
					}
				}
			}
		}
	}
}

#!/usr/bin/env node

var AWS = require('aws-sdk');
var rc = require('rc');
var config = rc('ec2-instance-lister');
var tagName = 'name';
var tagValue;

if (config.s) {
	tagValue = config.s;
} else if (config.tag || config.t) {
	config.tag = config.tag || config.t
	var split = config.tag.split('=')
	
	if (split.length !== 2) {
		throw new Error('invalid tag expression, must be key=value. Input was ' + config.tag)
	}

	tagName = split[0].toLowerCase()
	tagValue = split[1]
} else {
	tagValue = config.searchString;
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

var ipField = config.ipType === 'private' ? 'PrivateIpAddress' : 'PublicIpAddress'

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
	
	console.error('NOTE: only ips are written to stdout, the rest is written to stderr.')

	for (var i = 0; i < res.length; i++) {
		var group = res[i].Instances;
		if (group !== undefined) {
			for (var j = 0; j < group.length; j++) {
				var instance = group[j];
				var tags = instance.Tags;
				for (var k = 0; k < tags.length; k++) {
					if ((tags[k].Key.toLowerCase() === tagName) && (tags[k].Value.indexOf(tagValue) > -1)) {
						var ip = instance[ipField]
						if (ip) {
							console.error('instance id [%s]', instance.InstanceId)
							console.log(ip);
						}
					}
				}
			}
		}
	}
}

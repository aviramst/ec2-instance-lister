#!/usr/bin/env node

var AWS = require('aws-sdk');
var rc = require('rc');
var config = rc('ec2instancelister');

var START_SIGN = 'ec2sync-section-start';
var END_SIGN = 'ec2sync-section-end';

var ec2params = {Filters: [
    {
      Name: 'instance-state-code',
      Values: [
        '16',
      ]
    }
]};

function onResponse (err, data) {
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

	for (var i=0; i<res.length; i++) {
		var group = res[i].Instances;
		if (group !== undefined) {
			for (var j=0; j<group.length; j++) {
				var instance = group[j];
				var tags = instance.Tags;
				for (var k=0; k<tags.length; k++) {
					if ((tags[k].Key === 'Name') && (tags[k].Value.indexOf(config.searchString) > -1)) {
						console.log(instance.PublicIpAddress);
					}
				}
			}
		}
	}
}

var ec2 = new AWS.EC2(config.aws);
ec2.describeInstances(ec2params, onResponse);
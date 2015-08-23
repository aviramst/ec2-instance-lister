ec2-instance-lister
=================
[![Dependencies Status](https://david-dm.org/aviramst/ec2-instance-lister.png)](https://david-dm.org/aviramst/ec2-instance-lister)

List IP addresses of ec2 instances having a certain keyword in their name.

#Installation:
```
npm install -g ec2-instance-lister
```

#Usage:


This module uses [RC](https://www.npmjs.org/package/rc) to manage its configuration, so you will have to type your AWS credentials into the [```.ec2-instance-listerrc```](example/.ec2-instance-listerrc) file.

Run:

```
ec2-instance-lister
```

## options

### --searchString | -s
Specify a search string to find in the instance tags

### --account
Specify an account name for different credentials.
The default credentials are named _aws_ and they appear in the config file like so:

```
{
    "aws": {
        "accessKeyId": "blablabla",
        "secretAccessKey": "shhhhhhhhh",
        "region": "us-moon-1"
    }
}
```

if you specify --account or add it in the config, e.g. ```ec2-instance-lister --account=foo``` then credentials used will be under the account name key:

```
{
    "aws": { ... },
    "foo": {
        "accessKeyId": "blablabla",
        "secretAccessKey": "shhhhhhhhh",
        "region": "us-moon-1"  
    }
}
```

### --listPrivateInstances
A flag that indicates if results should include private instances (that only has private ips, inside a vpc for example). Defaults to false

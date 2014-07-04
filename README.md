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
sudo ec2-instance-lister
```

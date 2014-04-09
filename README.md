ec2instancelister
=================

List IP addresses of ec2 instances having a certain keyword in their name.

#Installation:
```
npm install -g ec2instancelister
```

#Usage:


This module uses [RC](https://www.npmjs.org/package/rc) to manage its configuration, so you will have to type your AWS credentials into the [```.ec2syncrc```](.ec2syncrc) file.

Run:

```
sudo ec2instancelister
```
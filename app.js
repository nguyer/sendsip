#!/usr/bin/env node

'use strict';

var os = require('os');
var sip = require('sip');

var to = '19194181234';
var from = '19194181235';
var ip = '127.0.0.1';
var port = 5060;
var sourcePort = 6161;

for (var i = 2; i < process.argv.length; i++) {
	if (process.argv[i] === '--to') {
		i++;
		to = process.argv[i];
	}
	else if (process.argv[i] === '--from') {
		i++;
		from = process.argv[i];
	}
	else if (process.argv[i] === '--ip') {
		i++;
		ip = process.argv[i];
	}
	else if (process.argv[i] === '--port') {
		i++;
		port = process.argv[i];
	}
	else if (process.argv[i] === '--sourcePort') {
		i++;
		sourcePort = process.argv[i];
	}
}

var sipClient = sip.create({ port : sourcePort });

function rstring() { return Math.floor(Math.random() * 1e6).toString(); }

var invite = {
	method : 'INVITE',
	uri : 'sip:+' + to + '@' + ip + ':' + port,
	headers: {
		to : { uri : 'sip:+' + to + '@' + ip + ':' + port },
		from : { uri: 'sip:+' + from + '@' + os.hostname() + ':' + sourcePort, params : { tag : rstring() } },
		'call-id': rstring(),
		cseq: { method : 'INVITE', seq: Math.floor(Math.random() * 1e5) },
		'content-type': 'application/sdp',
		contact : [ { uri: 'sip:+' + from + '@' + os.hostname() + ':' + sourcePort } ]
	}
};

console.log(sip.stringify(invite) + '\n');

sipClient.send(invite, function(res) {
	console.log(sip.stringify(res) + '\n');
	sipClient.destroy();
});

#!/usr/bin/env node

'use strict';

var os = require('os');
var sip = require('sip');

var to = '19194181234';
var from = '19194181235';
var ip = '127.0.0.1';
var port = 5060;
var sourcePort = 6161;
var sourceIp = '127.0.0.1';
var tcp = false;
var rport = true;
var callId = Math.floor(Math.random() * 1e6).toString();
var seq = Math.floor(Math.random() * 1e5).toString();

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
	else if (process.argv[i] === '--sourceIp') {
		i++;
		sourceIp = process.argv[i];
	}
	else if (process.argv[i] === '--tcp') {
		tcp = true;
	}
	else if (process.argv[i] === '--no-rport') {
		rport = false;
	}
}

var sipClient = sip.create({
	port          : sourcePort,
	publicAddress : sourceIp,
	rport         : rport,
	tcp           : tcp,
	udp           : !tcp
});

var invite = {
	method : 'INVITE',
	uri : 'sip:+' + to + '@' + ip + ':' + port,
	headers: {
		to : { uri : 'sip:+' + to + '@' + ip + ':' + port },
		from : { uri: 'sip:+' + from + '@' + sourceIp + ':' + sourcePort, params : { tag : callId } },
		'call-id': callId,
		cseq: { method : 'INVITE', seq: seq },
		'content-type': 'application/sdp',
		contact : [ { uri: 'sip:+' + from + '@' + sourceIp + ':' + sourcePort } ],
		'Max-Forwards': 70
	}
};

console.log(sip.stringify(invite) + '\n');

sipClient.send(invite, function(res) {
	console.log(sip.stringify(res) + '\n');
	sipClient.destroy();
});

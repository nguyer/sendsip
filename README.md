#sendsip

*A super simple tool to send a SIP invite*

Powered by Node.js

## Installation

Just like you install everything Node:

	$ sudo npm install -g sendsip

## Usage

Just Do It.

	$ sendsip [args]

Super simple, right?

## Command Line Options

Oh, you want a little customization? Sure we can do that...

| Flag         | Description                                | Type    | Default     |
|--------------|--------------------------------------------|---------|-------------|
| --to         | The 'to' telephone number                  | String  | 19194181234 |
| --from       | The 'from' telephone number                | String  | 19194181235 |
| --ip         | The destination IP to send the Invite to   | String  | 127.0.0.1   |
| --port       | The destination port to send the Invite to | Integer | 5060        |
| --sourcePort | The port that you want to listen on        | Integer | 6161        |

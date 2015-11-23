var encryptor = {
	constructor: function() {
		this.privateKey = [];
		this.publicKey = [];
		this.keyLength = 255;

		this.generateKeys();
	},

	generateKeys: function() {
		// Generates the unique key for each session
		for (var i = 0; i <= this.keyLength; i++) {
			//var pushCode = Math.floor(Math.random() * (this.keyLength + 1)) + 1;
			var pushCode = i * 24 + 394;
			//while(pushCode > this.keyLength + 1) pushCode -= (this.keyLength + 1);

			this.privateKey.push(pushCode)
			this.publicKey.push(this.keyLength - pushCode);
		}
	},

	encrypt: function(message) {
		// Encrypts the message using the privateKey
		var encryptedMessage = '';

		for (var i = 0, len = message.length; i < len; i++) {
			var charCode = message[i].charCodeAt(0);
			charCode += this.privateKey[i];

			if (charCode > this.keyLength) {
				charCode -= this.keyLength;
			}
			encryptedMessage += String.fromCharCode(charCode);
		}

		return encryptedMessage;
	},

	decrypt: function(message) {
		// Decrypts the message using the publicKey
		var decryptedMessage = '';

		for (var i = 0, len = message.length; i < len; i++) {
			var charCode = message[i].charCodeAt(0);

			charCode += this.publicKey[i];
			if (charCode > this.keyLength) {
				charCode -= this.keyLength;
			}
			decryptedMessage += String.fromCharCode(charCode);
		}

		return decryptedMessage;
	}
};
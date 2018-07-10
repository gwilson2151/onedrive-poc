const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const certDirPath = path.join(process.cwd(), "cert");
fs.mkdir(certDirPath, (err) => {
	if (err.code !== 'EEXIST') throw err;
});

const attrs = [{ name: 'commonName', value: 'dev.local' }];
const pems = selfsigned.generate(null, { algorithm: 'sha256' });

const certPath = path.join(process.cwd(), "cert/server.crt");
const keyPath = path.join(process.cwd(), "cert/server.key");

fs.writeFileSync(keyPath, pems.private);
fs.writeFileSync(certPath, pems.cert);

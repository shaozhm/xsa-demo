/*eslint no-console: 0*/
/*eslint-env node, es6 */
"use strict";

var xsjs = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;
global.__base = __dirname + "/";

var options = {
	anonymous : false, // remove to authenticate calls
	redirectUrl : "/index.xsjs",
	xsApplicationUser : false
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[XSJS HANA WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[XSJS UAA WARN]", err.message);
}

// configure AuditLog
try {
        options = Object.assign(options, xsenv.getServices({ auditLog: {tag: "auditlog"} }));
} catch (err) {
        console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);
console.log("Server listening on port %d", port);


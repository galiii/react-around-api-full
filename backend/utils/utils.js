module.exports.ERROR_CODE = 400;
module.exports.DEFAULT_ERROR = 500;
module.exports.NOT_FOUND = 404;
module.exports.OK = 200;

/*
1) http:// or https:// -- https?:\/\/
2) www. is an optional group. -- (www\.)?
3) ._~:/?%#[]@!$&'()*+,;= - [-a-zA-Z0-9@:%._\+~#=]{1,256}
example.com/
1-example.com
example.com/go/even/deeper/
example-example-example.com
*/
module.exports.regexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)#?/;
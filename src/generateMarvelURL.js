const md5 = require('blueimp-md5');

function indexMarvel(resourceName, options) {
  const publickey = options.publicKey;
  const privatekey = options.privateKey;
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const limit = options.limit;
  const offset = options.offset;
  const searchAttr = options.searchAttr;
  const searchTerm = options.searchTerm;

  const baseUrl = `https://gateway.marvel.com:443/v1/public/${resourceName}`;
  let url;
  if(searchAttr && searchTerm) {
    url = `${baseUrl}?${searchAttr}=${searchTerm}&limit=${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}`
  } else {
    url = `${baseUrl}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publickey}&hash=${hash}`
  }
  return url;
}

module.exports = { indexMarvel }

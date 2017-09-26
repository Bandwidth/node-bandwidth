const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const customTags = name => name.toLowerCase() === "lata" ? "lata" : name;

const transformParsedObject = obj => {
  if(Array.isArray(obj)){
    return obj.map(function(i){
      return transformParsedObject(i);
    });
  }
  if(typeof obj === "object"){
    var k, result = {};
    for(k in obj){
      result[k] = transformParsedObject(obj[k]);
    }
    return result;
  }
  if(obj === "true" || obj === "false"){
    return (obj  === "true");
  }
  if(/^\d{4}\-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{3})?Z$/.test(obj)){
    return new Date(obj);
  }
  if(/\d{10}/.test(obj)){
    return obj;
  }
  if(!isNaN(obj)){
    return Number(obj);
  }
  return obj;
}

const prepareToBuildXml = obj => {
	if(Array.isArray(obj)){
		return obj.map(function(i){
			return prepareToBuildXml(i);
		});
	}
	if(obj instanceof Date){
		return obj.toISOString();
	}
	if(typeof obj === "object"){
		var j, k, v, result = {};
		for(k in obj)
		{
			v = obj[k];
			if(v === null || v === undefined || k[0] === "_") continue;
			result[obj["_" + k + "XmlElement"] || k[0].toUpperCase() + k.substr(1)] = prepareToBuildXml(v);
		}
		return result;
	}
	return obj.toString();
}

module.exports.buildXml = (reqType, params) => {
	return prepareToBuildXml({reqType : params});
}

module.exports.parseXml = (xml) => {
	const xml2jsParserOptions = {
		explicitArray: false,
		tagNameProcessors: [xml2js.processors.firstCharLowerCase, customTags],
		async: true
	};
	return new Promise( (resolve, reject) => {
		xml2js.parseString(xml, xml2jsParserOptions, (err, res) => {
			if (err) {
				reject(err);
			}
			else {
				const obj = transformParsedObject(res)
				resolve(obj)
			}
		});
	});
};
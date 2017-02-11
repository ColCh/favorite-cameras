import URL from 'url-parse';


const replace = (link, parameter, value) => {
  const url = new URL(link, '', true);
  
  url.query = url.query || {};
  url.query[parameter] = value;
  
  return url.toString();
};


export default replace;
import jsonp from 'micro-jsonp';


export default function (seed = '', limit = 10) {
  return new Promise((resolve, reject) => {
    const param = 'jsonp';
    
    // may be use some module for handling querystring
    const querystring = [
      `limit=${limit}`,
      seed && `seed=${seed}`,
    ].filter(Boolean).join('&');
    
    const url = `http://api.ivideon.com/tv/cameras?${querystring}`;
    
    jsonp(url, {
      param,
      timeout: 10000,
      response: (err, data) => {
        if (err) {
          reject(err);
        } else if (!data.success) {
          reject(data.response)
        } else {
          resolve(data.response);
        }
      }
    })
  });
};
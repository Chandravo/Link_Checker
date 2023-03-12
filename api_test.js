const fetch = require("node-fetch");



// const API_KEY = 'JNMQeei4UGEtkhWajYIyRGtBw3IE6vZE';

// // replace URL_TO_CHECK with the URL you want to check
// const base_url = 'http://ww1.steamunlock.net/?terms=Mobile%20Game%20Virginia%20Cloud%20Hosting%20Server,PC%20Game%20Virginia%20Cloud%20Hosting%20Server,Console%20Game%20Virginia%20Cloud%20Hosting%20Server'
// const url = encodeURIComponent(base_url);

// console.log(url);

// // create the API endpoint URL
// const apiEndpoint = 'https://ipqualityscore.com/api/json/url/' + API_KEY + '/' + url ;

// // create the request body

// // send the GET request to the API endpoint with the request body
// var s = "your url is "
// fetch(apiEndpoint)
// .then(response => response.json())
// .then(data => {
//   // handle the API response
//   if (data.unsafe==true) {
//     s=s+'unsafe'
//   } else {
//     s=s+'safe'
//   }
//   s=s+'\n';
//   s=s+"Risk Score: "+data.risk_score;
//   console.log(s);
// })
// .catch(error => {
//   console.error('Error:', error);
// });

// console.log('\n\n');
// console.log(s);



require('dotenv').config()
console.log(process.env.API_KEY);

const API_KEY = process.env.API_KEY;

function checkUrl(urlToCheck) {
  const encodedUrl = encodeURIComponent(urlToCheck);

  // create the API endpoint URL
  const apiEndpoint = 'https://ipqualityscore.com/api/json/url/' + API_KEY + '/' + encodedUrl ;

  let resultString = 'Your URL is: '+apiEndpoint +'\n The URL is ';

  // send the GET request to the API endpoint with the request body
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // handle the API response
      if (data.unsafe) {
        resultString += 'Unsafe\n';
      } else {
        resultString += 'Safe\n';
      }
      resultString += '|| Risk Score: ' + data.risk_score;

      return resultString;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Example usage
var res="lmao ";
checkUrl('http://ww1.steamunlock.net/?terms=Mobile%20Game%20Virginia%20Cloud%20Hosting%20Server,PC%20Game%20Virginia%20Cloud%20Hosting%20Server,Console%20Game%20Virginia%20Cloud%20Hosting%20Server')
  .then(result => {
    res+=result;
    console.log(res);
  });
  console.log(res);

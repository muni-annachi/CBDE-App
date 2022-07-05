const AWS = require('aws-sdk');
const fs = require('fs');
const html = fs.readFileSync('index.html', {encoding: 'utf8'});


export const handler = async (event: any = {}): Promise<any> => {

   /* const html = `
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <body>
      <h1>Landing Page</h1>
      This is Landing Page
    </body>
  </html>`;*/

    return {
        statusCode: 500,
        headers: {
        'Content-Type': 'text/html',
        },
        body: html,
    };
};

const AWS = require('aws-sdk');

export const handler = async (event: any = {}): Promise<any> => {

    const html = `
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <body>
      <h1>Landing Page</h1>
      This is Landing Page
    </body>
  </html>`;

    return {
        statusCode: 200,
        headers: {
        'Content-Type': 'text/html',
        },
        body: html,
    };
};

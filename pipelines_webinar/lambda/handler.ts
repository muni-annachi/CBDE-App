const AWS = require('aws-sdk');

export const handler = async (event: any = {}): Promise<any> => {
    return {
        body: '<h1> Success Response Latest one </h1>',
        statusCode: 200,
        Headers: {
                "Content-Type": "text/html"
        }
    };
};

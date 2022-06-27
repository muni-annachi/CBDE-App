const AWS = require('aws-sdk');

export const handler = async (event: any = {}): Promise<any> => {
    return {
        body: 'Success Response Latest one',
        statusCode: 200,
    };
};

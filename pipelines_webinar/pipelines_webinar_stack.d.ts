import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnOutput } from 'aws-cdk-lib/core';
export declare class PipelinesWebinarStack extends cdk.Stack {
    urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}

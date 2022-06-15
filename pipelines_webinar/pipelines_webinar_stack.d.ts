import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class PipelinesWebinarStack extends cdk.Stack {
    urlOutput: cdk.CfnOutput;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}

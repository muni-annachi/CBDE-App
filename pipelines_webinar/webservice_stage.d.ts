import { CfnOutput } from 'aws-cdk-lib/core';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class WebServiceStage extends cdk.Stage {
    urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}

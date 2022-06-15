import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class WebServiceStage extends cdk.Stage {
    urlOutput: cdk.CfnOutput;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}

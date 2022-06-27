import { PipelinesWebinarStack } from './pipelines_webinar_stack';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WebServiceStage extends cdk.Stage {
  urlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const service = new PipelinesWebinarStack(this, 'WebService', {
      env: {
        account: (id === 'Prod' ?  "520761064845" : "786424842112" )  ,
        region: "us-east-1"
      },
      tags: {
        Application: 'WebService',
        Environment: id
      }
    });

    this.urlOutput = service.urlOutput
  }
}

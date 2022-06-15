import { CfnOutput, StackProps, Stage } from 'aws-cdk-lib/core';
import { PipelinesWebinarStack } from './pipelines_webinar_stack';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WebServiceStage extends cdk.Stage {
  urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const service = new PipelinesWebinarStack(this, 'WebService', {
      tags: {
        Application: 'WebService',
        Environment: id
      }
    });

    this.urlOutput = service.urlOutput
  }
}

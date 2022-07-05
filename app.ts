#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from './pipelines_webinar/pipeline_stack';
import { AwsSolutionsChecks } from 'cdk-nag'
import { Aspects } from 'aws-cdk-lib';

const app = new cdk.App();

//Aspects.of(app).add(new AwsSolutionsChecks({verbose: true}));

new PipelineStack(app, 'PipelineStack', {
    env: {
        region: "us-east-1"
    }
});

app.synth();

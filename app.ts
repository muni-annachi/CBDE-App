#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from './pipelines_webinar/pipeline_stack';

const app = new cdk.App();

new PipelineStack(app, 'PipelineStack', {
    env: {
        region: "us-east-1"
    }
});

app.synth();

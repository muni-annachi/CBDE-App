import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebServiceStage } from './webservice_stage';
import {CodeBuildStep, CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from "aws-cdk-lib/pipelines";
import * as  s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'


export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const cfnVersionsBucket = new s3.Bucket(this, 'Bucket', {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          versioned: true,
          removalPolicy: cdk.RemovalPolicy.RETAIN,
        });

        const result = cfnVersionsBucket.addToResourcePolicy(new iam.PolicyStatement({
          actions: ['s3:*'],
          resources: [`${cfnVersionsBucket.bucketArn}/*`],
          principals: [new iam.ArnPrincipal(`arn:aws:iam::${this.account}:role/Admin`), 
          new iam.ArnPrincipal(`arn:aws:iam::${this.account}:role/PipelineStack-PipelineTestCopycurrentstackCopycurr-OZ1N1GC7KF9V`)]
        }));

      // Pipeline for Zero Downtime deployments

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'do-not-delete-CDK-Infra-Pipeline',
            crossAccountKeys: true,
            synth: new ShellStep('SynthStep', {
                    input: 
                    CodePipelineSource.connection('muni-annachi/CBDE-App','main', {
                        connectionArn: 'arn:aws:codestar-connections:us-east-1:786424842112:connection/959ee911-2718-465a-865f-effebf701291',
                      }),
                    installCommands: [
                        'npm install -g aws-cdk'
                    ],
                    commands: [
                        'aws --version',
                        'npm ci',
                        'npm run build',
                        'npx cdk synth',
                        'npx cdk synth > template.yaml',
                        'cat template.yaml',
                        `aws s3 cp template.yaml s3://${cfnVersionsBucket.bucketName}/`,
                    ],

                }
            )
        });

        // Test Env deployment
        
        const testApp = new WebServiceStage(this, 'Test');
        const preProdStage = pipeline.addStage(testApp, {
            /*post: [
                new ShellStep('HitEndpoint', {
                  envFromCfnOutputs: {
                    // Make the load balancer address available as $URL inside the commands
                    URL: testApp.urlOutput,
                  },
                  commands: ['curl -Ssf $URL'],
                }),
              ]*/
        });
        const serviceUrl = testApp.urlOutput;
        preProdStage.stacks[0].

        preProdStage.addPre(new ShellStep('Copy current stack', {
          installCommands: [
            'npm install -g aws-cdk'
        ],
          commands: [
              'npx cdk synth > template.yaml',
              `aws s3 cp current-template.yaml s3://${cfnVersionsBucket.bucketName}/`,
          ],
        }));
       
        preProdStage.addPost(new ShellStep('Integration Test', {
            envFromCfnOutputs: {
              // Make the load balancer address available as $URL inside the commands
              SERVICE_URL: testApp.urlOutput,
            },
            commands: [
                'npm install',
                'npm run build',
                'npm run integration'
            ],
          }));

        // Prod
        //
         
        const prodApp = new WebServiceStage(this, 'Prod');
        const prodStage = pipeline.addStage(prodApp , {
            pre: [
                new ManualApprovalStep('Promote to PROD ', {
                    comment : " Pls approve to PROD"
                })
              ],
              stackSteps : [

              ]
        });
    }
}

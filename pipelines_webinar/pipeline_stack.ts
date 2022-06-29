import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebServiceStage } from './webservice_stage';
import {CodeBuildStep, CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from "aws-cdk-lib/pipelines";


export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

      
       /* const sourceAction = new cpa.GitHubSourceAction({
            actionName: 'GitHub',
            output: sourceArtifact,
            oauthToken: SecretValue.secretsManager('github-token'),
            owner: 'OWNER',
            repo: 'REPO',
        });

        const synthAction = pipelines.SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build && npm test',
        });

        const pipeline1 = new pipelines.CdkPipeline(this, 'Pipeline', {
            cloudAssemblyArtifact,
            sourceAction,
            synthAction
        });*/

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
                        'pwd ',
                        'npm ci',
                        'npm run build',
                        'npx cdk synth'
                    ]
                }
            )
        });

        // Test Env deployment
        
        const testApp = new WebServiceStage(this, 'Test');
        const preProdStage = pipeline.addStage(testApp, {
            pre: [
                new ManualApprovalStep('Promote to Test ', {
                    comment : " Pls approve to Test"
                })
              ],
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
              ]
        });
    }
}

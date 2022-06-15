import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebServiceStage } from './webservice_stage';
import {CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";


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
            synth: new CodeBuildStep('SynthStep', {
                    input: 
                    CodePipelineSource.connection('muni-annachi/CBDE-App','main', {
                        connectionArn: 'arn:aws:codestar-connections:us-east-1:786424842112:connection/959ee911-2718-465a-865f-effebf701291',
                      }),
                    /*installCommands: [
                        'npm install -g aws-cdk'
                    ],*/
                    commands: [
                        'npm ci',
                        'npm run build',
                        'npm install',
                        'npm cdk synth'
                    ]
                }
            )
        });

        // Pre-prod
        //
       /* const preProdApp = new WebServiceStage(this, 'Pre-Prod');
        const preProdStage = pipeline.addApplicationStage(preProdApp);
        const serviceUrl = pipeline.stackOutput(preProdApp.urlOutput);

        preProdStage.addActions(new pipelines.ShellScriptAction({
            actionName: 'IntegrationTests',
            runOrder: preProdStage.nextSequentialRunOrder(),
            additionalArtifacts: [
                sourceArtifact
            ],
            commands: [
                'npm install',
                'npm run build',
                'npm run integration'
            ],
            useOutputs: {
                SERVICE_URL: serviceUrl
            }
        }));

        // Prod
        //
        const prodApp = new WebServiceStage(this, 'Prod');
        const prodStage = pipeline.addApplicationStage(prodApp);
        */
    }
}

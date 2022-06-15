"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class PipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: 'do-not-delete-CDK-Infra-Pipeline',
            synth: new pipelines_1.CodeBuildStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.connection('muni-annachi/CBDE-App', 'main', {
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
            })
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
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmVfc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZV9zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFHbkMscURBQWlHO0FBR2pHLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFHekI7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQWtCTTtRQUVMLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2hELFlBQVksRUFBRSxrQ0FBa0M7WUFDaEQsS0FBSyxFQUFFLElBQUkseUJBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLEtBQUssRUFDTCw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUMsTUFBTSxFQUFFO29CQUMxRCxhQUFhLEVBQUUscUdBQXFHO2lCQUNySCxDQUFDO2dCQUNKOztvQkFFSTtnQkFDSixRQUFRLEVBQUU7b0JBQ04sUUFBUTtvQkFDUixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsZUFBZTtpQkFDbEI7YUFDSixDQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsV0FBVztRQUNYLEVBQUU7UUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBd0JHO0lBQ04sQ0FBQztDQUNKO0FBekVELHNDQXlFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IFdlYlNlcnZpY2VTdGFnZSB9IGZyb20gJy4vd2Vic2VydmljZV9zdGFnZSc7XG5pbXBvcnQge0NvZGVCdWlsZFN0ZXAsIENvZGVQaXBlbGluZSwgQ29kZVBpcGVsaW5lU291cmNlLCBTaGVsbFN0ZXB9IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcblxuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgXG4gICAgICAgLyogY29uc3Qgc291cmNlQWN0aW9uID0gbmV3IGNwYS5HaXRIdWJTb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0dpdEh1YicsXG4gICAgICAgICAgICBvdXRwdXQ6IHNvdXJjZUFydGlmYWN0LFxuICAgICAgICAgICAgb2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi10b2tlbicpLFxuICAgICAgICAgICAgb3duZXI6ICdPV05FUicsXG4gICAgICAgICAgICByZXBvOiAnUkVQTycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN5bnRoQWN0aW9uID0gcGlwZWxpbmVzLlNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuICAgICAgICAgICAgc291cmNlQXJ0aWZhY3QsXG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG4gICAgICAgICAgICBidWlsZENvbW1hbmQ6ICducG0gcnVuIGJ1aWxkICYmIG5wbSB0ZXN0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGlwZWxpbmUxID0gbmV3IHBpcGVsaW5lcy5DZGtQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG4gICAgICAgICAgICBzb3VyY2VBY3Rpb24sXG4gICAgICAgICAgICBzeW50aEFjdGlvblxuICAgICAgICB9KTsqL1xuXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENvZGVQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdkby1ub3QtZGVsZXRlLUNESy1JbmZyYS1QaXBlbGluZScsXG4gICAgICAgICAgICBzeW50aDogbmV3IENvZGVCdWlsZFN0ZXAoJ1N5bnRoU3RlcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFxuICAgICAgICAgICAgICAgICAgICBDb2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbignbXVuaS1hbm5hY2hpL0NCREUtQXBwJywnbWFpbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bcm46ICdhcm46YXdzOmNvZGVzdGFyLWNvbm5lY3Rpb25zOnVzLWVhc3QtMTo3ODY0MjQ4NDIxMTI6Y29ubmVjdGlvbi85NTllZTkxMS0yNzE4LTQ2NWEtODY1Zi1lZmZlYmY3MDEyOTEnLFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAvKmluc3RhbGxDb21tYW5kczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBpbnN0YWxsIC1nIGF3cy1jZGsnXG4gICAgICAgICAgICAgICAgICAgIF0sKi9cbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gY2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBydW4gYnVpbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBpbnN0YWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gY2RrIHN5bnRoJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQcmUtcHJvZFxuICAgICAgICAvL1xuICAgICAgIC8qIGNvbnN0IHByZVByb2RBcHAgPSBuZXcgV2ViU2VydmljZVN0YWdlKHRoaXMsICdQcmUtUHJvZCcpO1xuICAgICAgICBjb25zdCBwcmVQcm9kU3RhZ2UgPSBwaXBlbGluZS5hZGRBcHBsaWNhdGlvblN0YWdlKHByZVByb2RBcHApO1xuICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gcGlwZWxpbmUuc3RhY2tPdXRwdXQocHJlUHJvZEFwcC51cmxPdXRwdXQpO1xuXG4gICAgICAgIHByZVByb2RTdGFnZS5hZGRBY3Rpb25zKG5ldyBwaXBlbGluZXMuU2hlbGxTY3JpcHRBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0ludGVncmF0aW9uVGVzdHMnLFxuICAgICAgICAgICAgcnVuT3JkZXI6IHByZVByb2RTdGFnZS5uZXh0U2VxdWVudGlhbFJ1bk9yZGVyKCksXG4gICAgICAgICAgICBhZGRpdGlvbmFsQXJ0aWZhY3RzOiBbXG4gICAgICAgICAgICAgICAgc291cmNlQXJ0aWZhY3RcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgICducG0gaW5zdGFsbCcsXG4gICAgICAgICAgICAgICAgJ25wbSBydW4gYnVpbGQnLFxuICAgICAgICAgICAgICAgICducG0gcnVuIGludGVncmF0aW9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICBTRVJWSUNFX1VSTDogc2VydmljZVVybFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gUHJvZFxuICAgICAgICAvL1xuICAgICAgICBjb25zdCBwcm9kQXBwID0gbmV3IFdlYlNlcnZpY2VTdGFnZSh0aGlzLCAnUHJvZCcpO1xuICAgICAgICBjb25zdCBwcm9kU3RhZ2UgPSBwaXBlbGluZS5hZGRBcHBsaWNhdGlvblN0YWdlKHByb2RBcHApO1xuICAgICAgICAqL1xuICAgIH1cbn1cbiJdfQ==
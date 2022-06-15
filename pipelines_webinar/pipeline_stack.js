"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const webservice_stage_1 = require("./webservice_stage");
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
            synth: new pipelines_1.ShellStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.connection('muni-annachi/CBDE-App', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:us-east-1:786424842112:connection/959ee911-2718-465a-865f-effebf701291',
                }),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        });
        // Test Env deployment
        const testApp = new webservice_stage_1.WebServiceStage(this, 'Test');
        const preProdStage = pipeline.addStage(testApp, {
            post: [
                new pipelines_1.ShellStep('HitEndpoint', {
                    envFromCfnOutputs: {
                        // Make the load balancer address available as $URL inside the commands
                        URL: testApp.urlOutput,
                    },
                    commands: ['curl -Ssf $URL'],
                }),
            ],
        });
        //const serviceUrl = pipeline. (preProdApp.urlOutput);
        /*
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmVfc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZV9zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMseURBQXFEO0FBQ3JELHFEQUFpRztBQUdqRyxNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FrQk07UUFFTCxNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxZQUFZLEVBQUUsa0NBQWtDO1lBQ2hELEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsV0FBVyxFQUFFO2dCQUMxQixLQUFLLEVBQ0wsOEJBQWtCLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFDLE1BQU0sRUFBRTtvQkFDMUQsYUFBYSxFQUFFLHFHQUFxRztpQkFDckgsQ0FBQztnQkFDSixlQUFlLEVBQUU7b0JBQ2Isd0JBQXdCO2lCQUMzQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ04sUUFBUTtvQkFDUixlQUFlO29CQUNmLGVBQWU7aUJBQ2xCO2FBQ0osQ0FDSjtTQUNKLENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUV0QixNQUFNLE9BQU8sR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzVDLElBQUksRUFBRTtnQkFDRixJQUFJLHFCQUFTLENBQUMsYUFBYSxFQUFFO29CQUMzQixpQkFBaUIsRUFBRTt3QkFDakIsdUVBQXVFO3dCQUN2RSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVM7cUJBQ3ZCO29CQUNELFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM3QixDQUFDO2FBQ0g7U0FDTixDQUFDLENBQUM7UUFDSCxzREFBc0Q7UUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFCRTtJQUNOLENBQUM7Q0FDSjtBQWxGRCxzQ0FrRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlU3RhZ2UgfSBmcm9tICcuL3dlYnNlcnZpY2Vfc3RhZ2UnO1xuaW1wb3J0IHtDb2RlQnVpbGRTdGVwLCBDb2RlUGlwZWxpbmUsIENvZGVQaXBlbGluZVNvdXJjZSwgU2hlbGxTdGVwfSBmcm9tIFwiYXdzLWNkay1saWIvcGlwZWxpbmVzXCI7XG5cblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgIFxuICAgICAgIC8qIGNvbnN0IHNvdXJjZUFjdGlvbiA9IG5ldyBjcGEuR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdHaXRIdWInLFxuICAgICAgICAgICAgb3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4nKSxcbiAgICAgICAgICAgIG93bmVyOiAnT1dORVInLFxuICAgICAgICAgICAgcmVwbzogJ1JFUE8nLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzeW50aEFjdGlvbiA9IHBpcGVsaW5lcy5TaW1wbGVTeW50aEFjdGlvbi5zdGFuZGFyZE5wbVN5bnRoKHtcbiAgICAgICAgICAgIHNvdXJjZUFydGlmYWN0LFxuICAgICAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICAgICAgYnVpbGRDb21tYW5kOiAnbnBtIHJ1biBidWlsZCAmJiBucG0gdGVzdCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lMSA9IG5ldyBwaXBlbGluZXMuQ2RrUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICAgICAgc291cmNlQWN0aW9uLFxuICAgICAgICAgICAgc3ludGhBY3Rpb25cbiAgICAgICAgfSk7Ki9cblxuICAgICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgICAgICAgcGlwZWxpbmVOYW1lOiAnZG8tbm90LWRlbGV0ZS1DREstSW5mcmEtUGlwZWxpbmUnLFxuICAgICAgICAgICAgc3ludGg6IG5ldyBTaGVsbFN0ZXAoJ1N5bnRoU3RlcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFxuICAgICAgICAgICAgICAgICAgICBDb2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbignbXVuaS1hbm5hY2hpL0NCREUtQXBwJywnbWFpbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bcm46ICdhcm46YXdzOmNvZGVzdGFyLWNvbm5lY3Rpb25zOnVzLWVhc3QtMTo3ODY0MjQ4NDIxMTI6Y29ubmVjdGlvbi85NTllZTkxMS0yNzE4LTQ2NWEtODY1Zi1lZmZlYmY3MDEyOTEnLFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YWxsQ29tbWFuZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gaW5zdGFsbCAtZyBhd3MtY2RrJ1xuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBjaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnBtIHJ1biBidWlsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnB4IGNkayBzeW50aCdcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVGVzdCBFbnYgZGVwbG95bWVudFxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGVzdEFwcCA9IG5ldyBXZWJTZXJ2aWNlU3RhZ2UodGhpcywgJ1Rlc3QnKTtcbiAgICAgICAgY29uc3QgcHJlUHJvZFN0YWdlID0gcGlwZWxpbmUuYWRkU3RhZ2UodGVzdEFwcCwge1xuICAgICAgICAgICAgcG9zdDogW1xuICAgICAgICAgICAgICAgIG5ldyBTaGVsbFN0ZXAoJ0hpdEVuZHBvaW50Jywge1xuICAgICAgICAgICAgICAgICAgZW52RnJvbUNmbk91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgbG9hZCBiYWxhbmNlciBhZGRyZXNzIGF2YWlsYWJsZSBhcyAkVVJMIGluc2lkZSB0aGUgY29tbWFuZHNcbiAgICAgICAgICAgICAgICAgICAgVVJMOiB0ZXN0QXBwLnVybE91dHB1dCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBjb21tYW5kczogWydjdXJsIC1Tc2YgJFVSTCddLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICAgICAgLy9jb25zdCBzZXJ2aWNlVXJsID0gcGlwZWxpbmUuIChwcmVQcm9kQXBwLnVybE91dHB1dCk7XG4gICAgICAgIC8qXG4gICAgICAgIHByZVByb2RTdGFnZS5hZGRBY3Rpb25zKG5ldyBwaXBlbGluZXMuU2hlbGxTY3JpcHRBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0ludGVncmF0aW9uVGVzdHMnLFxuICAgICAgICAgICAgcnVuT3JkZXI6IHByZVByb2RTdGFnZS5uZXh0U2VxdWVudGlhbFJ1bk9yZGVyKCksXG4gICAgICAgICAgICBhZGRpdGlvbmFsQXJ0aWZhY3RzOiBbXG4gICAgICAgICAgICAgICAgc291cmNlQXJ0aWZhY3RcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgICducG0gaW5zdGFsbCcsXG4gICAgICAgICAgICAgICAgJ25wbSBydW4gYnVpbGQnLFxuICAgICAgICAgICAgICAgICducG0gcnVuIGludGVncmF0aW9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICBTRVJWSUNFX1VSTDogc2VydmljZVVybFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gUHJvZFxuICAgICAgICAvL1xuICAgICAgICBjb25zdCBwcm9kQXBwID0gbmV3IFdlYlNlcnZpY2VTdGFnZSh0aGlzLCAnUHJvZCcpO1xuICAgICAgICBjb25zdCBwcm9kU3RhZ2UgPSBwaXBlbGluZS5hZGRBcHBsaWNhdGlvblN0YWdlKHByb2RBcHApO1xuICAgICAgICAqL1xuICAgIH1cbn1cbiJdfQ==
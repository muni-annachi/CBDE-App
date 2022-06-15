"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesWebinarStack = void 0;
const path = require("path");
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const codedeploy = require("aws-cdk-lib/aws-codedeploy");
const cloudwatch = require("aws-cdk-lib/aws-cloudwatch");
class PipelinesWebinarStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const handler = new lambda.Function(this, 'Handler', {
            code: new lambda.AssetCode(path.resolve(__dirname, 'lambda')),
            handler: 'handler.handler',
            runtime: lambda.Runtime.NODEJS_10_X,
        });
        const alias = new lambda.Alias(this, 'x', {
            aliasName: 'Current',
            version: handler.currentVersion
        });
        const api = new apigw.LambdaRestApi(this, 'Gateway', {
            description: 'Endpoint for a simple Lambda-powered web service',
            handler: alias,
        });
        const apiGateway5xx = new cloudwatch.Metric({
            metricName: '5XXError',
            namespace: 'AWS/ApiGateway',
            /*dimensions: {
              ApiName: 'Gateway'
            },*/
            statistic: 'Sum',
            period: cdk.Duration.minutes(1)
        });
        const failureAlarm = new cloudwatch.Alarm(this, 'RollbackAlarm', {
            metric: apiGateway5xx,
            threshold: 1,
            evaluationPeriods: 1,
        });
        new codedeploy.LambdaDeploymentGroup(this, 'DeploymentGroup ', {
            alias,
            deploymentConfig: codedeploy.LambdaDeploymentConfig.CANARY_10PERCENT_10MINUTES,
            alarms: [
                failureAlarm
            ]
        });
        this.urlOutput = new cdk.CfnOutput(this, 'url', { value: api.url });
    }
}
exports.PipelinesWebinarStack = PipelinesWebinarStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmVzX3dlYmluYXJfc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZXNfd2ViaW5hcl9zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBOEI7QUFDOUIsbUNBQW1DO0FBR25DLGlEQUFnRDtBQUNoRCxvREFBbUQ7QUFDbkQseURBQXdEO0FBQ3hELHlEQUF5RDtBQUV6RCxNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBR2xELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkQsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RCxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7U0FDcEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDeEMsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjO1NBQ2hDLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25ELFdBQVcsRUFBRSxrREFBa0Q7WUFDL0QsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDMUMsVUFBVSxFQUFFLFVBQVU7WUFDdEIsU0FBUyxFQUFFLGdCQUFnQjtZQUMzQjs7Z0JBRUk7WUFDSixTQUFTLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQy9ELE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFNBQVMsRUFBRSxDQUFDO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDN0QsS0FBSztZQUNMLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQywwQkFBMEI7WUFDOUUsTUFBTSxFQUFFO2dCQUNOLFlBQVk7YUFDYjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBL0NELHNEQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSdcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5J1xuaW1wb3J0ICogYXMgY29kZWRlcGxveSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZWRlcGxveSdcbmltcG9ydCAqIGFzIGNsb3Vkd2F0Y2ggZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2gnO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVzV2ViaW5hclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgdXJsT3V0cHV0OiBjZGsuQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIYW5kbGVyJywge1xuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xhbWJkYScpKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyLmhhbmRsZXInLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGlhcyA9IG5ldyBsYW1iZGEuQWxpYXModGhpcywgJ3gnLCB7XG4gICAgICBhbGlhc05hbWU6ICdDdXJyZW50JyxcbiAgICAgIHZlcnNpb246IGhhbmRsZXIuY3VycmVudFZlcnNpb25cbiAgICB9KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsICdHYXRld2F5Jywge1xuICAgICAgZGVzY3JpcHRpb246ICdFbmRwb2ludCBmb3IgYSBzaW1wbGUgTGFtYmRhLXBvd2VyZWQgd2ViIHNlcnZpY2UnLFxuICAgICAgaGFuZGxlcjogYWxpYXMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlHYXRld2F5NXh4ID0gbmV3IGNsb3Vkd2F0Y2guTWV0cmljKHtcbiAgICAgIG1ldHJpY05hbWU6ICc1WFhFcnJvcicsXG4gICAgICBuYW1lc3BhY2U6ICdBV1MvQXBpR2F0ZXdheScsXG4gICAgICAvKmRpbWVuc2lvbnM6IHtcbiAgICAgICAgQXBpTmFtZTogJ0dhdGV3YXknXG4gICAgICB9LCovXG4gICAgICBzdGF0aXN0aWM6ICdTdW0nLFxuICAgICAgcGVyaW9kOiBjZGsuRHVyYXRpb24ubWludXRlcygxKVxuICAgIH0pO1xuICAgIGNvbnN0IGZhaWx1cmVBbGFybSA9IG5ldyBjbG91ZHdhdGNoLkFsYXJtKHRoaXMsICdSb2xsYmFja0FsYXJtJywge1xuICAgICAgbWV0cmljOiBhcGlHYXRld2F5NXh4LFxuICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgfSk7XG5cbiAgICBuZXcgY29kZWRlcGxveS5MYW1iZGFEZXBsb3ltZW50R3JvdXAodGhpcywgJ0RlcGxveW1lbnRHcm91cCAnLCB7XG4gICAgICBhbGlhcyxcbiAgICAgIGRlcGxveW1lbnRDb25maWc6IGNvZGVkZXBsb3kuTGFtYmRhRGVwbG95bWVudENvbmZpZy5DQU5BUllfMTBQRVJDRU5UXzEwTUlOVVRFUyxcbiAgICAgIGFsYXJtczogW1xuICAgICAgICBmYWlsdXJlQWxhcm1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMudXJsT3V0cHV0ID0gbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3VybCcsIHsgdmFsdWU6IGFwaS51cmwgfSk7XG4gIH1cbn1cbiJdfQ==
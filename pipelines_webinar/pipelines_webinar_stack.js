"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesWebinarStack = void 0;
const path = require("path");
const cdk = require("aws-cdk-lib");
const core_1 = require("aws-cdk-lib/core");
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
            period: core_1.Duration.minutes(1)
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
        this.urlOutput = new core_1.CfnOutput(this, 'url', { value: api.url });
    }
}
exports.PipelinesWebinarStack = PipelinesWebinarStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmVzX3dlYmluYXJfc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZXNfd2ViaW5hcl9zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBOEI7QUFDOUIsbUNBQW1DO0FBR25DLDJDQUEwRTtBQUMxRSxpREFBZ0Q7QUFDaEQsb0RBQW1EO0FBQ25ELHlEQUF3RDtBQUN4RCx5REFBeUQ7QUFFekQsTUFBYSxxQkFBc0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUdsRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25ELElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0QsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1NBQ3BDLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ3hDLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYztTQUNoQyxDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNuRCxXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQzFDLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0I7O2dCQUVJO1lBQ0osU0FBUyxFQUFFLEtBQUs7WUFDaEIsTUFBTSxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQy9ELE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFNBQVMsRUFBRSxDQUFDO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDN0QsS0FBSztZQUNMLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQywwQkFBMEI7WUFDOUUsTUFBTSxFQUFFO2dCQUNOLFlBQVk7YUFDYjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGO0FBL0NELHNEQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbXBvcnQgeyBDZm5PdXRwdXQsIER1cmF0aW9uLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnXG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSdcbmltcG9ydCAqIGFzIGNvZGVkZXBsb3kgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVkZXBsb3knXG5pbXBvcnQgKiBhcyBjbG91ZHdhdGNoIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoJztcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lc1dlYmluYXJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHVybE91dHB1dDogQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIYW5kbGVyJywge1xuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xhbWJkYScpKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyLmhhbmRsZXInLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGlhcyA9IG5ldyBsYW1iZGEuQWxpYXModGhpcywgJ3gnLCB7XG4gICAgICBhbGlhc05hbWU6ICdDdXJyZW50JyxcbiAgICAgIHZlcnNpb246IGhhbmRsZXIuY3VycmVudFZlcnNpb25cbiAgICB9KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsICdHYXRld2F5Jywge1xuICAgICAgZGVzY3JpcHRpb246ICdFbmRwb2ludCBmb3IgYSBzaW1wbGUgTGFtYmRhLXBvd2VyZWQgd2ViIHNlcnZpY2UnLFxuICAgICAgaGFuZGxlcjogYWxpYXMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlHYXRld2F5NXh4ID0gbmV3IGNsb3Vkd2F0Y2guTWV0cmljKHtcbiAgICAgIG1ldHJpY05hbWU6ICc1WFhFcnJvcicsXG4gICAgICBuYW1lc3BhY2U6ICdBV1MvQXBpR2F0ZXdheScsXG4gICAgICAvKmRpbWVuc2lvbnM6IHtcbiAgICAgICAgQXBpTmFtZTogJ0dhdGV3YXknXG4gICAgICB9LCovXG4gICAgICBzdGF0aXN0aWM6ICdTdW0nLFxuICAgICAgcGVyaW9kOiBEdXJhdGlvbi5taW51dGVzKDEpXG4gICAgfSk7XG4gICAgY29uc3QgZmFpbHVyZUFsYXJtID0gbmV3IGNsb3Vkd2F0Y2guQWxhcm0odGhpcywgJ1JvbGxiYWNrQWxhcm0nLCB7XG4gICAgICBtZXRyaWM6IGFwaUdhdGV3YXk1eHgsXG4gICAgICB0aHJlc2hvbGQ6IDEsXG4gICAgICBldmFsdWF0aW9uUGVyaW9kczogMSxcbiAgICB9KTtcblxuICAgIG5ldyBjb2RlZGVwbG95LkxhbWJkYURlcGxveW1lbnRHcm91cCh0aGlzLCAnRGVwbG95bWVudEdyb3VwICcsIHtcbiAgICAgIGFsaWFzLFxuICAgICAgZGVwbG95bWVudENvbmZpZzogY29kZWRlcGxveS5MYW1iZGFEZXBsb3ltZW50Q29uZmlnLkNBTkFSWV8xMFBFUkNFTlRfMTBNSU5VVEVTLFxuICAgICAgYWxhcm1zOiBbXG4gICAgICAgIGZhaWx1cmVBbGFybVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgdGhpcy51cmxPdXRwdXQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsICd1cmwnLCB7IHZhbHVlOiBhcGkudXJsIH0pO1xuICB9XG59XG4iXX0=
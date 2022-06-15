"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceStage = void 0;
const pipelines_webinar_stack_1 = require("./pipelines_webinar_stack");
const cdk = require("aws-cdk-lib");
class WebServiceStage extends cdk.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        const service = new pipelines_webinar_stack_1.PipelinesWebinarStack(this, 'WebService', {
            tags: {
                Application: 'WebService',
                Environment: id
            }
        });
        this.urlOutput = service.urlOutput;
    }
}
exports.WebServiceStage = WebServiceStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZV9zdGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnNlcnZpY2Vfc3RhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUVBQWtFO0FBQ2xFLG1DQUFtQztBQUduQyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFHNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLCtDQUFxQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDNUQsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixXQUFXLEVBQUUsRUFBRTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtJQUNwQyxDQUFDO0NBQ0Y7QUFmRCwwQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgU3RhY2tQcm9wcywgU3RhZ2UgfSBmcm9tICdhd3MtY2RrLWxpYi9jb3JlJztcbmltcG9ydCB7IFBpcGVsaW5lc1dlYmluYXJTdGFjayB9IGZyb20gJy4vcGlwZWxpbmVzX3dlYmluYXJfc3RhY2snO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZVN0YWdlIGV4dGVuZHMgY2RrLlN0YWdlIHtcbiAgdXJsT3V0cHV0OiBDZm5PdXRwdXQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBQaXBlbGluZXNXZWJpbmFyU3RhY2sodGhpcywgJ1dlYlNlcnZpY2UnLCB7XG4gICAgICB0YWdzOiB7XG4gICAgICAgIEFwcGxpY2F0aW9uOiAnV2ViU2VydmljZScsXG4gICAgICAgIEVudmlyb25tZW50OiBpZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy51cmxPdXRwdXQgPSBzZXJ2aWNlLnVybE91dHB1dFxuICB9XG59XG4iXX0=
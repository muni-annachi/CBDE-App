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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZV9zdGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnNlcnZpY2Vfc3RhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUVBQWtFO0FBQ2xFLG1DQUFtQztBQUduQyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFHNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLCtDQUFxQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDNUQsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixXQUFXLEVBQUUsRUFBRTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtJQUNwQyxDQUFDO0NBQ0Y7QUFmRCwwQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVsaW5lc1dlYmluYXJTdGFjayB9IGZyb20gJy4vcGlwZWxpbmVzX3dlYmluYXJfc3RhY2snO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZVN0YWdlIGV4dGVuZHMgY2RrLlN0YWdlIHtcbiAgdXJsT3V0cHV0OiBjZGsuQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgUGlwZWxpbmVzV2ViaW5hclN0YWNrKHRoaXMsICdXZWJTZXJ2aWNlJywge1xuICAgICAgdGFnczoge1xuICAgICAgICBBcHBsaWNhdGlvbjogJ1dlYlNlcnZpY2UnLFxuICAgICAgICBFbnZpcm9ubWVudDogaWRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXJsT3V0cHV0ID0gc2VydmljZS51cmxPdXRwdXRcbiAgfVxufVxuIl19
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const pipeline_stack_1 = require("./pipelines_webinar/pipeline_stack");
const app = new cdk.App();
new pipeline_stack_1.PipelineStack(app, 'PipelineStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsdUVBQW1FO0FBRW5FLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUksOEJBQWEsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFeEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFBpcGVsaW5lU3RhY2sgfSBmcm9tICcuL3BpcGVsaW5lc193ZWJpbmFyL3BpcGVsaW5lX3N0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxubmV3IFBpcGVsaW5lU3RhY2soYXBwLCAnUGlwZWxpbmVTdGFjaycpO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==
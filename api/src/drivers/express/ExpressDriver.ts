import express from 'express';
import * as bparse from 'body-parser';
import cors = require("cors");
import cookieParser = require("cookie-parser"); 
import { ExpressRouteDriver } from './ExpressRouteDriver';
export class ExpressDriver{
   static app:any = express();
    
   static buildDriver(){
        this.app.use(bparse.json());
        this.app.use(bparse.urlencoded({extended: true}));
        this.app.use(cors({origin: true, credentials: true}));
        this.app.use(cookieParser());
        this.app.use('trust proxy', true);
        this.app.use(ExpressRouteDriver.buildRouter());
        return this.app;
    }
}
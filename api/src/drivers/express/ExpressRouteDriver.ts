import {Router, Request, Response} from 'express';
const version = require("../../../package.json").version;

export class ExpressRouteDriver{
    static router = Router();

    static buildRouter(){
        this.router.get('/', (req,res,next)=>{
            res.json({Message: `Welcome to the Drivetime API version: ${version}`})
        })
        this.initUserRoutes();
        return this.router
    }

    static initUserRoutes(){
        this.router.get('/user', (req,res)=>{
            res.json({Message: 'Welcome to User service.'})
        })
    }
}
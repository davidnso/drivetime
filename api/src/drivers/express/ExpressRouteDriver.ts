import { Router, Request, Response, NextFunction } from "express";
import * as handler from "../../handlers/BusinessLogicHandler";
const version = require("../../../package.json").version;


interface httpParams{
    req:Request,
    res: Response,
    next: NextFunction,
}
export class ExpressRouteDriver {
  static router = Router();

  static buildRouter() {
    this.router.get("/", (req, res, next) => {
      res.json({ Message: `Welcome to the Drivetime API version: ${version}` });
    });
    this.initUserRoutes();
    this.initPurchaseRoutes();
    this.initReservationRoutes();
    this.initVehicleRoutes();
    return this.router;
  }

  static initUserRoutes() {
    this.router.get("/user", (req, res) => {
      res.json({ Message: "Welcome to User service." });
    });
    this.router.post("/user/register", createNewUser);
    this.router.get("/user/login", login);
  }

  static initReservationRoutes() {
    this.router.get("/reseve", (req, res) => {
      res.json({ Message: "Base route to reserve a vehicle." });
    });
    this.router.post("/reserve/:id", (req, res) => {});
  }

  static initPurchaseRoutes() {
    this.router.get("/buy", (req, res) => {
      //This route should return all buy orders for privileged users
      res.json({ Message: "Welcome to the buy service" });
    });
    this.router.get("/buy/:id", (req, res) => {});
  }

  static initVehicleRoutes() {
    this.router.get("/vehicles", searchVehicles);
  }
}

async function createNewUser(req: Request, res: Response, next: NextFunction) {
  const userInformation = req.body.user;
  try {
    if (userInformation) {
      //call interactor function
      handler.createUserAccount({ user: userInformation });
      res.status(200).json({ confirmation: "User Successfully created" });
    }
  } catch (err) {
    res.status(404).json({ error: "Registration could not be completed." });
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const loginInfo = req.body.credentials;

  try {
    //call interactor function to validate user
    res.status(200).json({ confirmation: "Login Successful" });
  } catch (err) {
    res.status(404).send({ error: "Invalid Credentials" });
  }
}

async function reserve(req: Request, res: Response, next: NextFunction) {
  const vehicleId = req.params.id;
}


async function searchVehicles(req: Request,res:Response,next:NextFunction){
    try {
        const query = req.query.type;
        handler.fetchVehicles(function(err:any, response:any){
            if(err){
                console.log(err);
            }
            if(response){
                res.status(200).send(response);
            }
        }, query);
      } catch (err) {
        res.status(404).json({ Error: "vehicles not found" });
      }
}

async function findVehicleById(params:httpParams){
    
}
import * as http from "http";
import { ExpressDriver } from './drivers/express/ExpressDriver';

const app = ExpressDriver.buildDriver();

const server = http.createServer(app);

if(server){
    server.listen(4300);
    console.log('Drivetime api running on port 4300')
}


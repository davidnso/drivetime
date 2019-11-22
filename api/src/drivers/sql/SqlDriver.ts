import { User } from "../../entity/index";
const sql = require("mysql");

const CONFIG = {
  user: "test",
  password: "drivetime",
  server: "localhost",
  database: "cardealer",
  port: 3306
};
export class SqlDriver {
  db: any;
  constructor() {
    this.initdb().then(pool => {
      this.db = pool;
    });
  }

  async initdb() {
    try {
      let connection = sql.createConnection(CONFIG);
      connection.connect();
      return connection;
    } catch (err) {
      console.log(err);
    }
  }
  createUser(user: User, callback: Function) {
    this.db.query(
      `INSERT INTO cardealer.person(Fname,Lname,Ssn,Bdate,Address)
    VALUES(${user.Fname} , ${user.Lname} ,${user.ssn},${user.dob} ,${user.Address});`,
      (err: any, result: any, fields: any) => {
        if(err){
          throw new Error(err);
        }
        if(result){
          callback(null, result);
        }
      }
    );
  }

  fetchAllVehicles(callback: Function, type: string) {
    let formattedResultSet: any[] = [];
    if (!type) {
      formattedResultSet = this.db.query(
        "select * from cardealer.vehicle",
        (err: any, resultSet: any, fields: any) => {
          if (err) {
            throw new Error(err);
          }
          if (resultSet) {
            callback(null,resultSet);
          }
        }
      );
    } else if (type !== undefined) {
      formattedResultSet = this.db.query(
        `select * from  cardealer.${type} su inner join cardealer.vehicle vh on su.car_ID = vh.Vehicle_ID;`,
        (err: any, resultSet: any, fields: any) => {
          if (err) {
            throw new Error(err);
          }
          if (resultSet) {
            callback(null, resultSet);
          }
        }
      );
    }
    return formattedResultSet;
  }

  placeBuyOrder(callback: Function, vehicleId: string, requesterId: string) {
    this.db.query(
      `update cardealer.vehicle vh set BuyStatus =  'Y' where 
    vh.Vehicle_ID = '${vehicleId}';`,
      function(err: any, result: any, fields: any) {
        if (err) {
          throw new Error(err);
        }
      }
    );
    this.db.query(
      `INSERT INTO cardealer.ordervehicle (Cust_ID, OrderCar_ID) VALUES ('${requesterId}', ${vehicleId});
    select * from cardealer.vehicle vh inner join cardealer.ordervehicle ov on vh.Vehicle_ID = ov.OrderCar_ID;`,
      function(err: any, result: any, fields: any) {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }
  fetchAllCustomers(callback:Function){
    this.db.query(`select * from cardealer.person inner join cardealer.customer on person.ssn = customer.Cust_ID;
    `, function(err: any, result:any, fields: any){
      if(err){
        throw new Error(err);
      }
      if(result){
        return callback(null, result);
      }
    })
  }
}



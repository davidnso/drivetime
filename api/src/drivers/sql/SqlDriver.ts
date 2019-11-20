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
  createUser(user: User) {
    this.db.input("input_parameter", user);
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
            callback(null, resultSet);
          }
        }
      );
    } else if (type!==undefined) {
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
}

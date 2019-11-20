import { User } from "../entity";
import { SqlDriver } from "../drivers/sql/SqlDriver";

interface ReservationInfo {
  vehicleId: string;
  customerId: string;
  date: string;
  department: string;
  insuranceId: string;
  active: string;
  description: string;
}

interface BuyInfo extends Partial<ReservationInfo> {}
//pass config into datastore.
const dataStore = new SqlDriver();

export async function fetchVehicles( callback:Function,query?: string){
  let resultSet:any[] = [];
  dataStore.fetchAllVehicles(function(err:any,content:any){
    if(err){
      console.log(err);
    }
    if(content){
      console.log('MY CONTENT SET!!!',content);
      return callback(null, content);
    }
  }, query as string);
  console.log('MY RESULT SET!!!',resultSet);
}

export async function createUserAccount(params: { user: User }) {
  const { user } = params;
  let newUser: any;
  try {
    /**
     * TODO: x10000 check is certain fields provided are already populated
     * reject used
     * username
     * email
     * */
    const newUser = new User(user);
    await dataStore.createUser(newUser);
  } catch (err) {
    throw err;
  }
}

export async function buy(params: { buyInfo: BuyInfo }) {
  const { buyInfo } = params;

  if (buyInfo) {
    //business logic  here...
  } else {
    return new Error("No buy info provided info provided.");
  }
}

export async function search(params: {query: any, requester: any}){
    const {query, requester } = params;
    if(!query){
        //search all
       // await dataStore.search();
    }else{
       // await dataStore.search(query);
    }
}

/**
 * 
 * @Reservation Business logic @START
 */

export async function reserve(params: { reservationInfo: ReservationInfo }) {
    const { reservationInfo } = params;
  
    if (reservationInfo) {
      try {
        if (!reservationInfo.insuranceId) {
          //business logic with insurance here...
        } else {
          //business logic without insurance here...
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return new Error("No reservation info provided.");
    }
  }
  

export async function fetchReservations(){

}

export async function fetchReservationsById(){

}
/**
 * @Reservation business logic @END
 * 
 */


 
//Purchase re
export async function fetchPurchaseRecords(){

}

export async function fetchPurchaseRecordsById(){

}
/** */


export async function fetchAllTransactions(params: {userId: string, requester: User}){

}

export async function removeVehicle(params: {vehicleId: string, requester: User}){

}

export async function addVehicle(params: {vehicleInfo:string, requester: User}){

}

export async function searchUsers(params: {query: any, requester: User}){

}

export async function manageBuyOrder(params: {response: any, employee: User}){

}

export async function maintenanceRequest(params: { issue: any , requester: User}){
    
}
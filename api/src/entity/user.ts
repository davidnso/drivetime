
export interface User{
    Fname:string;
    Lname: string;
    Address: {
        street: string;
        apartment?: string;
        zip: string;
        city: string;
    }
    dob: string;
    ssn: string;
}


export class User{
    Fname:string;
    Lname: string;
    Address: {
        street: string;
        apartment?: string;
        zip: string;
        city: string;
    }
    dob: string;
    ssn: string;
    constructor(information: User){
        this.Fname = information.Fname;
        this.Lname = information.Lname;
        this.Address = information.Address;
        this.dob = information.dob;
        this.ssn = information.ssn;
    }
}
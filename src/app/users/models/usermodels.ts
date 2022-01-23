export interface User{
    email : string;
    phone : string;
    name : string;
    password : string;

}


export interface UserCredintical{
  email : string,
  password : string
}

export class ServerResponse {
    constructor(
      public timestamp: Date,
      public status: number,
      public success: boolean,
      public message: string,
      public data: any,
      public count: number
    ) { }
  }
  
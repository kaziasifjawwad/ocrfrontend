import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { User, UserCredintical} from '../models/usermodels'
import { ServerResponse } from "../models/usermodels";

@Injectable(
    {
        providedIn : 'root',
    }
)

export class OcrApiServce{

    constructor( private httpClient : HttpClient,){}

    registerUser(user : User){
        console.log("hello");
        return this.httpClient
        .post<ServerResponse>(
            'http://127.0.0.1:8000/users/create/',
            user
        );
    }

    getAuthentication(user : UserCredintical){
        return this.httpClient.post<ServerResponse>(
            'http://localhost:8000/users/api/token/', user
        );
    }
}
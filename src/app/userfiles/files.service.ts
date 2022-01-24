import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { config } from "../config";


@Injectable({
    providedIn:'root'
})

export class FileService{
    constructor(private http: HttpClient){}

    readResult():Observable<any[]>{
        return this.http.get<any[]>(
            `${config.apiUrl}/userfiles/results`
        )
    }

    requestResultForImage(userfile: FormData):Observable<any[]>{
        const anyRequest =  this.http.post<any[]>(`${config.apiUrl}/userfiles/upload/image-only` , userfile);
        console.log(anyRequest+"------->");
        return anyRequest;
    }
}
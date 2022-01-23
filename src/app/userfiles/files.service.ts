import { Injectable } from "@angular/core";
import { Userfile , convertedFile} from "./models";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})

export class FileService{
    private apiServiceGetResultLink = 'http://localhost:8000/userfiles/results';
    private apiServiceRequestResultLink = 'http://127.0.0.1:8000/file/upload/image-only';
    constructor(private http: HttpClient){}

    readResult():Observable<any[]>{
        return this.http.get<any[]>(
            this.apiServiceGetResultLink
        )
    }

    requestResult(userfile: FormData):Observable<any[]>{
        const anyRequest =  this.http.post<any[]>(this.apiServiceRequestResultLink , userfile);
        console.log(anyRequest+"------->");
        return anyRequest;
    }
}
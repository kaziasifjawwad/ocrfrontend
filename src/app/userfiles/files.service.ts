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

    requestResult(metaData:{endpoint:string,userfile:FormData}):Observable<any[]>{
        const anyRequest =  this.http.post<any[]>(`${config.apiUrl}/userfiles/upload/${metaData.endpoint}` , metaData.userfile);
        return anyRequest;
    }




    downloadAsTxtFile(metaData:{resultId:string,type :string}){
        console.log("i hit again");
        return this.http.get(`${config.apiUrl}/userfiles/${metaData.type}/${metaData.resultId}` , { responseType: 'blob' });
    }

    deleteById(fileId:string){
        return this.http.get(`${config.apiUrl}/userfiles/delete/${fileId}`);
    }

    requestResultForcImageNormal(data :{file:File, mail: string},apiEndPoint:string){
        return this.http.post<{message:string,itemsRemaining:number,status:number}>(`${config.apiUrl}/userfiles/${apiEndPoint}/` ,data);
    }


}
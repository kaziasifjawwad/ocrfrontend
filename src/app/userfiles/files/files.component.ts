import { Component, OnInit } from '@angular/core';
import { FileService } from '../files.service';
import { convertedFile,Userfile } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  submittedfile!: FormGroup;
  userfile !: Userfile;
  fileUploadService!: FileService;
  public convertedFileList: convertedFile[] = [];
  constructor(private fb: FormBuilder, private fileservice:FileService) {
    
  }

  ngOnInit(): void {
    console.log("here is a good boy ");
    this.submittedfile = this.fb.group(
      {
        file:[null , Validators.required]
      }
      );
    this.getFiles();
  }

  getFiles(){
    this.fileservice.readResult().subscribe(
      (response: convertedFile[]) => {
        this.convertedFileList = response;
        console.log(this.convertedFileList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.convertedFileList);
  }


  submitfile(): void {
    // console.log("submit a file");
    // for (const i in this.submittedfile.controls) {
    //   if (this.submittedfile.controls.hasOwnProperty(i)) {
    //     this.submittedfile.controls[i].markAsDirty();
    //     this.submittedfile.controls[i].updateValueAndValidity();
    //   }
    //   this.userfile = this.submittedfile.value;
    //   this.fileservice.requestResult(this.userfile);
    // }

    const formData : any = new FormData();
    formData.append(
      'file' , this.submittedfile.get('file')?.value
    );
    formData.append("temp",45);
    console.log(formData);
    this.fileservice.requestResult(formData).
    subscribe(
      res => {
        console.log(res)
        if(res){
          // console.log("gfsdfljdsflsdjflsd");
          // this.getFiles();
        }
        console.log("fsdlfdsjlkfd");
      },err=>{
        this.getFiles();
      }
      
    );
    console.log("hehehehehe");
    this.getFiles();
    console.log
  }


  uploadFile(event : any){
    console.log("I hit !!!");
    console.log(this.submittedfile);
    console.log(event);
    const userFile = (event.target as HTMLInputElement).files![0];
    // console.log(file);
    this.submittedfile.patchValue({
      file : userFile
    });
    this.submittedfile.get('file')!.updateValueAndValidity();
  }


}
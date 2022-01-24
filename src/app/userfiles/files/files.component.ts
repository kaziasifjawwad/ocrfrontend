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
  submitfilefoImageOcrForm!: FormGroup;
  userfile !: Userfile;
  fileUploadService!: FileService;
  public convertedFileList: convertedFile[] = [];
  constructor(private fb: FormBuilder, private fileservice:FileService) {
    
  }

  ngOnInit(): void {
    this.submitfilefoImageOcrForm = this.fb.group(
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


  submitfilefoImageOcr(): void {
    const formData : any = new FormData();
    formData.append(
      'file' , this.submitfilefoImageOcrForm.get('file')?.value
    );
    formData.append("temp",45);
    console.log(formData);
    this.fileservice.requestResultForImage(formData).
    subscribe(
      res => {
        console.log(res)
        if(res){
          // console.log("gfsdfljdsflsdjflsd");
          this.getFiles();
        }
      }
      
    );
    console.log("hehehehehe");
    this.getFiles();
    console.log
  }


  uploadforImageOcrForm(event : any){
    console.log("I hit !!!");
    console.log(this.submitfilefoImageOcrForm);
    console.log(event);
    const userFile = (event.target as HTMLInputElement).files![0];
    // console.log(file);
    this.submitfilefoImageOcrForm.patchValue({
      file : userFile
    });
    this.submitfilefoImageOcrForm.get('file')!.updateValueAndValidity();
  }


}
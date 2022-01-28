import { Component, OnInit } from '@angular/core';
import { FileService } from '../files.service';
import { convertedFile, Userfile } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
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
  constructor(private fb: FormBuilder, private fileservice: FileService, private spinner : NgxSpinnerService) {

  }

  ngOnInit(): void {
    
    this.submitfilefoImageOcrForm = this.fb.group(
      {
        file: [null, Validators.required]
      }
    );
    this.getFiles();
  }

  getFiles() {
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


  submitfilefoImageOcr(apiEndPoint:string): void {
    this.spinner.show();
    const formData: any = new FormData();
    formData.append(
      'file', this.submitfilefoImageOcrForm.get('file')?.value
    );
    formData.append("temp", 45);
    console.log(formData);
    let response = this.fileservice.requestResult({endpoint:apiEndPoint,userfile:formData});
    this.spinner.hide();
    response.
      subscribe(
        res => {
          console.log(res)
          if (res) {
            this.getFiles();
          }
        }
      );
    this.getFiles();
    console.log
  }


  uploadforImageOcrForm(event: any) {
    console.log(this.submitfilefoImageOcrForm);
    console.log(event);
    const userFile = (event.target as HTMLInputElement).files![0];
    // console.log(file);
    this.submitfilefoImageOcrForm.patchValue({
      file: userFile
    });
    this.submitfilefoImageOcrForm.get('file')!.updateValueAndValidity();
  }

  downloadFile(metaData: { fileId: string, name: string, type: string , filetype:string}) {
    this.fileservice.downloadAsTxtFile({ resultId: metaData.fileId, type: metaData.type })

      .subscribe(x => {
        console.log(x);
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: x['type'] });
        

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlo

        let fileName=metaData.fileId;
        if(x['type']==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
          console.log("I hit !!!");
          fileName=metaData.fileId+'.docx';
        }
        else if(metaData.type=='download'){
          fileName=metaData.name;
        }
        const nav = (window.navigator as any);
        if (window.navigator && nav.msSaveOrOpenBlob) {
          nav.msSaveOrOpenBlob(newBlob, fileName);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = fileName;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  deleteFileById(fileId:string){
    console.log(fileId);
    this.fileservice.deleteById(fileId).
    subscribe(
      res=>{
        if(res){
          this.getFiles();
        }
      }
    )
  }


}
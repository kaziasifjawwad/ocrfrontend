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
  event!: any;
  submitfileforImageNormalOcrForm!: FormGroup;
  submitfileforPDFNormalOcrForm!: FormGroup;
  submitfileforImageSpecialOcrForm!: FormGroup;
  submitfileforPDFSpecialOcrForm!: FormGroup;


  userfile !: Userfile;
  fileUploadService!: FileService;
  public convertedFileList: convertedFile[] = [];
  constructor(private fb: FormBuilder, private fileservice: FileService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.submitfileforImageNormalOcrForm = this.fb.group(
      {
        file: [null, Validators.required]
      }
    );
    this.submitfileforPDFNormalOcrForm = this.fb.group(
      {
        file: [null, Validators.required]
      }
    );
    this.submitfileforImageSpecialOcrForm = this.fb.group(
      {
        file: [null, Validators.required]
      }
    );
    this.submitfileforPDFSpecialOcrForm = this.fb.group(
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


  submitfilefoImageOcr(apiEndPoint: string): void {
    let file = null;
    if(apiEndPoint=='image-only'){
      file = this.submitfileforImageNormalOcrForm;
    }

    else if(apiEndPoint=='pdf-only'){
      file =  this.submitfileforPDFNormalOcrForm;
    }

    else if(apiEndPoint=='image-special'){
      file =  this.submitfileforImageSpecialOcrForm;
    }

    else if(apiEndPoint=='pdf-special'){
      file =  this.submitfileforPDFSpecialOcrForm;
    }


    this.spinner.show();
    const formData: any = new FormData();
    formData.append(
      'file', file!.get('file')?.value
    );
    console.log(formData);
    let response = this.fileservice.requestResult({ endpoint: apiEndPoint, userfile: formData });
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
    console.log(this.event);
    (this.event.target as HTMLInputElement).value="";
    this.submitfileforImageNormalOcrForm.reset();
    this.submitfileforImageNormalOcrForm.reset();
    this.submitfileforPDFNormalOcrForm.reset();
    this.submitfileforImageSpecialOcrForm.reset();
    this.submitfileforPDFSpecialOcrForm.reset();
   
  }



  uploadFile(event: any , category:string) {
    if(this.event!=undefined){
      (this.event.target as HTMLInputElement).value="";
    }

    this.event = event;
    const userFile = (event.target as HTMLInputElement).files![0];
    let targetApi = null;
    if(category=='image-only'){
      targetApi =  this.submitfileforImageNormalOcrForm;

      // this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforPDFNormalOcrForm.reset();
      this.submitfileforImageSpecialOcrForm.reset();
      this.submitfileforPDFSpecialOcrForm.reset();
    }
    
    else if(category=='pdf-only'){
      targetApi =  this.submitfileforPDFNormalOcrForm;

      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforImageNormalOcrForm.reset();
      // this.submitfileforPDFNormalOcrForm.reset();
      this.submitfileforImageSpecialOcrForm.reset();
      this.submitfileforPDFSpecialOcrForm.reset();
    }
    else if(category=='image-special'){
      targetApi =  this.submitfileforImageSpecialOcrForm;

      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforPDFNormalOcrForm.reset();
      // this.submitfileforImageSpecialOcrForm.reset();
      this.submitfileforPDFSpecialOcrForm.reset();
    }
    else if(category=='pdf-special'){
      targetApi =  this.submitfileforPDFSpecialOcrForm;

      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforImageNormalOcrForm.reset();
      this.submitfileforPDFNormalOcrForm.reset();
      this.submitfileforImageSpecialOcrForm.reset();
      // this.submitfileforPDFSpecialOcrForm.reset();
    }
    

    targetApi?.patchValue({
      file: userFile
    });
    targetApi?.get('file')!.updateValueAndValidity();
  }


  // uploadforImageOcrForm(event: any) {
  //   console.log("hiiiiiiiiiiiiiiiiiii");
  //   this.event = event;
  //   console.log(this.event);
  //   const userFile = (event.target as HTMLInputElement).files![0];
  //   this.submitfilefoImageOcrForm.patchValue({
  //     file: userFile
  //   });
  //   this.submitfilefoImageOcrForm.get('file')!.updateValueAndValidity();
  // }



















  downloadFile(metaData: { fileId: string, name: string, type: string, filetype: string }) {
    this.fileservice.downloadAsTxtFile({ resultId: metaData.fileId, type: metaData.type })

      .subscribe(x => {
        console.log(x);
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: x['type'] });


        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlo

        let fileName = metaData.fileId;
        if (x['type'] === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          console.log("I hit !!!");
          fileName = metaData.fileId + '.docx';
        }
        else if (metaData.type == 'download') {
          fileName = metaData.name;
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

  deleteFileById(fileId: string) {
    console.log(fileId);
    this.fileservice.deleteById(fileId).
      subscribe(
        res => {
          if (res) {
            this.getFiles();
          }
        }
      )
  }


}
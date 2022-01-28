import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from '../userfiles/files.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  submitfilefoImageOcrForm!: FormGroup;
  apiEndPoint!:string;


  constructor(private fileservice:FileService, 
    private fb:FormBuilder , 
    private router : Router, 
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.submitfilefoImageOcrForm = this.fb.group(
      {
        file: [null, Validators.required],
        mail : [null, Validators.required]
      }
    );
  }

  submitfilefoImageOcr(): void {
    console.log(this.submitfilefoImageOcrForm);
    const formData: any = new FormData();
    formData.append(
      'file', this.submitfilefoImageOcrForm.get('file')?.value
    );
    formData.append(
      'mail', this.submitfilefoImageOcrForm.get('mail')?.value
    );
    console.log(formData);
    this.fileservice.requestResultForcImageNormal(formData,this.apiEndPoint).
      subscribe(
        res => {
          console.log(res)
          if (res) {
            console.log(res);
            console.log(res.status);
            if(res.status===2){
              this.router.navigate(['/register'])
            }
            else if(res.status==3){
              this.router.navigate(['/login'])
            }
            this.toastr.warning(res.message);
          }
        }

      );
    console.log
  }

  uploadforImageOcrForm(event: any,apiEndPoint:string) {
    this.apiEndPoint = apiEndPoint;
    const userFile = (event.target as HTMLInputElement).files![0];
    // console.log(file);
    this.submitfilefoImageOcrForm.patchValue({
      file: userFile
    });
    this.submitfilefoImageOcrForm.get('file')!.updateValueAndValidity();
  }

  clearFile(){
    console.log("hehe");
    this.submitfilefoImageOcrForm.reset();
  }

}

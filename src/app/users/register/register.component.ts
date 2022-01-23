import { Component, Injectable, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { User } from '../models/usermodels';
import { OcrApiServce } from '../services/ocrservice';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',]
})


export class RegisterComponent implements OnInit{


  private emailValidator : string = "";
  loginForm! : FormGroup;
  user! : User;



  constructor(
    private fb : FormBuilder,
    private ocrApi : OcrApiServce,
    private toastr: ToastrService,
    private router : Router
    ) {}

  public ngOnInit(): void {
    console.log(this.ocrApi);
    console.log(this.ocrApi);
    this.loginForm = this.fb.group(
      {
        email : [null,[Validators.required]],
        phone : [null , [Validators.pattern(""),Validators.required]],
        name : [null , [Validators.pattern(""),Validators.required]],
        password : [null , [Validators.pattern(""),Validators.required]]
      }
    )
  }



  submit(){
    for(const key of Object.keys(this.loginForm.controls)){
      console.log(this.loginForm.controls[key].value);
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].updateValueAndValidity();
    }
    console.log(this.loginForm.controls['email']);
    this.user = this.loginForm.value;
    this.ocrApi.registerUser(this.user)
    .subscribe(
      {
      next:(res)=>{
        this.toastr.success('Account created');
        this.router.navigate(['/login'])
      },
      error:(error)=>{
        this.toastr.error("mara khaisoooo");
        this.toastr.error("abar mara khao");
      }
      
    });
  }

}

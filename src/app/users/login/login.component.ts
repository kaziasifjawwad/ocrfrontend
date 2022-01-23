import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredintical } from '../models/usermodels';
import { OcrApiServce } from 'src/app/users/services/ocrservice';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userAuthenticationForm !: FormGroup;
  userInformation !: UserCredintical;
  constructor(
    private ocrservice : OcrApiServce,
    private fb : FormBuilder ,   
    private toastr: ToastrService,
    private authService : AuthService,
    private router :Router) { }

  ngOnInit(): void {
    this.userAuthenticationForm = this.fb.group(
      {
        email : [null, [Validators.required]],
        password : [null, [Validators.required]]
      }
    )
  }

  submit(){
    for(const key of Object.keys(this.userAuthenticationForm.controls)){
      this.userAuthenticationForm.controls[key].markAsDirty();
      this.userAuthenticationForm.controls[key].updateValueAndValidity();
    }
    this.userInformation = this.userAuthenticationForm.value;
    this.authService.login(this.userInformation).subscribe(
      {
        next :(res)=>{
          console.log(res);
          this.toastr.success('Account created');
          this.router.navigate(['/userfiles/files']);
        },
        error : (error)=>{
          console.log(error.error);
        }
      }
    )
  }

}

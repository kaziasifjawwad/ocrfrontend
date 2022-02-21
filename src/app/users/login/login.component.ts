import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredintical } from '../models/usermodels';
import { OcrApiServce } from 'src/app/users/services/ocrRegisterService';
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
        email : [null, [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
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
          this.router.navigate(['/userfiles/files']).then(()=>window.location.reload());
          this.toastr.success('Successfully log din');
        },
        error : (error)=>{
          console.log("worng email or phone");
         this.toastr.error("Wrong email or password");
        }
      }
    )
  }

}

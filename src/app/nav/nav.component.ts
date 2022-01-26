import { Component, OnInit } from '@angular/core';
import { AuthService } from '../users/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
   }

  ngOnInit(): void {
    
  }

  logout(): void {
    console.log("i hit !");
    this.authService.logout().subscribe({
      next:(res)=>this.router.navigate(['/']).then(()=>window.location.reload())
    });
  }
}




// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(, private router: Router) { }

//   canActivate() {
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(['/userfiles/files']);
//     }
//     return !this.authService.isLoggedIn();
//   }
// }
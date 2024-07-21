import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LoginRequest} from "../../model/LoginRequest";
import {SignUpRequest} from "../../model/SignUpRequest";
import {FormsModule, NgForm} from '@angular/forms';
import {UserDto} from "../../model/UserDto";
import {UserService} from "../services/user.service";
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";
import {MyStorageService} from "../services/my-storage.service";




@Component({
  selector: 'app-login',

  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent {

  loginRequest: LoginRequest = new LoginRequest();
  myStorageService: MyStorageService = new MyStorageService();

  private userService : UserService;

  errorMessage: string = '';


  constructor(userService : UserService, public router: Router, myStorageService: MyStorageService) {
    this.userService = userService;
  }

  @Output()
  loginMessage : EventEmitter<string> = new EventEmitter<string>();

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loginMessage.emit("Welcome, " + this.loginRequest.email);
      this.userService.login(this.loginRequest).subscribe({
        next: (res: any) => {
          if (res != null) {
            console.log('Accesso riuscito');
            console.log(res.token);
            this.myStorageService.Store('token', res.token);
            this.router.navigate(['/me']);
          }
        },
        error: (error: any) => {
          if (error.status === 400) {
            this.errorMessage = 'Email o Password non valida';
          } else {
            this.errorMessage = 'Errore sconosciuto';
            console.error('Errore sconosciuto', error);
          }
        }
      });
      form.reset();
    }
  }
}

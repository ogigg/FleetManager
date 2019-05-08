import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username = '';
  password = '';
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.authService.register(form)
      .subscribe(res => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.snackBar.open('Zarejestrowano!', 'OK',{ duration: 2000 });
          this.router.navigate(['home']);
          
        }
      }, (err) => {
        console.log("ERROR");
        console.log(err);
        this.snackBar.open('Wystąpił błąd podczas rejestracji!', 'OK',{ duration: 2000 });
      });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

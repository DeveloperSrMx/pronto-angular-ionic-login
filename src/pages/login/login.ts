import { HomePage } from './../home/home';
import { UserInterface } from './../../app/core/interfaces/user.interface';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../app/core/services/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { JwtProvider } from '../../app/core/providers/jwt.provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userForm: FormGroup;
  user: UserInterface = {} as UserInterface;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService,
    private jwtProvider: JwtProvider,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * This method allows login
   */
  loginUser(): any {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    this.user = this.userForm.value;

    this.userService.login(this.user)
      .subscribe(
        success => {
          loading.dismiss();
            this.navCtrl.push(HomePage); 
        },
        () => {
          loading.dismiss();
        }
      );
  }

  /**
   * This method allows navigate to signup page
   */
  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

}

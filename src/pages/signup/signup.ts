import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../app/core/interfaces/user.interface';
import { UserService } from '../../app/core/services/user.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  user: UserInterface = {} as UserInterface;
  result: any;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    private userService: UserService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup(): any {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.user = this.signupForm.value;

    this.userService.signup(this.user)
      .subscribe(
        success => {
          this.result = success;
          loading.dismiss();
          this.confirm();
        },
        () => {
          loading.dismiss();
        }
      );

  }


  confirm() {
    let alert = this.alertCtrl.create({
      title: 'Created User',
      message: 'successfully created user',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}

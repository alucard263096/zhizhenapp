import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage extends AppBase {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public statusBar: StatusBar,
    public modalCtrl: ModalController ) {
    super(navCtrl,modalCtrl,statusBar);
  }
  

}

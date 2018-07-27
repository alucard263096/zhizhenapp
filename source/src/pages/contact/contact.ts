import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, Content,
  ViewController
} from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { CourseApi } from '../../providers/course.api';
import { BannerApi } from '../../providers/banner.api';
import { ViewChild } from '@angular/core';
import { stringify } from '../../../node_modules/@angular/core/src/util';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [CourseApi, BannerApi]
})
export class ContactPage extends AppBase {
  courselist = [];
  current = 0;
  showmiss = false;
  unshowmiss = false;
  constructor(public navCtrl: NavController, public navParam: NavParams
    , public modalCtrl: ModalController, public viewCtrl: ViewController,
    public statusBar: StatusBar,
    public courseApi: CourseApi) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar);
    console.log(navParam);


  }

  onMyShow() {
    this.courseApi.list({ isfind: "Y" }).then((courselist) => {
      //alert(JSON.stringify(courselist));
      this.courselist = courselist;
    });
  }
  swipe(e) {
    //alert(e.direction);
    if (e.direction == 2) {
      if (this.current + 2 < this.courselist.length) {
        this.current++;
        this.showmiss = true;
        setTimeout(() => {
          this.showmiss = false;
        }, 1000);
      }
    }
    if (e.direction == 4) {
      if (this.current >0) {
        this.current--;
        this.unshowmiss = true;
        setTimeout(() => {
          this.unshowmiss = false;
        }, 1000);
      }
    }
  }
}

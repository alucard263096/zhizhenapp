import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppBase } from '../../app/app.base';
import { CategoryApi } from '../../providers/category.api';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[CategoryApi]
})
export class AboutPage extends AppBase {
  @ViewChild(Slides) slides: Slides;

  catlist=[];
  constructor(public navCtrl: NavController,public statusBar:StatusBar
  ,public categoryApi:CategoryApi) {
    super(statusBar);
  }

  onMyLoad(){
    this.categoryApi.list({}).then((catlist)=>{
      catlist[0].active="Y";
      this.catlist=catlist;
    });
  }
  catclick(idx){
    for(var i=0;i<this.catlist.length;i++){
      this.catlist[i].active=i==idx?"Y":"N";
    }
  }
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.catclick(currentIndex);
  }
}

import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import {BannerApi} from "../../providers/banner.api";
import { StatusBar } from '@ionic-native/status-bar';
import { CategoryApi } from '../../providers/category.api';
import { CourseApi } from '../../providers/course.api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[BannerApi,CategoryApi,CourseApi]
})
export class HomePage extends AppBase {
  bannertop=[];
  catlist=[];
  recommcourselist=[];
  greatecourselist=[];
  hotcourselist=[];
  bannermiddle={pic:""};
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
    ,public bannerApi:BannerApi, public categoryApi:CategoryApi
    , public courseApi:CourseApi
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  setStatusBar(){
    this.statusBar.styleLightContent();
  }
  onMyLoad(){
    
    console.log("modal ctrl");
    console.log(this.modalCtrl);

    this.modalCtrl=this.modalCtrl;
    this.navCtrl=this.navCtrl;
    this.statusBar=this.statusBar;

    this.bannerApi.list({}).then((bannerlist)=>{
      var bannertop=[];
        for(var i=0;i<bannerlist.length;i++){
          if(bannerlist[i].position=='hometop'){
            bannertop.push(bannerlist[i]);
          }
          if(bannerlist[i].position=='homemiddle'){
            console.log(bannerlist[i]);
            this.bannermiddle=bannerlist[i];
          }
        }
      this.bannertop=bannertop;
    });

    this.categoryApi.list({}).then((catlist)=>{
      this.catlist=catlist;
    });
    this.courseApi.list({isrecomm:"Y"}).then((recommcourselist)=>{
      this.recommcourselist=recommcourselist;
    });
    this.courseApi.list({isgreat:"Y"}).then((greatecourselist)=>{
      this.greatecourselist=greatecourselist;
    });
    this.courseApi.list({ishot:"Y"}).then((hotcourselist)=>{
      this.hotcourselist=hotcourselist;
    });
    
  }
  onMyShow(){
    //this.openCourse(1);
  }
  onPullRefresh(){
    this.onMyLoad();
  }
}

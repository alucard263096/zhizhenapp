import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  bannermiddle={pic:""};
  constructor(public navCtrl: NavController,public statusBar : StatusBar
    ,public bannerApi:BannerApi, public categoryApi:CategoryApi
    , public courseApi:CourseApi
  ) {
    super(statusBar);
  }
  setStatusBar(){
    this.statusBar.styleLightContent();
  }
  onMyLoad(){
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
    this.courseApi.list({isgreate:"Y"}).then((greatecourselist)=>{
      this.greatecourselist=greatecourselist;
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, App, ModalController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppBase } from '../../app/app.base';
import { CategoryApi } from '../../providers/category.api';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CourseApi } from '../../providers/course.api';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [CategoryApi, CourseApi]
})
export class AboutPage extends AppBase {
  @ViewChild(Slides) slides: Slides;

  catlist = [];
  constructor(public navCtrl: NavController,public navParam:NavParams
    ,public modalCtrl:ModalController ,public viewCtrl:ViewController,
     public statusBar: StatusBar
    , public categoryApi: CategoryApi,
    public courseApi: CourseApi) {
    super(navCtrl,modalCtrl,viewCtrl, statusBar);
    console.log(navParam);
  }

  onMyLoad() {
    this.categoryApi.list({}).then((catlist) => {
      console.log(AppBase.TabChangeParamCache);
      var defaultindex=0;
      if(AppBase.TabChangeParamCache!=null
      &&AppBase.TabChangeParamCache.tabIndex==1){
        for(var i=0;i<catlist.length;i++){
          if(AppBase.TabChangeParamCache.param.cat_id==catlist[i].id){
            catlist[i].active = "Y";
            defaultindex=i;
          }
        }
      }else{
        catlist[defaultindex].active = "Y";
      }
      this.catlist = catlist;
      this.loadCatCourseList(this.catlist[defaultindex].id);
      var slidertry=setInterval(()=>{
        if(this.slides.length()==this.catlist.length){
          this.slides.slideTo(defaultindex);
          AppBase.TabChangeParamCache=null;
          clearInterval(slidertry);
        }
      },1000);
    });
  }
  onMyShow(){
    if(AppBase.TabChangeParamCache!=null
      &&AppBase.TabChangeParamCache.tabIndex==1){

        if(this.catlist.length>0){
          var defaultindex=0;
          for(var i=0;i<this.catlist.length;i++){
            if(AppBase.TabChangeParamCache.param.cat_id==this.catlist[i].id){
              this.catlist[i].active = "Y";
              this.catlist[i].courselist=undefined;
              this.catlist[i].recommcourse=undefined;
              this.catclick(i);
              
              AppBase.TabChangeParamCache=null;
              break;
            }
          }
        }
      }
  }
  catclick(idx) {
    console.log(idx);
    for (var i = 0; i < this.catlist.length; i++) {
      //this.catlist[i].active = i == idx ? "Y" : "N";
      if (i == idx) {
        this.catlist[i].active = "Y";
        this.loadCatCourseList(this.catlist[i].id);
        this.slides.slideTo(i);
      } else {
        this.catlist[i].active = "N";
      }
    }
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.catclick(currentIndex);
  }
  loadCatCourseList(cat_id) {
    for (var i = 0; i < this.catlist.length; i++) {
      if (this.catlist[i].id == cat_id) {
        if (this.catlist[i].courselist == undefined) {
          this.courseApi.list({
            cat_id: cat_id,
            orderby: " r_main.published_date desc "
          }).then((courselist) => {
            this.catlist[i].courselist = courselist;
          });
          if (this.catlist[i].recommcourse == undefined) {
            this.courseApi.list({
              cat_id: cat_id, iscatrecomm: "Y"
            }).then((recommcourse) => {
              this.catlist[i].recommcourse = recommcourse;
            });
          }
          break;
        }
      }
    }
  }
  swipe(e) {
    console.log(e.direction);
  }
  onPullRefresh(ref){
    for (var i = 0; i < this.catlist.length; i++) {
      if (this.catlist[i].active == "Y") {
        this.catlist[i].courselist=undefined;
        this.catlist[i].recommcourse=undefined;
        this.loadCatCourseList(this.catlist[i].id);
        this.slides.slideTo(i);
        ref.complete();
      }
    }
  }
}
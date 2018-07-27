import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Content, 
  ViewController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { CourseApi } from '../../providers/course.api';
import { BannerApi } from '../../providers/banner.api';
import { ViewChild } from '@angular/core';

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
  providers:[CourseApi,BannerApi]
})
export class CoursePage extends AppBase {
  @ViewChild(Content) content: Content;

  playstatus=0;
  id=0;
  info={name:"",coursetype:"",relacourses:[]};
  banner=null;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public statusBar: StatusBar,
    public modalCtrl: ModalController,
    public viewCtrl:ViewController,
  public courseApi:CourseApi ,
  public bannerApi:BannerApi ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
    this.id=navParams.data.id;
  }

  onMyShow(){
    this.courseApi.info({id:this.id}).then((info)=>{

      //alert(JSON.stringify( info.relacourses));
      info.wenzhang=this.util.HtmlDecode(info.wenzhang);
      this.info=info;
      if(info.coursetype=='V'){
        this.statusBar.styleLightContent();
      }else{
        this.statusBar.styleDefault();
      }
    });
    this.bannerApi.list({"position":"coursemiddle"}).then((banner)=>{
      if(banner.length>0){
        this.banner=banner[0];
      }
    });
  }
  
  openCourse(id){
    this.id=id;
    this.content.scrollToTop();
    this.onMyShow();
  }
}

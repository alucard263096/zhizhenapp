import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { StatusBar } from '@ionic-native/status-bar';
import {TabsPage} from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { NavController, ModalController, ViewController } from "ionic-angular";
import { CoursePage } from "../pages/course/course";

export class AppBase{
    static TabChangeParamCache=null;

    public statusBar:StatusBar=null;
    public navCtrl:NavController=null;
    public modalCtrl:ModalController=null;
    public viewCtrl:ViewController=null;
    public statusBarStyle="X";//{DARK}
    public uploadpath:string=ApiConfig.getUploadPath();
    public util=AppUtil;
    public constructor(navCtrl:NavController,
        modalCtrl:ModalController, 
        viewCtrl:ViewController,
        statusBar:StatusBar){
            
        this.navCtrl=navCtrl;
        this.modalCtrl=modalCtrl;
        this.viewCtrl=viewCtrl;
        this.statusBar=statusBar;
    }
    setStatusBar(){
        this.statusBar.styleDefault();
    }
    ionViewDidLoad(){
        this.onMyLoad();
    }
    onMyLoad(){
        
    }
    ionViewDidEnter(){
        this.setStatusBar();
        this.onMyShow();
    }
    onMyShow(){
        
    }
    onPullRefresh(ref){
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref){
      setTimeout(() => {
        this.onPullRefresh(ref);
        ref.complete();
      }, 2000);
    }
    changeTab(index,param){
        //var tabsPage=AppBase.tabsPage;
        //tabsPage.tabRef.select(index,param);
        //var tab=AppBase.tabsPage.tabRef.getSelected();
        //console.log(tab);
        AppBase.TabChangeParamCache={tabIndex:index,param:param};
        this.navCtrl.parent.select(index);
    }
    back(){
        this.navCtrl.pop();
    }
    close(){
        this.viewCtrl.dismiss();
    }
    nagivate(pagename,param){  
        this.navCtrl.push(pagename,param);
    }
    modal(pageobj,param){
        var modal=this.modalCtrl.create(pageobj,param);
        modal.present();
    }
    openCourse(id){
        
        this.modal("CoursePage",{id:id});
    }
}
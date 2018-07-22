import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { StatusBar } from '@ionic-native/status-bar';

export class AppBase{
    public statusBar:StatusBar=null;
    public statusBarStyle="X";//{DARK}
    public uploadpath:string=ApiConfig.getUploadPath();
    public constructor(statusBar:StatusBar){
        this.statusBar=statusBar;
    }
    setStatusBar(){
        this.statusBar.styleDefault();
    }
    ionViewDidLoad(){
        this.setStatusBar();
        this.onMyLoad();
    }
    onMyLoad(){
        
    }
    ionViewDidEnter(){
        this.onMyShow();
    }
    onMyShow(){
        
    }
  
}
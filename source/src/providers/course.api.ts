import { Injectable } from '@angular/core';
import { Loading} from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CourseApi {

    constructor(public http: Http) {

    }

    

//获取所有的广告
public list(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'course/list';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('course/list',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
                  var retjson=res.json(); 
                  console.log(retjson);
      					 return retjson;
      				}else{
                console.log(res);
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                console.log(err);
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('course/list',data,err);
            });

        
    }


//获取所有的广告
public info(data, showLoadingModal:boolean=true) {
  var url = ApiConfig.getApiUrl()+'course/info';
  var headers = ApiConfig.GetHeader(url, data);
  let options = new RequestOptions({ headers: headers });

  let body=ApiConfig.ParamUrlencoded(data);

  let loading: Loading=null;
  if(showLoadingModal){
    loading = ApiConfig.GetLoadingModal();
  }

  return this.http.post(url, body, options).toPromise()
      .then((res) => {
        if(ApiConfig.DataLoadedHandle('course/info',data,res)){
            if(showLoadingModal){
               ApiConfig.DimissLoadingModal();
            }
            var retjson=res.json(); 
            console.log(retjson);
           return retjson;
        }else{
          console.log(res);
          return Promise.reject(res);
        }
      })
      .catch(err => {
          
          console.log(err);
          if(showLoadingModal){
             ApiConfig.DimissLoadingModal();
          }
          return ApiConfig.ErrorHandle('course/info',data,err);
      });

  
}

    

}

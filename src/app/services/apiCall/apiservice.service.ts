import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  patchApi(url: any, jsonPayload: any) {
    //console.log(JSON.stringify(jsonPayload) + " jsonPayload " + url);
    return this.http.patch(url, jsonPayload).pipe(map(results => results), catchError(this.handleError));
  }


  deleteApi(url: any) {
    //console.log(JSON.stringify(jsonPayload) + " jsonPayload " + url);
    return this.http.delete(url).pipe(map(results => results), catchError(this.handleError));
  }



  postApi(url: any, jsonPayload: any) {
    //console.log(JSON.stringify(jsonPayload) + " jsonPayload " + url);
    return this.http.post(url, jsonPayload).pipe(map(results => results), catchError(this.handleError));
  }

  getApi(url: any) {
    ///console.log(" jsonPayload " + url);
    return this.http.get(url).pipe(map(results => results), catchError(this.handleError));
  }
  getApiWithToken(url: any) {
    var token: any;
    token = localStorage.getItem("userToken");
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(url, { 'headers': headers }).pipe(map(results => results), catchError(this.handleError))
  }


  getPostWithToken(url: any, jsonPayload: any) {
    var token: any;
    token = localStorage.getItem("userToken");
    const headers = new HttpHeaders().set('token', token);
    return this.http.post(url, jsonPayload, { 'headers': headers }).pipe(map(results => results), catchError(this.handleError))
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    // return throwError(() => error);
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
      //  errMsg = "No internet connection."
    }
    console.error(error);
    return throwError(() => error);
    // return throwError(
    //   () => {
    //     const error: any = new Error(`This is error number ${errMsg}`);
    //   });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

let httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  }),
  responseType: 'blob' as 'blob'
};

const serverUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class ImageDispatchService {

  
  constructor(private http: HttpClient) { }

  

  getConfig() {
    return this.http.get(serverUrl,httpOptions);
  }

  postImage(params: number[], file: string): Observable<Blob> {

    let fd = new FormData();
    fd.append('x0', `${params[0]}`);
    fd.append('y0', `${params[1]}`);
    fd.append('w', `${params[2]}`);
    fd.append('h', `${params[3]}`);
    fd.append('file',file);

    return this.http.post(serverUrl,fd,httpOptions);
  }

}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url = `${environment.weatherUrl}lat=${latitude}&lon=${longitude}&appid=${environment.appkey}&units=metric`;

    return this.http.get<any>(url);
  }

  getDirection(name: string): Observable<string> {
    const url = `${environment.locationUrl}${name}}&appid=c0c6cf256b59b4cea35a9344bc892138`;
    return this.http.get<any>(url);
  }
}

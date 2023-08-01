import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { WeatherData } from '../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url = `${environment.weatherUrl}lat=${latitude}&lon=${longitude}&appid=${environment.appkey}&units=metric`;

    return this.http.get<any>(url);
  }
}

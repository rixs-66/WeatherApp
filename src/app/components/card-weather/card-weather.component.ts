import { Component, computed, inject, signal } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { WeatherData } from 'src/app/interfaces/weather';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrls: ['./card-weather.component.css'],
})
export class CardWeatherComponent {
  options: AnimationOptions = {
    path: 'assets/Images/lottie_tempMax.json',
  };

  public latitude = signal<number>(0);
  public longitude = signal<number>(0);
  public WeatherData = signal<WeatherData | any>({});

  public clima = signal<string>('clima');
  public description = signal<string>('clima');
  public icon = signal<string>('clima');
  public city = signal<string>('new york');

  public WeatherApiService = inject(WeatherApiService);

  constructor() {
    this.getLocation(this.city());
  }

  obtenerUbicacion() {
    this.WeatherApiService.getWeather(
      this.latitude(),
      this.longitude()
    ).subscribe(
      (info) => {
        this.WeatherData.set(info);
        this.clima.set(this.WeatherData().weather[0].main);
        this.description.set(this.WeatherData().weather[0].description);
        this.icon.set(this.WeatherData().weather[0].icon);

        const climaActual = this.clima();
        const currentTime = Math.floor(Date.now() / 1000); // Hora actual en UNIX timestamp
        const localTime = currentTime + this.WeatherData().timezone; // Timestamp en la zona horaria local

        const isDaytime =
          localTime >= this.WeatherData().sys.sunrise &&
          localTime < this.WeatherData().sys.sunset;
      },
      (error) => {}
    );
  }

  getvalue(event: Event) {
    const inputVal = (event.target as HTMLInputElement).value;
    this.getLocation(inputVal);
    this.WeatherData.set(undefined);
  }

  getLocation(val: string) {
    this.WeatherApiService.getDirection(val).subscribe(
      (data: any) => {
        this.latitude.set(data.length != 0 ? data[0].lat : 0);
        this.longitude.set(data.length != 0 ? data[0].lon : 0);

        this.obtenerUbicacion();
      },
      (error) => {}
    );
  }
}

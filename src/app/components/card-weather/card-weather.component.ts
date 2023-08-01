import { Component, computed, inject, signal } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
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

  public LoadService = inject(LoaderService);
  public WeatherApiService = inject(WeatherApiService);

  constructor() {
    this.obtenerUbicacion();
  }

  obtenerUbicacion() {
    if (navigator.geolocation) {
      this.LoadService.showLoader.set(true); // Mostrar el loader mientras se obtiene la ubicación
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude.set(position.coords.latitude);
          this.longitude.set(position.coords.longitude);
          this.LoadService.showLoader.set(false);

          this.WeatherApiService.getWeather(
            this.latitude(),
            this.longitude()
          ).subscribe(
            (info) => {
              this.WeatherData.set(info);
              this.clima.set(this.WeatherData().weather[0].main);
              this.description.set(this.WeatherData().weather[0].description);
              this.icon.set(this.WeatherData().weather[0].icon);

              console.log(this.WeatherData());

              const climaActual = this.clima();
              const currentTime = Math.floor(Date.now() / 1000); // Hora actual en UNIX timestamp
              const localTime = currentTime + this.WeatherData().timezone; // Timestamp en la zona horaria local

              const isDaytime =
                localTime >= this.WeatherData().sys.sunrise &&
                localTime < this.WeatherData().sys.sunset;

              console.log(isDaytime ? true : false);
            },
            (error) => {}
          );
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            const retry = confirm(
              'Para obtener el clima, necesitamos tu ubicación. Por favor, vuelve a intentar permitir el acceso a tu ubicación.'
            );
            if (retry) {
              this.obtenerUbicacion(); // Vuelve a pedir la ubicación
            }
          }
        }
      );
    } else {
      // Manejo adicional si el navegador no es compatible con la geolocalización
      // ...
    }
  }

  obtenerHora(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convertir el timestamp a milisegundos

    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
  }
}

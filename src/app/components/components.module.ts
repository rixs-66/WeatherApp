import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWeatherComponent } from './card-weather/card-weather.component';
import { MaterialModule } from '../modules/material.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [CardWeatherComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [CardWeatherComponent],
})
export class ComponentsModule {}

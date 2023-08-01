import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  showLoader = signal<boolean>(false);
}

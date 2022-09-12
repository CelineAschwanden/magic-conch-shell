import { Injectable } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';

import { rateData } from '../interfaces/rateData';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private functions: Functions) { }

  sendRating(data: rateData): Promise<HttpsCallableResult<unknown>> {
    const callable = httpsCallable(this.functions, 'onRate');
    return callable(data);
  }
}

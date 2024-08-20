import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Summary } from '../intefaces/summary.';
import { environment } from '../../../environments/environment';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  /** Variables globales */
  #http = inject(HttpClient);

  getSummary(document: string, type: string): Observable<Summary | undefined> {
    const url = environment.MOCK_URL;
    return this.#http
      .get<Summary[]>(url)
      .pipe(
        map((summary) =>
          summary.find(
            (res) => res.document === document && res.typeDocument === type
          )
        )
      );
  }
}

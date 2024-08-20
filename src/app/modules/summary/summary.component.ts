import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { SummaryService } from '../../core/services/summary.service';
import { Summary } from '../../core/intefaces/summary.';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgIf],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  /** Variables globales */
  dataSummary!: Summary;
  error = '';  
  #params = inject(ActivatedRoute);
  #router = inject(Router);
  #summaryService = inject(SummaryService);

  ngOnInit(): void {
    this.activateParams();
  }

  activateParams(): void {
    this.#params.queryParams.subscribe((param) => {
      const numberDoc = param['number'];
      const typeDoc = param['type'];
      this.#summaryService.getSummary(numberDoc, typeDoc).subscribe((res) => {
        if (res) {
          this.dataSummary = res;
        } else {
          this.error = 'No se encontró información para el usuario ingresado.';
        }
      });
    });
  }

  backToConsult() {
    this.#router.navigate(['/']);
  }
}

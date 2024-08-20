import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-information',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './search-information.component.html',
  styleUrl: './search-information.component.scss',
})
export class SearchInformationComponent implements OnInit {
  /** Varibales globales */
  searchform!: FormGroup;
  listDocuments = [
    {
      value: 'cc',
      label: 'Cedula de ciudadanía',
    },
    {
      value: 'ps',
      label: 'Pasaporte',
    },
  ];
  #fb = inject(FormBuilder);
  #router = inject(Router);

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.searchform = this.#fb.group({
      typeDoc: ['', [Validators.required]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
          Validators.pattern('^[0-9.]*$'),
        ],
      ],
    });
  }

  get searchFormControl() {
    return this.searchform.controls;
  }

  formatDocument(): void {
    const value = this.searchFormControl['document'].value.replace(/\D/g, '');
    const formateado = new Intl.NumberFormat('de-DE').format(Number(value));
    this.searchFormControl['document'].setValue(formateado, {
      emitEvent: false,
    });
  }

  searchDocument(): void {
    if (this.searchform.valid) {
      const numberDoc = this.searchform.value.document.replace(/\./g, '');
      this.#router.navigate(['/summary'], {
        queryParams: { number: numberDoc, type: this.searchform.value.typeDoc },
      });
    }
  }
}

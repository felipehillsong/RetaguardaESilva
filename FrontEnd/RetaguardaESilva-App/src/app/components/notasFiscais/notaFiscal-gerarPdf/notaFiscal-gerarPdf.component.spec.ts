/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotaFiscalGerarPdfComponent } from './notaFiscal-gerarPdf.component';

describe('NotaFiscalGerarPdfComponent', () => {
  let component: NotaFiscalGerarPdfComponent;
  let fixture: ComponentFixture<NotaFiscalGerarPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaFiscalGerarPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaFiscalGerarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

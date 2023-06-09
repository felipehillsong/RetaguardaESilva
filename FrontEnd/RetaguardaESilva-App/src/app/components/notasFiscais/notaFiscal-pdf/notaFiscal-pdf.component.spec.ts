/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotaFiscalPdfComponent } from './notaFiscal-pdf.component';

describe('NotaFiscalPdfComponent', () => {
  let component: NotaFiscalPdfComponent;
  let fixture: ComponentFixture<NotaFiscalPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaFiscalPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaFiscalPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

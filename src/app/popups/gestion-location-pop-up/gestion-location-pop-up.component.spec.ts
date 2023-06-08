import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLocationPopUpComponent } from './gestion-location-pop-up.component';

describe('GestionLocationPopUpComponent', () => {
  let component: GestionLocationPopUpComponent;
  let fixture: ComponentFixture<GestionLocationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionLocationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionLocationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

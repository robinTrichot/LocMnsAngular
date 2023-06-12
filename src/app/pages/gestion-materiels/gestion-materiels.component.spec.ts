import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMaterielsComponent } from './gestion-materiels.component';

describe('GestionMaterielsComponent', () => {
  let component: GestionMaterielsComponent;
  let fixture: ComponentFixture<GestionMaterielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMaterielsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

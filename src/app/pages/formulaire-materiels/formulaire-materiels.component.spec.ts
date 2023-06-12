import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireMaterielsComponent } from './formulaire-materiels.component';

describe('FormulaireMaterielsComponent', () => {
  let component: FormulaireMaterielsComponent;
  let fixture: ComponentFixture<FormulaireMaterielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireMaterielsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

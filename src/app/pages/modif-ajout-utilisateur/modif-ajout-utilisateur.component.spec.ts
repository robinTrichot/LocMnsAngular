import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifAjoutUtilisateurComponent } from './modif-ajout-utilisateur.component';

describe('ModifAjoutUtilisateurComponent', () => {
  let component: ModifAjoutUtilisateurComponent;
  let fixture: ComponentFixture<ModifAjoutUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifAjoutUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifAjoutUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

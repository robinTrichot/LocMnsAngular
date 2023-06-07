import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UsagerServiceService } from './usager-service.service';
import { ImageService } from './image.service';

describe('UsagerServiceService', () => {
  let service: UsagerServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsagerServiceService, ImageService]
    });
    service = TestBed.inject(UsagerServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve utilisateurs from API', () => {
    const utilisateursMock = [
      { id: 1, nom: 'Utilisateur 1' },
      { id: 2, nom: 'Utilisateur 2' }
    ];

    service.getUtilisateurs();

    const req = httpMock.expectOne('http://localhost:8080/usagers');
    expect(req.request.method).toBe('GET');
    req.flush(utilisateursMock);

    service._utilisateurs.subscribe((utilisateurs: any[]) => {
      expect(utilisateurs.length).toBe(2);
      expect(utilisateurs[0].nom).toBe('Utilisateur 1');
      expect(utilisateurs[1].nom).toBe('Utilisateur 2');
    });
  });

  it('should delete utilisateur', () => {
    const id = 1;

    service.deleteUtilisateur(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/admin/deleteUsager/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should edit utilisateur', () => {
    const formData = new FormData();

    service.editionUtilisateur(formData).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/admin/addUsager');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    req.flush({});
  });

  it('should retrieve utilisateur by id', () => {
    const id = 1;

    service.getUtilisateur(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/usager/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
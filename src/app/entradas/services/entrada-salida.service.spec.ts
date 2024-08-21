import { TestBed } from '@angular/core/testing';

import { EntradaSalidaService } from './entrada-salida.service';

describe('EntradaSalidaService', () => {
  let service: EntradaSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EmailVerificationInterceptor } from './email-verification.interceptor';

describe('EmailVerificationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EmailVerificationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EmailVerificationInterceptor = TestBed.inject(EmailVerificationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

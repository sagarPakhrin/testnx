import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    const mockResponse = [
      { message: 'Take out trash', done: false },
      { message: 'Continue using Nx', done: false },
      { message: 'Setup nx and docker', done: true },
    ];
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual(mockResponse);
    });
  });
});

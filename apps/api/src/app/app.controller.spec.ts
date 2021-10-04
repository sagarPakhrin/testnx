import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    const mockResponse = [
      { done: false, message: 'Take out trash' },
      { done: false, message: 'Continue using Nx' },
      { done: true, message: 'Setup nx and docker' },
    ];
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual(mockResponse);
    });
  });
});

import { HttpModule, HttpService } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockHttpService = () => ({
  get: jest.fn(),
  toPromise: jest.fn(),
});
describe('AppController', () => {
  let app: TestingModule;
  let httpService;
  let appService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        AppService,
        { provide: HttpService, useFactory: mockHttpService },
      ],
    }).compile();
    httpService = app.get<HttpService>(HttpService);
  });

  describe('getData', () => {
    it('should return "Welcome to html!"', async () => {
      const data = ['test'];

      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      httpService.get.mockImplementationOnce(() => of(response));
      const appController = app.get<AppController>(AppController);
      const returnData = await appController.getData();
      expect(returnData).toEqual(response.data);
    });
  });
});

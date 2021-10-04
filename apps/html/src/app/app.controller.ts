import { Controller, Get, HttpService, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from '@my-org/todos';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService
  ) {}
  @Get()
  @Render('index')
  async root() {
    return {
      todos: await this.getData(),
    };
  }

  async getData() {
    try {
      const response = await this.httpService
        .get<Todo[]>(process.env.apiPath || 'http://localhost:3333')
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

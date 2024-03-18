import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const dummyTodos: Todo[] = [
    {
      userId: 1,
      id: 1,
      body: 'Http Client',
      title: 'Testing Angular Service',
    },
    {
      userId: 2,
      id: 2,
      body: 'Hello World2',
      title: 'Testing Angular Services',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should create', () => {
    expect(service).toBeDefined();
  });
  it('be able to retrieve posts from the API bia GET', () => {
    const dummyTodos: Todo[] = [
      {
        userId: 1,
        id: 1,
        body: 'Hello World',
        title: 'testing Angular',
      },
      {
        userId: 2,
        id: 2,
        body: 'Hello World2',
        title: 'testing Angular2',
      },
    ];
    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });
    const request = httpMock.expectOne(`${service.ROOT_URL}/todos`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTodos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

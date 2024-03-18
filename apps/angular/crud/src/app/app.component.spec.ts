import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Todo } from './services/todo/todo';
import { TodoService } from './services/todo/todo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoServiceStub: Partial<TodoService>;

  beforeEach(waitForAsync(() => {
    todoServiceStub = {
      getTodos: () => {
        return <Observable<Todo[]>>of([
          { userId: 1, id: 1, body: 'Hello World', title: 'testing Angular' },
          { userId: 2, id: 2, body: 'Hello World2', title: 'testing Angular2' },
        ]);
      },
    };
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: TodoService, useValue: todoServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoServiceStub = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

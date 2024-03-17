import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { TodoService } from './services/todo/todo.service';
export const appConfig: ApplicationConfig = {
  // providers: [importProvidersFrom(HttpClientModule)],
  providers: [
    { provide: TodoService, useClass: TodoService },
    importProvidersFrom(HttpClientModule),
  ],
};

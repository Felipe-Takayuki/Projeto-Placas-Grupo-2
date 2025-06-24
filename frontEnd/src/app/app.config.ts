import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Supondo que as rotas estejam no arquivo 'app.routes.ts'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Otimiza a detecção de mudanças assíncronas
    provideRouter(routes), // Configura o sistema de rotas com o arquivo de rotas
  ]
};

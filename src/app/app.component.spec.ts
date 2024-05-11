import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';

class MockActivatedRoute {
  // Stelle hier Daten bereit, die in deinen Tests verwendet werden könnten
  // Beispiel: params oder snapshot Objekte
  params = of({ id: '123' });
  snapshot = {
    paramMap: {
      get: (name: string) => '123'
    }
  };
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NoopAnimationsModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
        // Weitere nötige Mocks hier einfügen
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});

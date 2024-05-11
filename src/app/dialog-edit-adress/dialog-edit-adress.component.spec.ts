import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogEditAdressComponent } from './dialog-edit-adress.component';
import { Firestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditAdressComponent', () => {
  let component: DialogEditAdressComponent;
  let fixture: ComponentFixture<DialogEditAdressComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogEditAdressComponent>>;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    firestoreSpy = jasmine.createSpyObj('Firestore', ['collection']);

    await TestBed.configureTestingModule({
      imports: [
        DialogEditAdressComponent,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Firestore, useValue: firestoreSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

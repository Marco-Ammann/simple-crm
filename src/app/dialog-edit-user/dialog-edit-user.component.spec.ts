import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { DialogEditUserComponent } from './dialog-edit-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockFirestore {
  // Hier können Methoden hinzugefügt werden, die in deiner Komponente verwendet werden
}

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
        { provide: MatDialogRef, useValue: {} },
        { provide: Firestore, useClass: MockFirestore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

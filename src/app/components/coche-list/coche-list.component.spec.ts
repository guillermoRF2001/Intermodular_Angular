import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheListComponent } from './coche-list.component';

describe('CocheListComponent', () => {
  let component: CocheListComponent;
  let fixture: ComponentFixture<CocheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocheListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

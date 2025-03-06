import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheFormComponent } from './coche-form.component';

describe('CocheFormComponent', () => {
  let component: CocheFormComponent;
  let fixture: ComponentFixture<CocheFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocheFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

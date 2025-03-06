import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheDetailComponent } from './coche-detail.component';

describe('CocheDetailComponent', () => {
  let component: CocheDetailComponent;
  let fixture: ComponentFixture<CocheDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocheDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

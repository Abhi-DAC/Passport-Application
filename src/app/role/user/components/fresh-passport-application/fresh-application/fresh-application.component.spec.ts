import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshApplicationComponent } from './fresh-application.component';

describe('FreshApplicationComponent', () => {
  let component: FreshApplicationComponent;
  let fixture: ComponentFixture<FreshApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreshApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreshApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

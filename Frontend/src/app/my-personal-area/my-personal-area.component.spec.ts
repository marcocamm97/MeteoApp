import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPersonalAreaComponent } from './my-personal-area.component';

describe('MyPersonalAreaComponent', () => {
  let component: MyPersonalAreaComponent;
  let fixture: ComponentFixture<MyPersonalAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPersonalAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPersonalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

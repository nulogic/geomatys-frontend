import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawableImageViewComponent } from './drawable-image-view.component';

describe('DrawableImageViewComponent', () => {
  let component: DrawableImageViewComponent;
  let fixture: ComponentFixture<DrawableImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawableImageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawableImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

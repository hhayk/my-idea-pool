import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveIdeaPopupComponent } from './remove-idea-popup.component';

describe('RemoveIdeaPopupComponent', () => {
  let component: RemoveIdeaPopupComponent;
  let fixture: ComponentFixture<RemoveIdeaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveIdeaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveIdeaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

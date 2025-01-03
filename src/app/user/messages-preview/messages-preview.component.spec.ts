import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPreviewComponent } from './messages-preview.component';

describe('MessagesPreviewComponent', () => {
  let component: MessagesPreviewComponent;
  let fixture: ComponentFixture<MessagesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

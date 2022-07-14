import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontComponent } from './card-front.component';

describe('CardFrontComponent', () => {
  let component: CardFrontComponent;
  let fixture: ComponentFixture<CardFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFrontComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacaTableComponent } from './placa-table.component';

describe('PlacaTableComponent', () => {
  let component: PlacaTableComponent;
  let fixture: ComponentFixture<PlacaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

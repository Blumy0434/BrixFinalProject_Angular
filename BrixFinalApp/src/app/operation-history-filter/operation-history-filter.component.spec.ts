import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationHistoryFilterComponent } from './operation-history-filter.component';

describe('OperationHistoryFilterComponent', () => {
  let component: OperationHistoryFilterComponent;
  let fixture: ComponentFixture<OperationHistoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationHistoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

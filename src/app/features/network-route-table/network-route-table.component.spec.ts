import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { NetworkRouteTableComponent } from './network-route-table.component';

describe('NetworkRouteTableComponent', () => {
  let component: NetworkRouteTableComponent;
  let fixture: ComponentFixture<NetworkRouteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkRouteTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkRouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

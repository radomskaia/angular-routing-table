import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { NetworkRoutesComponent } from './network-routes.component';
import { provideHttpClient } from '@angular/common/http';

describe('NetworkRoutesComponent', () => {
  let component: NetworkRoutesComponent;
  let fixture: ComponentFixture<NetworkRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkRoutesComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

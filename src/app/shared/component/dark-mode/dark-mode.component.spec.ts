import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeComponent } from './dark-mode.component';

describe('DarkModeComponent', () => {
  let component: DarkModeComponent;
  let fixture: ComponentFixture<DarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call darkMode.set with media.matches when reset is called', () => {
    const darkModeSpy = spyOn(component['darkMode'], 'set');
    const mediaMatches = true;
    spyOnProperty(component['media'], 'matches', 'get').and.returnValue(
      mediaMatches
    );

    component.reset();

    expect(darkModeSpy).toHaveBeenCalledWith(mediaMatches);
  });

  it('should remove the key from storage when reset is called', () => {
    const storageSpy = spyOn(component['storage'], 'removeItem');
    const key = component['key'];

    component.reset();

    expect(storageSpy).toHaveBeenCalledWith(key);
  });
});

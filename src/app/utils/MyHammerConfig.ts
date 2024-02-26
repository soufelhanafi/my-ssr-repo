import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  override buildHammer(element: HTMLElement) {
    let mc = new Hammer(element);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    return mc;
  }
}

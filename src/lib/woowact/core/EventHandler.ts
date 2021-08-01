type HTMLEventCallback = (
  this: HTMLElement,
  ev:
    | Event
    | UIEvent
    | AnimationEvent
    | MouseEvent
    | InputEvent
    | FocusEvent
    | CompositionEvent,
) => any;

type TEventCallbacks = {
  [event: string]: HTMLEventCallback;
};

declare global {
  interface HTMLElement {
    eTarget?: number;
  }
}

export const E_TARGET = 'e-target';

class EventHandler {
  static id: number = 0;

  events: {
    [target: string]: TEventCallbacks;
  };

  constructor() {
    this.events = {};
  }

  private getTargetID($el: HTMLElement): number {
    if ($el.eTarget) return $el.eTarget;

    $el.eTarget = EventHandler.id++;

    this.events[$el.eTarget] = {};

    return $el.eTarget;
  }

  public addEvent(
    $target: HTMLElement,
    event: keyof HTMLElementEventMap,
    callback: HTMLEventCallback,
  ) {
    const target = this.getTargetID($target);

    //관련 event 안에 해당하는 앨리먼트 - callback 가 매칭되는 게 없을 때
    if (this.checkCallbackExist(target, event)) {
      $target.removeEventListener(event, this.events[target][event]);
    }

    this.events[target][event] = callback;

    $target.addEventListener(event, callback);
  }

  private checkCallbackExist(target: number, event: string) {
    return this.events[target][event];
  }
}

export const eventHandler: EventHandler = new EventHandler();

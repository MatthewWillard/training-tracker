let timeoutId;
let idleCallback = null;
let notIdleEvents = [
  "keypress",
  "mousemove",
  "mousedown",
  "scroll",
  "touchstart"
];
let fiveMinutesInMs = 5 * 60 * 1000;

const IdleService = {
  setIdleCallback(idleCb) {
    idleCallback = idleCb;
  },
  resestIdleTimer(ev) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(idleCallback, fiveMinutesInMs);
  },
  registerIdleTimerResets() {
    notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  unRegisterIdleResets() {
    clearTimeout(timeoutId);
    notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
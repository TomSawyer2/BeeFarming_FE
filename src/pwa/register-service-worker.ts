import { register } from 'register-service-worker';

function dispathServiceWorkerEvent(eventName: string) {
  const event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  window.dispatchEvent(event);
}

if (process.env.NODE_ENV === 'production') {
  register(`/service-worker.js`, {
    updated() {
      dispathServiceWorkerEvent('sw.updated');
    },

    offline() {
      dispathServiceWorkerEvent('sw.offline');
    },
  });
}

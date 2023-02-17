/* eslint-disable @typescript-eslint/no-empty-function */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('fetch', function () {});

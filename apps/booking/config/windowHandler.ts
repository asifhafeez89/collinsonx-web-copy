// Source: https://github.com/supertokens/supertokens-auth-react/blob/master/examples/with-next-iframe/config/windowHandler.js

import Router from 'next/router';

let inmemstorage: any = {};

export default function getWindowHandler(original: any) {
  return {
    ...original,
    location: {
      ...original.location,
      setHref: (href: string) => {
        Router.push(href);
      },
    },
    localStorage: {
      ...original.localStorage,
      key: async (index: number) => {
        try {
          return window.localStorage.key(index);
        } catch (err) {
          return Object.keys(inmemstorage)[index];
        }
      },
      getItem: async (key: string) => {
        try {
          return window.localStorage.getItem(key);
        } catch (err) {
          return inmemstorage[key] === undefined ? null : inmemstorage[key];
        }
      },
      clear: async () => {
        try {
          return window.localStorage.clear();
        } catch (err) {
          inmemstorage = {};
        }
      },
      removeItem: async (key: string) => {
        try {
          return window.localStorage.removeItem(key);
        } catch (err) {
          delete inmemstorage[key];
        }
      },
      setItem: async (key: string, value: string) => {
        try {
          return window.localStorage.setItem(key, value);
        } catch (err) {
          inmemstorage[key] = value;
        }
      },
      keySync: (index: number) => {
        try {
          return window.localStorage.key(index);
        } catch (err) {
          return Object.keys(inmemstorage)[index];
        }
      },
      getItemSync: (key: string) => {
        try {
          return window.localStorage.getItem(key);
        } catch (err) {
          return inmemstorage[key] === undefined ? null : inmemstorage[key];
        }
      },
      clearSync: () => {
        try {
          return window.localStorage.clear();
        } catch (err) {
          inmemstorage = {};
        }
      },
      removeItemSync: (key: string) => {
        try {
          return window.localStorage.removeItem(key);
        } catch (err) {
          delete inmemstorage[key];
        }
      },
      setItemSync: (key: string, value: string) => {
        try {
          return window.localStorage.setItem(key, value);
        } catch (err) {
          inmemstorage[key] = value;
        }
      },
    },
  };
}

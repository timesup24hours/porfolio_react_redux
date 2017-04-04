// import enzyme methods
import React from 'react'
import { shallow, render, mount } from 'enzyme'
import sinon from 'sinon'
import { jsdom } from 'jsdom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

// setup localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore();

// setup default API_HOST
global.API_HOST = 'http://localhost:8080'

// setup enzyme
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon
global.mockStore = mockStore

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};


// Skip createElement warnings but fail tests on any other warning
console.error = (message) => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};

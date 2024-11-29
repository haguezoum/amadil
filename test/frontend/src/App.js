/**
 * Main file of the application.
 * This file contains the Router, Store, and API of the application.
 * It initializes the application and sets up global objects and event listeners.
 * 
 */

import API from "./services/API.js";
import Router from "./services/Router.js";
import State from "./services/State.js";

// Custom global object to hold application-wide instances and utilities.
window.app = {};

/**
 * State management using a custom observer pattern with Proxy.
 * @memberof app
 * @type {Object}
 */
app.state = State;

/**
 * Router instance for handling application routes.
 * @memberof app
 * @type {Object}
 */
app.Router = Router;

/**
 * API instance for handling application API calls.
 * @memberof app
 * @type {Object}
 */
app.API = API;

/**
 * Sleep function to pause execution for a specified duration.
 * @memberof app
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
app.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Initializes the application router when the DOM content is loaded.
window.addEventListener("DOMContentLoaded", () => {
  app.Router.init();
});


// --------------------This is a test of the custom event listener-------------------------------->
window.addEventListener("stateChanged", (event) => {
  /**
   * Event listener for state changes, specifically for dark mode.
   * Toggles dark mode on elements with the class 'card' inside '.master-container'.
   * 
   * @event stateChanged
   * @param {CustomEvent} event - The state change event.
   * @param {Object} event.detail - The details of the state change.
   * @param {string} event.detail.key - The key of the state that changed.
   * @param {boolean} event.detail.value - The new value of the state.
  */
 if (event.detail.key === "darkMode") {
   document.querySelectorAll(".master-container .card").forEach((card) => {
     card.classList.toggle("dark", event.detail.value);
    });
  }
});
// --------------------This is a test of the custom event listener-------------------------------->

const state = {
    darkMode: false,
    currentPage: "/",
    pageHistory: new Array(),
  // You can add other state properties here to watch for changes
};

const appState = new Proxy(state, {
  set: (target, key, value) => {
    if (target[key] !== value) {// Only trigger if value changes
      target[key] = value;
      window.dispatchEvent(
        new CustomEvent("stateChanged", {
          detail: { key, value },
        })
      );
    }
    return true;
  },
});

export default appState;
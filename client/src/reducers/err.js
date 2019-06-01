const loadErr = (state = {}, actions) => {
  switch (actions.type) {
    case "ERR":
      return actions.payload;
    default:
      return state;
  }
};

export { loadErr };

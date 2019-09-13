export const setFlex = ({ x = "center", y = "center" } = {}) => {
    return `display: flex; align-items: ${y}; justify-content: ${x}`;
  };

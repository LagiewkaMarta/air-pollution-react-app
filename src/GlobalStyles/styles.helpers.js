export const setFlex = ({ x = "center", y = "center" } = {}) => {
    return `display: flex; align-items: ${y}; justify-content: ${x}`;
  };

  export const colors = {
    cityWrapperColor: "#030033",
    cityWrapperColorLight: "#0c00d3",
    cityWrapperColorDark: "#020122",
    autocompleteBgColor: "rgba(244, 0, 0, 0.57)",
    autocompleteBgColorLight: "#ff1b1b"
  }
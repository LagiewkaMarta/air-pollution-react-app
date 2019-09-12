export const colors = {
primaryClr: 'white'
}

export const setFlex = ({ x = "center", y = "center" } = {}) => {
    return `display: flex; align-items: ${y}; justify-content: ${x}`;
  };


// const sizes = {
// 	large: 1200,
// 	desktop: 992,
// 	tablet: 768,
// 	phone: 576,
// };

// export const media = Object.keys(sizes).reduce((acc, label) => {
// 	acc[label] = (...args) => css`
// 		@media (min-width: ${sizes[label] / 16}em) {
// 			${css(...args)}
// 		}
// 	`;
// 	return acc;
// }, {});


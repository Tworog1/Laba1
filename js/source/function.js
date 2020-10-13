const getId = id => document.getElementById(id);
const getClass = className => document.querySelector(className);
const getAvg = arr => arr.reduce((sum, item) => sum + item) / arr.length;
const getSortByType = (arr, type) => (type === 1) ? arr.sort((a, b) => a.lastName > b.lastName ? 1 : -1) : arr.sort((a, b) => getAvg(a.rating) > getAvg(b.rating) ? -1 : 1);
const getvalidateInput = id => id.match(/^-{0,1}\d+$/) ? true : false;
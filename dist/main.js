/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kinvolk/headlamp-plugin/lib */ \"@kinvolk/headlamp-plugin/lib\");\n/* harmony import */ var _kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _kinvolk_headlamp_plugin_lib_CommonComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kinvolk/headlamp-plugin/lib/CommonComponents */ \"@kinvolk/headlamp-plugin/lib/CommonComponents\");\n/* harmony import */ var _kinvolk_headlamp_plugin_lib_CommonComponents__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kinvolk_headlamp_plugin_lib_CommonComponents__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Typography */ \"@mui/material/Typography\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerSidebarEntry)({\n  parent: null,\n  name: 'CRD',\n  label: \"CRD List\",\n  url: '/crd',\n  icon: 'mdi:list-box-outline'\n});\n\n// In documentation, you need to go to API > Classes > Pod or Custom resource definition. The methods and attribute are described there\nfunction PodCounter() {\n  var _K8s$ResourceClasses$ = _kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.K8s.ResourceClasses.CustomResourceDefinition.useList(),\n    _K8s$ResourceClasses$2 = _slicedToArray(_K8s$ResourceClasses$, 2),\n    crds = _K8s$ResourceClasses$2[0],\n    error = _K8s$ResourceClasses$2[1];\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(\"div\", {\n    children: !error ? crds === null || crds === void 0 ? void 0 : crds.map(function (crd) {\n      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {\n        color: \"textPrimary\",\n        sx: {\n          fontStyle: 'italic'\n        },\n        children: crd.metadata.name\n      }, crd.metadata.uid);\n    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {\n      color: \"error\",\n      children: \"Uh, something went wrong while fetching CRDs!\"\n    })\n  });\n}\n// Add components and routes for the three different side bar items.\n// This component rendered at URL: /c/mycluster/feedback2\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerRoute)({\n  path: '/crd',\n  sidebar: 'cluster',\n  name: 'CRD',\n  exact: true,\n  component: function component() {\n    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_kinvolk_headlamp_plugin_lib_CommonComponents__WEBPACK_IMPORTED_MODULE_1__.SectionBox, {\n      title: \"CRD\",\n      textAlign: \"center\",\n      paddingTop: 2,\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PodCounter, {})\n    });\n  }\n});\n\n// Remove \"Workloads\" top level sidebar menu item\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerSidebarEntryFilter)(function (entry) {\n  return entry.name === 'workloads' ? null : entry;\n});\n// Remove \"/workloads\" route\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerRouteFilter)(function (route) {\n  return route.path === '/workloads' ? null : route;\n});\n\n// Remove \"Namespaces\" second level sidebar menu item\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerSidebarEntryFilter)(function (entry) {\n  return entry.name === 'namespaces' ? null : entry;\n});\n// Remove \"/namespaces\" route\n(0,_kinvolk_headlamp_plugin_lib__WEBPACK_IMPORTED_MODULE_0__.registerRouteFilter)(function (route) {\n  return route.path === '/namespaces' ? null : route;\n});\n\n//# sourceURL=webpack://headlamp-myfancy/./src/index.tsx?");

/***/ }),

/***/ "@kinvolk/headlamp-plugin/lib":
/*!****************************!*\
  !*** external "pluginLib" ***!
  \****************************/
/***/ ((module) => {

module.exports = pluginLib;

/***/ }),

/***/ "@kinvolk/headlamp-plugin/lib/CommonComponents":
/*!*********************************************!*\
  !*** external "pluginLib.CommonComponents" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = pluginLib.CommonComponents;

/***/ }),

/***/ "@mui/material/Typography":
/*!********************************************************!*\
  !*** external "pluginLib.MuiMaterial[\"Typography\"]" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = pluginLib.MuiMaterial["Typography"];

/***/ }),

/***/ "react":
/*!**********************************!*\
  !*** external "pluginLib.React" ***!
  \**********************************/
/***/ ((module) => {

module.exports = pluginLib.React;

/***/ }),

/***/ "react/jsx-runtime":
/*!*************************************!*\
  !*** external "pluginLib.ReactJSX" ***!
  \*************************************/
/***/ ((module) => {

module.exports = pluginLib.ReactJSX;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.tsx");
/******/ 	
/******/ })()
;
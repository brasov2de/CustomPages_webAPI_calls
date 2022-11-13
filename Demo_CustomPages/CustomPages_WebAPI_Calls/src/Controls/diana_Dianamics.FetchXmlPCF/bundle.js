/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./FetchXmlPCF/index.ts":
/*!******************************!*\
  !*** ./FetchXmlPCF/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FetchXmlPCF\": () => (/* binding */ FetchXmlPCF)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./requests */ \"./FetchXmlPCF/requests.ts\");\n\n\nclass FetchXmlPCF {\n  constructor() {\n  }\n  init(context, notifyOutputChanged, state) {\n    this.notifyOutputChanged = notifyOutputChanged;\n  }\n  updateView(context) {\n    var _a, _b, _c, _d;\n    if (context.parameters.fetchXml.raw && context.parameters.entityName.raw && (context.parameters.fetchXml.raw != this.fetchXml || context.parameters.entityName.raw != this.entityName)) {\n      this.fetchXml = (_b = (_a = context.parameters.fetchXml) == null ? void 0 : _a.raw) != null ? _b : \"\";\n      this.entityName = (_d = (_c = context.parameters.entityName) == null ? void 0 : _c.raw) != null ? _d : \"\";\n      (0,_requests__WEBPACK_IMPORTED_MODULE_1__.fetchRecords)(this.fetchXml, this.entityName, context).then((records) => {\n        this.response = JSON.stringify(records);\n        this.notifyOutputChanged();\n      });\n    }\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment);\n  }\n  getOutputs() {\n    return { output: this.response };\n  }\n  destroy() {\n  }\n}\n\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./FetchXmlPCF/index.ts?");

/***/ }),

/***/ "./FetchXmlPCF/requests.ts":
/*!*********************************!*\
  !*** ./FetchXmlPCF/requests.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchRecords\": () => (/* binding */ fetchRecords)\n/* harmony export */ });\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\nconst fetchRecords = (fetchXml, entityName, context) => __async(void 0, null, function* () {\n  var _a, _b;\n  let colors = /* @__PURE__ */ new Map();\n  try {\n    const metadata = yield context.utils.getEntityMetadata(\"account\", [\"industrycode\"]);\n    colors = new Map(((_b = (_a = metadata.Attributes.get(\"industrycode\")) == null ? void 0 : _a.attributeDescriptor.OptionSet) != null ? _b : []).map((option) => {\n      return [option.Value.toString(), option.Color];\n    }));\n  } catch (e) {\n    console.log(e);\n  }\n  try {\n    const res = yield context.webAPI.retrieveMultipleRecords(entityName, \"?fetchXml=\" + fetchXml);\n    const records = res.entities.map((entity) => {\n      const entityEntries = Object.entries(entity).map(([key, value]) => {\n        const index = key.indexOf(\"@Microsoft.Dynamics.CRM.lookuplogicalname\");\n        if (index > 0) {\n          return [key.substring(0, index) + \"_logicalName\", value];\n        }\n        const index1 = key.indexOf(\"@OData.Community.Display.V1.FormattedValue\");\n        if (index1 > 0) {\n          return [key.substring(0, index1) + \"_formatted\", value];\n        }\n        return [key, value];\n      });\n      if (entity.industrycode != null) {\n        entityEntries.push([\"industrycode_color\", colors.get(entity.industrycode.toString())]);\n      }\n      return Object.fromEntries(entityEntries);\n    });\n    return records;\n  } catch (e) {\n    if (e instanceof Error) {\n      if (e.name === \"PCFNonImplementedError\") {\n        return [{ \"industrycode\": 1, \"industrycode_formatted\": \"Accounting\", \"activity_count\": 10 }];\n      }\n    }\n    throw e;\n  }\n});\n\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./FetchXmlPCF/requests.ts?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./FetchXmlPCF/index.ts");
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('Dianamics.FetchXmlPCF', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.FetchXmlPCF);
} else {
	var Dianamics = Dianamics || {};
	Dianamics.FetchXmlPCF = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.FetchXmlPCF;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}
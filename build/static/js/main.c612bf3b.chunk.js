(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(9);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(10);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/remix-plugin/dist/index.js
var dist = __webpack_require__(5);

// EXTERNAL MODULE: ./src/prettier/style.css
var style = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/prettier/standalone.js
var standalone = __webpack_require__(6);
var standalone_default = /*#__PURE__*/__webpack_require__.n(standalone);

// EXTERNAL MODULE: ./node_modules/prettier/parser-babylon.js
var parser_babylon = __webpack_require__(11);
var parser_babylon_default = /*#__PURE__*/__webpack_require__.n(parser_babylon);

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(3);

// CONCATENATED MODULE: ./src/PackageDetailView.js
// import packagePrettierInfo from "../node_modules/prettier-plugin-solidity/package.json";
// import packageRemixInfo from "../node_modules/remix-plugin/package.json";
var PackageDetailView_PackageDetailView=function PackageDetailView(){return react_default.a.createElement("div",{className:"jumbotron py-3 mb-0"},react_default.a.createElement("h1",{className:"h5"},package_0.name," ",react_default.a.createElement("small",null,package_0.version)),react_default.a.createElement("p",{className:"lead small"},package_0.description));};/* harmony default export */ var src_PackageDetailView = (PackageDetailView_PackageDetailView);
// CONCATENATED MODULE: ./src/App.js
// import Header from "./Header";
var client=Object(dist["createIframeClient"])({customApi:dist["remixApi"],devMode:{port:8080}});var App_App=function App(){var prettierSolidity=Promise.all(/* import() */[__webpack_require__.e(3), __webpack_require__.e(2)]).then(__webpack_require__.t.bind(null, 185, 7));var _useState=Object(react["useState"])(""),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),currentFile=_useState2[0],setCurrentFile=_useState2[1];var _useState3=Object(react["useState"])(80),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),printWidth=_useState4[0],setPrintWidth=_useState4[1];var _useState5=Object(react["useState"])(4),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),tabWidth=_useState6[0],setTabWidth=_useState6[1];var _useState7=Object(react["useState"])(false),_useState8=Object(slicedToArray["a" /* default */])(_useState7,2),useTabs=_useState8[0],setUseTabs=_useState8[1];// const [singleQuote, setSingleQuote] = useState(false);
var _useState9=Object(react["useState"])(false),_useState10=Object(slicedToArray["a" /* default */])(_useState9,2),bracketSpacing=_useState10[0],setBracketSpacing=_useState10[1];var _useState11=Object(react["useState"])("always"),_useState12=Object(slicedToArray["a" /* default */])(_useState11,2),explicitTypes=_useState12[0],setExplicitTypes=_useState12[1];var _useState13=Object(react["useState"])(false),_useState14=Object(slicedToArray["a" /* default */])(_useState13,2),spacedExp=_useState14[0],setSpacedExp=_useState14[1];Object(react["useEffect"])(function(){var subscribeToCurrentFile=/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return client.onload(function(){client.fileManager.on("currentFileChanged",function(fileName){return setCurrentFile(fileName);});});case 2:case"end":return _context.stop();}}},_callee);}));return function subscribeToCurrentFile(){return _ref.apply(this,arguments);};}();subscribeToCurrentFile();},[]);var _onClick=/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(){var content,prettified;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return client.call("fileManager","getFile",currentFile);case 2:content=_context2.sent;prettified=standalone_default.a.format(content,{parser:"solidity-parse",plugins:[prettierSolidity],printWidth:printWidth,tabWidth:tabWidth,useTabs:useTabs,bracketSpacing:bracketSpacing,explicitTypes:explicitTypes,spacedExp:spacedExp});client.fileManager.setFile(currentFile,prettified);case 5:case"end":return _context2.stop();}}},_callee2);}));return function onClick(){return _ref2.apply(this,arguments);};}();return react_default.a.createElement("div",{className:"panels-item"},react_default.a.createElement("section",{className:"section"},react_default.a.createElement(src_PackageDetailView,null)),react_default.a.createElement("section",{className:"section settings-panel p-2"},react_default.a.createElement("div",{className:"button-container"},react_default.a.createElement("form",{className:"form-inline"},react_default.a.createElement("ul",{className:"list-group list-group-flush"},react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{className:"mr-1",htmlFor:"printWidth",title:"The line length where Prettier will try wrap."},"--print-width"),react_default.a.createElement("input",{type:"number",className:"form-control",id:"printWidth",value:printWidth,onChange:function onChange(e){return setPrintWidth(parseInt(e.target.value));}})),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{className:"mr-1",htmlFor:"tabWidth",title:"Number of spaces per indentation level."},"--tab-width"),react_default.a.createElement("input",{type:"number",className:"form-control",id:"tabWidth",value:tabWidth,onChange:function onChange(e){return setTabWidth(parseInt(e.target.value));}})),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label",title:"Indent with tabs instead of spaces."},react_default.a.createElement("input",{type:"checkbox",id:"useTabs",className:"form-check-input",checked:useTabs,onChange:function onChange(){return setUseTabs(!useTabs);}}),"--use-tabs"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label",title:"Do not print spaces between brackets."},react_default.a.createElement("input",{type:"checkbox",id:"bracketSpacing",className:"form-check-input",checked:!bracketSpacing,onChange:function onChange(){return setBracketSpacing(!bracketSpacing);}}),"--no-bracket-spacing"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{htmlFor:"explicitTypes",title:"Change when type aliases are used."},"--explicit-types"),react_default.a.createElement("select",{className:"form-control",id:"explicitTypes",value:explicitTypes,onChange:function onChange(e){return setExplicitTypes(e.target.value);}},react_default.a.createElement("option",{value:"always",title:"Prefer the explicit types `uint256`, `int256`, and `bytes1`."},"Always"),react_default.a.createElement("option",{value:"never",title:"Prefer the type aliases `uint`, `int`, and `byte`."},"Never"),react_default.a.createElement("option",{value:"preserve",title:"Respect the type used by the developer."},"Preserve"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label"},react_default.a.createElement("input",{type:"checkbox",id:"spacedExp",className:"form-check-input",checked:spacedExp,onChange:function onChange(){return setSpacedExp(!spacedExp);}}),"--spaced-exp"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("a",{title:"To use in your projects.",className:"btn btn-primary btn-block",href:URL.createObjectURL(new Blob([standalone_default.a.format("// https://prettier.io/docs/en/configuration.html\nmodule.exports = {\n  // Global configuration\n  printWidth: ".concat(JSON.stringify(printWidth),",\n  tabWidth: ").concat(JSON.stringify(tabWidth),",\n  useTabs: ").concat(JSON.stringify(useTabs),",\n  // Common configuration\n  bracketSpacing: ").concat(JSON.stringify(bracketSpacing),",\n  // Solidity configuration\n  explicitTypes: ").concat(JSON.stringify(explicitTypes),",\n  spacedExp: ").concat(JSON.stringify(spacedExp),"\n}"),{parser:"babel",plugins:[parser_babylon_default.a]})],{type:"application/javascript"})),download:"prettier.config.js"},react_default.a.createElement("span",null,"Download configuration"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("button",{title:"Prettify",className:classnames_default()("btn","btn-primary","btn-block",{disabled:currentFile.length===0}),onClick:function onClick(event){event.preventDefault();_onClick();},disabled:currentFile.length===0},react_default.a.createElement("span",null,react_default.a.createElement("span",{className:"icon-prettier"})," Prettify"," ",currentFile.length?currentFile:"<no file selected>"))))))));};/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==="localhost"||// [::1] is the IPv6 localhost address.
window.location.hostname==="[::1]"||// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if( true&&"serviceWorker"in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener("load",function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service "+"worker. To learn more, visit https://bit.ly/CRA-PWA");});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==="installed"){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log("New content is available and will be used when all "+"tabs for this page are closed. See https://bit.ly/CRA-PWA.");// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log("Content is cached for offline use.");// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error("Error during service worker registration:",error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get("content-type");if(response.status===404||contentType!=null&&contentType.indexOf("javascript")===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log("No internet connection found. App is running in offline mode.");});}function unregister(){if("serviceWorker"in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();});}}
// CONCATENATED MODULE: ./src/index.js
react_dom_default.a.render(react_default.a.createElement(src_App,null),document.getElementById("root"));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

/***/ }),

/***/ 3:
/***/ (function(module) {

module.exports = {"name":"remix-prettier","version":"1.0.0-alpha.1","description":"A plugin for Remix, Ethereum-IDE that will apply formatting rules on Solidity code based on industry best practices.","private":true,"author":"Klaus Hott <klahott@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/BlockchainLabsNZ/remix-prettier/issues"},"homepage":"https://remix-prettier.netlify.com","dependencies":{"@githubprimer/octicons-react":"^8.5.0","bootstrap":"^4.3.1","classnames":"^2.2.6","console-feed":"^2.8.8","prettier-plugin-solidity":"BlockchainLabsNZ/prettier-plugin-solidity.git#standalone","react":"^16.8.6","react-dom":"^16.8.6","react-scripts":"3.0.1","remix-plugin":"^0.0.2-alpha.11","styled-components":"^4.3.1"},"devDependencies":{"prettier":"^1.18.2","react-app-rewired":"^2.1.3"},"scripts":{"start":"react-app-rewired start","build":"react-app-rewired build","test":"react-app-rewired test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}};

/***/ })

},[[12,1,4]]]);
//# sourceMappingURL=main.c612bf3b.chunk.js.map
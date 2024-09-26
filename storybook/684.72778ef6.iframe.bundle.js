"use strict";(self.webpackChunkddangkong_frontend=self.webpackChunkddangkong_frontend||[]).push([[684],{"./src/components/common/Button/Button.styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>bottomButtonLayout,l:()=>buttonLayout});var emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Theme=__webpack_require__("./src/styles/Theme.ts"),getBorderRadius=__webpack_require__("./src/styles/utils/getBorderRadius.ts");const utils_getFontSize=fontSize=>{switch(fontSize){case"small":return Theme.S.typography.caption.fontSize;case"medium":default:return Theme.S.typography.headline2.fontSize;case"large":return Theme.S.typography.headline1.fontSize}};var _ref={name:"10t0zvp",styles:"width:32rem;padding:2rem 0"},_ref2={name:"10t0zvp",styles:"width:32rem;padding:2rem 0"},_ref3={name:"1d06pcm",styles:"width:12rem;padding:1.6rem 0"},_ref4={name:"g089ls",styles:"width:6.8rem;padding:0.8rem 0"};const utils_getSizeStyles=size=>{switch(size){case"small":return _ref4;case"medium":return _ref3;case"large":return _ref2;default:return _ref}};var Button_styled_ref={name:"1wsejju",styles:"position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%"};const buttonLayout=({disabled,size,radius,fontSize,bottom})=>(0,emotion_react_browser_esm.AH)("display:flex;justify-content:center;",utils_getSizeStyles(size),";border:none;border-radius:",(0,getBorderRadius.A)(radius),";background-color:",disabled?Theme.S.color.peanut300:Theme.S.color.peanut400,";font-weight:bold;font-size:",utils_getFontSize(fontSize),";cursor:",disabled?"not-allowed":"pointer",";",bottom&&Button_styled_ref,";",""),bottomButtonLayout={name:"o8a8jf",styles:"position:fixed;bottom:0;width:100%"}},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Button_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.styled.ts"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const Button=({text,onClick,disabled,size,radius,fontSize,bottom,...props})=>(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Y)("button",{onClick,disabled,css:(0,_Button_styled__WEBPACK_IMPORTED_MODULE_1__.l)({disabled,size,radius,fontSize,bottom}),...props,children:text}),__WEBPACK_DEFAULT_EXPORT__=Button;Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{text:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:""},radius:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:""},fontSize:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:""},bottom:{required:!1,tsType:{name:"boolean"},description:""}},composes:["ButtonHTMLAttributes"]}},"./src/components/common/ErrorBoundary/AsyncErrorBoundary.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ErrorBoundary_AsyncErrorBoundary});var errorboundary=__webpack_require__("./node_modules/@sentry/react/build/esm/errorboundary.js"),currentScopes=__webpack_require__("./node_modules/@sentry/core/build/esm/currentScopes.js"),esm_exports=__webpack_require__("./node_modules/@sentry/core/build/esm/exports.js"),QueryErrorResetBoundary=__webpack_require__("./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js"),react=__webpack_require__("./node_modules/react/index.js"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const DeferredComponent=({children})=>{const[isDeferred,setIsDeferred]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{const timeoutId=setTimeout((()=>{setIsDeferred(!0)}),300);return()=>clearTimeout(timeoutId)}),[]),isDeferred?(0,emotion_react_jsx_runtime_browser_esm.Y)(emotion_react_jsx_runtime_browser_esm.FK,{children}):null},DeferredComponent_DeferredComponent=DeferredComponent;DeferredComponent.__docgenInfo={description:"",methods:[],displayName:"DeferredComponent"};var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Button=__webpack_require__("./src/components/common/Button/Button.tsx");const errorFallbackLayout={name:"l8or78",styles:"display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2rem;height:80vh;padding:2.4rem"},errorImage={name:"137ewef",styles:"width:16rem;height:16rem"},errorText={name:"15tabo2",styles:"font-size:1.6rem;line-height:2rem;text-align:center;word-break:keep-all"},fallbackButtonContainer={name:"10zw2ye",styles:"display:flex;flex-direction:column;gap:2rem"},errorDdangkong_namespaceObject=__webpack_require__.p+"static/media/errorDdangkong.d4e3eff5.png";var utils_error=__webpack_require__("./src/utils/error.ts");const AsyncErrorFallback=({error,resetError})=>{const navigate=(0,dist.Zp)();return(0,emotion_react_jsx_runtime_browser_esm.FD)("section",{css:errorFallbackLayout,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{src:errorDdangkong_namespaceObject,alt:"에러나서 슬픈 땅콩",css:errorImage}),(0,emotion_react_jsx_runtime_browser_esm.Y)("h2",{css:errorText,children:error instanceof utils_error.e&&error.message}),(0,emotion_react_jsx_runtime_browser_esm.FD)("div",{css:fallbackButtonContainer,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)(Button.A,{onClick:resetError,text:"다시 시도",size:"medium",radius:"medium"}),(0,emotion_react_jsx_runtime_browser_esm.Y)(Button.A,{onClick:()=>{navigate("/")},text:"홈으로",size:"medium",radius:"medium"})]})]})},AsyncErrorFallback_AsyncErrorFallback=AsyncErrorFallback;AsyncErrorFallback.__docgenInfo={description:"",methods:[],displayName:"AsyncErrorFallback"};const AsyncErrorBoundary=({pendingFallback,children})=>{const{reset}=(0,QueryErrorResetBoundary.h)();return(0,emotion_react_jsx_runtime_browser_esm.Y)(errorboundary.tH,{onReset:reset,fallback:({error,resetError})=>(0,emotion_react_jsx_runtime_browser_esm.Y)(AsyncErrorFallback_AsyncErrorFallback,{error,resetError}),onError:error=>{if(!(error instanceof utils_error.e))throw error;(0,currentScopes.v4)((scope=>{scope.setLevel("warning"),scope.setTag("api","internalServerError"),(0,esm_exports.Cp)(new Error(error.message))}))},children:(0,emotion_react_jsx_runtime_browser_esm.Y)(react.Suspense,{fallback:(0,emotion_react_jsx_runtime_browser_esm.Y)(DeferredComponent_DeferredComponent,{children:pendingFallback}),children})})},ErrorBoundary_AsyncErrorBoundary=AsyncErrorBoundary;AsyncErrorBoundary.__docgenInfo={description:"",methods:[],displayName:"AsyncErrorBoundary",props:{pendingFallback:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/components/layout/Content/Content.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Content_Content});const contentLayout={name:"v9f8bz",styles:"display:flex;flex-direction:column;align-items:center;gap:1.6rem;height:85vh;padding:0 2.4rem"};var emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const Content=({children})=>(0,emotion_react_jsx_runtime_browser_esm.Y)("section",{css:contentLayout,children}),Content_Content=Content;Content.__docgenInfo={description:"",methods:[],displayName:"Content"}},"./src/styles/utils/getBorderRadius.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _styles_Theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/Theme.ts");const __WEBPACK_DEFAULT_EXPORT__=radius=>{switch(radius){case"small":return _styles_Theme__WEBPACK_IMPORTED_MODULE_0__.S.borderRadius.radius10;case"medium":return _styles_Theme__WEBPACK_IMPORTED_MODULE_0__.S.borderRadius.radius20;case"large":return _styles_Theme__WEBPACK_IMPORTED_MODULE_0__.S.borderRadius.radius30;default:return"0"}}}}]);
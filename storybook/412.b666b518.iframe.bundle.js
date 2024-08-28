"use strict";(self.webpackChunkddangkong_frontend=self.webpackChunkddangkong_frontend||[]).push([[412],{"./src/components/common/InviteModal/InviteModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>InviteModal_InviteModal});var lib=__webpack_require__("./node_modules/react-qr-code/lib/index.js"),es=__webpack_require__("./node_modules/recoil/es/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Theme=__webpack_require__("./src/styles/Theme.ts");const inviteModalLayout=(0,emotion_react_browser_esm.AH)("background-color:",Theme.S.color.peanut300,";",""),inviteModalTitle={name:"arzv6g",styles:"font-size:1.6rem;text-align:center"},inviteModalUl={name:"zmgl3t",styles:"display:flex;flex-direction:column;justify-content:center;gap:2rem"},qrcodeWrapper=(0,emotion_react_browser_esm.AH)("display:flex;justify-content:center;align-items:center;width:100%;height:20rem;border-radius:",Theme.S.borderRadius.radius10,";background-color:white;",""),inviteModalLi=(0,emotion_react_browser_esm.AH)("display:flex;justify-content:center;align-items:center;gap:0.8rem;padding:0.8rem;border-radius:",Theme.S.borderRadius.radius10,";background-color:#ffff;",""),inviteModalLinkButton={name:"gfehpl",styles:"width:100%;padding:1.6rem 0.4rem;background:none;border:none;cursor:pointer"},inviteModalLinkButtonInfoWrapper={name:"1eoy87d",styles:"display:flex;justify-content:space-between"},inviteModalText={name:"1l7fe3o",styles:"overflow:hidden;width:95%;font-size:1.4rem;text-overflow:ellipsis"},inviteModalCopyIcon={name:"1p82uuh",styles:"width:10%"};var react=__webpack_require__("./node_modules/react/index.js");const InviteModal_useClipBoard=()=>{const[isCopied,setIsCopied]=(0,react.useState)(!1);return{isCopied,copyToClipboard:async text=>{await navigator.clipboard.writeText(text),setIsCopied(!0),setTimeout((()=>setIsCopied(!1)),2e3)}}};var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx");const copyIcon_namespaceObject=__webpack_require__.p+"static/media/copyIcon.d9b466b1.png";var url=__webpack_require__("./src/constants/url.ts"),ToastProvider=__webpack_require__("./src/providers/ToastProvider/ToastProvider.tsx");const hooks_useToast=()=>{const toast=(0,react.useContext)(ToastProvider.$);if(!toast)throw new Error("ToastContext를 찾을 수 없습니다.");return toast};var atom=__webpack_require__("./src/recoil/atom.ts"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const InviteModal=({isOpen,onClose})=>{const roomUuid=(0,es.vc)(atom.k),inviteUrl=(0,url.MY)(roomUuid),{copyToClipboard}=InviteModal_useClipBoard(),{show}=hooks_useToast();return(0,emotion_react_jsx_runtime_browser_esm.FD)(Modal.A,{isOpen,onClose,css:inviteModalLayout,children:[(0,emotion_react_jsx_runtime_browser_esm.FD)(Modal.A.Header,{position:"center",children:[(0,emotion_react_jsx_runtime_browser_esm.Y)(Modal.A.Title,{css:inviteModalTitle,children:"초대하기"}),(0,emotion_react_jsx_runtime_browser_esm.Y)(Modal.A.IconButton,{onClick:onClose})]}),(0,emotion_react_jsx_runtime_browser_esm.Y)(Modal.A.Content,{children:(0,emotion_react_jsx_runtime_browser_esm.FD)("ul",{css:inviteModalUl,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("li",{children:(0,emotion_react_jsx_runtime_browser_esm.Y)("div",{css:qrcodeWrapper,children:(0,emotion_react_jsx_runtime_browser_esm.Y)(lib.Ay,{style:{width:"50%",height:"50%"},value:inviteUrl})})}),(0,emotion_react_jsx_runtime_browser_esm.Y)("li",{css:inviteModalLi,children:(0,emotion_react_jsx_runtime_browser_esm.Y)("button",{onClick:()=>{copyToClipboard(inviteUrl),show("링크가 복사되었습니다!")},css:inviteModalLinkButton,children:(0,emotion_react_jsx_runtime_browser_esm.FD)("div",{css:inviteModalLinkButtonInfoWrapper,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("span",{css:inviteModalText,children:"초대 링크 복사"}),(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{src:copyIcon_namespaceObject,alt:"복사하기 이미지",css:inviteModalCopyIcon})]})})})]})}),(0,emotion_react_jsx_runtime_browser_esm.Y)(Modal.A.Footer,{buttonPosition:"center",children:(0,emotion_react_jsx_runtime_browser_esm.Y)(Modal.A.TextButton,{buttonWidth:"100%",onClick:onClose,children:"닫기"})})]})},InviteModal_InviteModal=InviteModal;InviteModal.__docgenInfo={description:"",methods:[],displayName:"InviteModal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./src/recoil/atom.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>roomUuidState,u:()=>memberInfoState});var recoil__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/recoil/es/index.js");const memberInfoState=(0,recoil__WEBPACK_IMPORTED_MODULE_0__.eU)({key:"memberInfo",default:{memberId:null,nickname:null,isMaster:!1}}),roomUuidState=(0,recoil__WEBPACK_IMPORTED_MODULE_0__.eU)({key:"roomUuid",default:""})}}]);
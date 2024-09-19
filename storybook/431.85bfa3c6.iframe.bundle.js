"use strict";(self.webpackChunkddangkong_frontend=self.webpackChunkddangkong_frontend||[]).push([[431],{"./src/apis/balanceContent.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gd:()=>fetchBalanceContent,O:()=>fetchRoundVoteResult,bR:()=>checkMyGameStatus,jd:()=>fetchVoteIsFinished,sl:()=>voteBalanceContent});var _fetcher__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/fetcher.ts"),_constants_url__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/url.ts");const fetchBalanceContent=async roomId=>{const res=await _fetcher__WEBPACK_IMPORTED_MODULE_0__.A.get({url:_constants_url__WEBPACK_IMPORTED_MODULE_1__.H$.balanceContent(roomId)});return await res.json()},voteBalanceContent=async({optionId,contentId,roomId,memberId})=>{const res=await _fetcher__WEBPACK_IMPORTED_MODULE_0__.A.post({url:_constants_url__WEBPACK_IMPORTED_MODULE_1__.H$.vote(roomId,contentId),headers:{"Content-Type":"application/json"},body:{memberId,optionId}});return await res.json()},fetchRoundVoteResult=async({contentId,roomId})=>{const res=await _fetcher__WEBPACK_IMPORTED_MODULE_0__.A.get({url:_constants_url__WEBPACK_IMPORTED_MODULE_1__.H$.roundVoteResult(roomId,contentId)});return await res.json()},checkMyGameStatus=async({roomId,currentRound})=>{const res=await _fetcher__WEBPACK_IMPORTED_MODULE_0__.A.get({url:_constants_url__WEBPACK_IMPORTED_MODULE_1__.H$.myGameStatus(roomId,currentRound),headers:{"Content-Type":"application/json"}});return await res.json()},fetchVoteIsFinished=async({contentId,roomId})=>{const res=await _fetcher__WEBPACK_IMPORTED_MODULE_0__.A.get({url:_constants_url__WEBPACK_IMPORTED_MODULE_1__.H$.voteIsFinished(roomId,contentId)});return await res.json()}},"./src/components/SelectContainer/Timer/Timer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Timer_Timer});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),react=__webpack_require__("./node_modules/react/index.js"),config=__webpack_require__("./src/constants/config.ts");const formatLeftRoundTime=leftRoundTime=>{const minutes=Math.floor(leftRoundTime/60),seconds=leftRoundTime%60;return`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`},convertMsecToSecond=msec=>msec/config.S2,hooks_useTimer=({timeLimit,isSelectedOption,isVoted,vote})=>{const[leftRoundTime,setLeftRoundTime]=(0,react.useState)(convertMsecToSecond(timeLimit)),[barWidthPercent,setBarWidthPercent]=(0,react.useState)(100),isVoteTimeout=leftRoundTime<=0,isAlmostFinished=leftRoundTime<=5,timeout=(0,react.useRef)();return(0,react.useEffect)((()=>{isVoteTimeout&&(isSelectedOption&&!isVoted&&vote(),clearInterval(timeout.current))}),[isVoteTimeout,isSelectedOption,isVoted,vote]),(0,react.useEffect)((()=>{const timeLimitPerSecond=convertMsecToSecond(timeLimit),DECREASE_PERCENT=100/timeLimitPerSecond;return setLeftRoundTime(timeLimitPerSecond),timeout.current=setInterval((()=>{setLeftRoundTime((prev=>prev-1)),setBarWidthPercent((prevWidth=>prevWidth>0?prevWidth-DECREASE_PERCENT:0))}),config.S2),()=>{clearInterval(timeout.current)}}),[timeLimit]),{leftRoundTime,barWidthPercent,isAlmostFinished}};var SelectButton_hook=__webpack_require__("./src/components/common/SelectButton/SelectButton.hook.ts"),useBalanceContentQuery=__webpack_require__("./src/hooks/useBalanceContentQuery.ts");const hooks_useVoteTimer=({roomId,selectedId,isVoted,completeSelection,showModal})=>{const{balanceContent}=(0,useBalanceContentQuery.A)(roomId),timeLimit=balanceContent.timeLimit||1e4,{mutate:vote}=(0,SelectButton_hook.A)({selectedId,contentId:balanceContent.contentId,completeSelection,showModal}),{leftRoundTime,barWidthPercent,isAlmostFinished}=hooks_useTimer({timeLimit,isSelectedOption:Boolean(selectedId),isVoted,vote});return{leftRoundTime,barWidthPercent,isAlmostFinished}};var emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Theme=__webpack_require__("./src/styles/Theme.ts");const shake=emotion_react_browser_esm.i7`
  0%{
      transform: rotate(0deg);
    }
    10%{
      transform: scale(1.5) rotate(45deg);
    }
    20%{
      transform: scale(1.5) rotate(-45deg);
    }
    30%{
      transform:  rotate(30deg);
    }
    40%{
      transform:  rotate(-30deg);
    }
    50%{
      transform: rotate(10deg);
    }
    60%{
      transform: rotate(-10deg);
    }
    100%{
      transform: rotate(0deg);
    }
`,timerLayout=(0,emotion_react_browser_esm.AH)("display:flex;position:relative;align-items:center;width:100%;height:3.2rem;padding:0 1rem;border-radius:",Theme.S.borderRadius.radius30,";background-color:",Theme.S.color.peanut200,";box-sizing:border-box;",""),timerWrapper=width=>(0,emotion_react_browser_esm.AH)("display:flex;position:absolute;right:",100-width,"%;flex-direction:column;justify-content:center;align-items:center;gap:2rem;height:4rem;transition:all 1s linear;",""),timerIcon={name:"ryq21y",styles:"position:absolute;width:4.8rem;height:4.8rem"},timerIconShake=(0,emotion_react_browser_esm.AH)("animation:",shake," 1s linear infinite;",""),timerText=isAlmostFinished=>(0,emotion_react_browser_esm.AH)("position:absolute;top:5.2rem;color:",isAlmostFinished?"red":"black",";font-weight:bold;font-size:1.6rem;","");var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/modern/useQuery.js"),balanceContent=__webpack_require__("./src/apis/balanceContent.ts"),queryKeys=__webpack_require__("./src/constants/queryKeys.ts");const hooks_useVoteIsFinishedQuery=({contentId,enabled})=>{const{roomId}=(0,dist.g)(),voteIsFinishedQuery=(0,useQuery.I)({queryKey:[queryKeys.e.roundIsFinished,Number(roomId),contentId],queryFn:async()=>{if(void 0===contentId)throw new Error("contentId 가 존재하지 않습니다.");return await(0,balanceContent.jd)({roomId:Number(roomId),contentId})},enabled,refetchInterval:query=>!(query.state.error&&query.state.fetchFailureCount>=config.A3)&&config.S2,refetchIntervalInBackground:!0,gcTime:0});return{...voteIsFinishedQuery,isFinished:voteIsFinishedQuery.data?.isFinished}};var routes=__webpack_require__("./src/constants/routes.ts");const hooks_useVoteIsFinished=({contentId,isFetching})=>{const navigate=(0,dist.Zp)(),{roomId}=(0,dist.g)(),{isFinished}=hooks_useVoteIsFinishedQuery({contentId,enabled:!!contentId&&!isFetching});return(0,react.useEffect)((()=>{isFinished&&!isFetching&&navigate(routes.b.roundResult(Number(roomId)),{replace:!0})}),[isFinished,navigate,roomId,isFetching]),{isFinished}},ddangkongTimer_namespaceObject=__webpack_require__.p+"static/media/ddangkongTimer.5927106e.png";var emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const Timer=({selectedId,isVoted,completeSelection,showModal})=>{const{roomId}=(0,dist.g)(),{balanceContent,isFetching}=(0,useBalanceContentQuery.A)(Number(roomId)),{barWidthPercent,leftRoundTime,isAlmostFinished}=hooks_useVoteTimer({roomId:Number(roomId),selectedId,isVoted,completeSelection,showModal});return hooks_useVoteIsFinished({contentId:balanceContent.contentId,isFetching}),(0,emotion_react_jsx_runtime_browser_esm.FD)("section",{css:timerLayout,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("div",{css:(width=barWidthPercent,(0,emotion_react_browser_esm.AH)("display:flex;justify-content:center;align-items:center;width:",width,"%;height:60%;border-radius:",Theme.S.borderRadius.radius30,";background-color:",Theme.S.color.peanut500,";transition:width 1s linear;",""))}),(0,emotion_react_jsx_runtime_browser_esm.FD)("div",{css:timerWrapper(barWidthPercent),children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{css:[timerIcon,isAlmostFinished&&timerIconShake,"",""],src:ddangkongTimer_namespaceObject,alt:"타이머"}),(0,emotion_react_jsx_runtime_browser_esm.Y)("span",{css:timerText(isAlmostFinished),children:formatLeftRoundTime(leftRoundTime)})]})]});var width},Timer_Timer=Timer;Timer.__docgenInfo={description:"",methods:[],displayName:"Timer",props:{selectedId:{required:!0,tsType:{name:"number"},description:""},isVoted:{required:!0,tsType:{name:"boolean"},description:""},completeSelection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},showModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./src/components/common/SelectButton/SelectButton.hook.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@tanstack/react-query/build/modern/useMutation.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-router/dist/index.js"),recoil__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/recoil/es/index.js"),_apis_balanceContent__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/apis/balanceContent.ts"),_hooks_useToast__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/useToast.ts"),_recoil_atom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/recoil/atom.ts"),_utils_error__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils/error.ts");const __WEBPACK_DEFAULT_EXPORT__=({selectedId,contentId,completeSelection,showModal})=>{const{roomId}=(0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.g)(),memberInfo=(0,recoil__WEBPACK_IMPORTED_MODULE_0__.vc)(_recoil_atom__WEBPACK_IMPORTED_MODULE_3__.u),{show}=(0,_hooks_useToast__WEBPACK_IMPORTED_MODULE_2__.A)();return(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.n)({mutationFn:async()=>{if(void 0===contentId)throw new Error("contentId 가 존재하지 않습니다.");return await(0,_apis_balanceContent__WEBPACK_IMPORTED_MODULE_1__.sl)({roomId:Number(roomId),optionId:selectedId,contentId,memberId:Number(memberInfo.memberId)})},onSuccess:()=>{completeSelection()},onError:error=>{error instanceof _utils_error__WEBPACK_IMPORTED_MODULE_4__.D?show(error.message):showModal()},networkMode:"always",throwOnError:error=>{return(status=error.status)>=500&&555!==status;var status}})}},"./src/hooks/useBalanceContentQuery.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/modern/useSuspenseQuery.js"),_apis_balanceContent__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/balanceContent.ts"),_constants_queryKeys__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKeys.ts");const __WEBPACK_DEFAULT_EXPORT__=roomId=>{const balanceContentQuery=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.U)({queryKey:[_constants_queryKeys__WEBPACK_IMPORTED_MODULE_1__.e.balanceContent,Number(roomId)],queryFn:async()=>await(0,_apis_balanceContent__WEBPACK_IMPORTED_MODULE_0__.Gd)(Number(roomId))});return{...balanceContentQuery,balanceContent:balanceContentQuery.data}}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_providers_ToastProvider_ToastProvider__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/providers/ToastProvider/ToastProvider.tsx");const __WEBPACK_DEFAULT_EXPORT__=()=>{const toast=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_ToastProvider_ToastProvider__WEBPACK_IMPORTED_MODULE_1__.$);if(!toast)throw new Error("ToastContext를 찾을 수 없습니다.");return toast}},"./src/recoil/atom.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>roomUuidState,u:()=>memberInfoState});var recoil__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/recoil/es/index.js");const memberInfoState=(0,recoil__WEBPACK_IMPORTED_MODULE_0__.eU)({key:"memberInfo",default:{memberId:null,nickname:null,isMaster:!1}}),roomUuidState=(0,recoil__WEBPACK_IMPORTED_MODULE_0__.eU)({key:"roomUuid",default:""})}}]);
//# sourceMappingURL=431.85bfa3c6.iframe.bundle.js.map
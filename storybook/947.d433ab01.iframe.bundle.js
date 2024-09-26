"use strict";(self.webpackChunkddangkong_frontend=self.webpackChunkddangkong_frontend||[]).push([[947],{"./src/components/layout/Header/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{tT:()=>BackHeader,v4:()=>RoomSettingHeader,gK:()=>RoundHeader,Ub:()=>TitleHeader,Ay:()=>Header_Header});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),es=__webpack_require__("./node_modules/recoil/es/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Theme=__webpack_require__("./src/styles/Theme.ts");const headerLayout=isCenter=>(0,emotion_react_browser_esm.AH)("display:flex;justify-content:",isCenter?"center":"space-between",";align-items:center;height:15vh;padding:0 2.4rem;",""),roundText={name:"1icein2",styles:"display:flex;align-items:center;width:2.4rem;height:2.4rem;font-weight:bold;font-size:1.6rem"},buttonWrapper={name:"1ocs895",styles:"display:flex;justify-content:center;align-items:center;width:2rem;height:2rem"},gameTitle={name:"1anrxxk",styles:"font-weight:bold;font-size:2rem"},iconImage={name:"fmrzco",styles:"display:flex;align-items:center;width:2.4rem;height:2.4rem"},MatchingResultHeaderContainer={name:"19iqmqi",styles:"display:flex;flex-direction:column;align-items:center;gap:1.2rem"},matchingResultTitle=(0,emotion_react_browser_esm.AH)(Theme.S.typography.slogan,";",""),matchingResultCaption={name:"ywz92v",styles:"font-weight:bold;font-size:1.2rem"};var react=__webpack_require__("./node_modules/react/index.js");var useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/modern/useMutation.js"),room=__webpack_require__("./src/apis/room.ts"),atom=__webpack_require__("./src/recoil/atom.ts");var routes=__webpack_require__("./src/constants/routes.ts");const hooks_useRoutePath=()=>{const location=(0,dist.zy)(),{roomId}=(0,dist.g)(),currentPath={isNicknamePage:location.pathname.startsWith(routes.b.nickname),isReadyPage:location.pathname===routes.b.ready(Number(roomId)),isRoundResultPage:location.pathname===routes.b.roundResult(Number(roomId)),isMatchingResultPage:location.pathname===routes.b.gameResult(Number(roomId))};return{isNicknamePage:currentPath.isNicknamePage,isReadyPage:currentPath.isReadyPage,isRoundResultPage:currentPath.isRoundResultPage,isMatchingResultPage:currentPath.isMatchingResultPage}},arrowLeft_namespaceObject=__webpack_require__.p+"static/media/arrowLeft.d6435a9d.svg",exitIcon_namespaceObject=__webpack_require__.p+"static/media/exitIcon.88be77da.png",settingsIcon_namespaceObject=__webpack_require__.p+"static/media/settingsIcon.8588567d.svg";var RoomSettingModal=__webpack_require__("./src/components/common/RoomSettingModal/RoomSettingModal.tsx"),useBalanceContentQuery=__webpack_require__("./src/hooks/useBalanceContentQuery.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const Header=()=>{const{isNicknamePage,isReadyPage,isRoundResultPage,isMatchingResultPage}=hooks_useRoutePath();return(0,react.useEffect)((()=>{const handleKeyDown=event=>{("F5"===event.key||event.ctrlKey&&"r"===event.key)&&event.preventDefault()};window.addEventListener("keydown",handleKeyDown);const handleBeforeUnload=event=>{event.preventDefault(),alert("새로고침 시 게임에서 나가질 수 있습니다")};return window.addEventListener("beforeunload",handleBeforeUnload),()=>{window.removeEventListener("keydown",handleKeyDown),window.removeEventListener("beforeunload",handleBeforeUnload)}}),[]),isNicknamePage?(0,emotion_react_jsx_runtime_browser_esm.Y)(TitleHeader,{title:"닉네임 설정"}):isReadyPage?(0,emotion_react_jsx_runtime_browser_esm.Y)(RoomSettingHeader,{title:"밸런스 게임"}):isRoundResultPage?(0,emotion_react_jsx_runtime_browser_esm.Y)(RoundHeader,{}):isMatchingResultPage?(0,emotion_react_jsx_runtime_browser_esm.Y)(MatchingResultHeader,{title:"매칭 결과"}):void 0},MatchingResultHeader=({title})=>(0,emotion_react_jsx_runtime_browser_esm.Y)("header",{css:headerLayout(!0),children:(0,emotion_react_jsx_runtime_browser_esm.FD)("div",{css:MatchingResultHeaderContainer,children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("h1",{css:matchingResultTitle,children:title}),(0,emotion_react_jsx_runtime_browser_esm.Y)("h2",{css:matchingResultCaption,children:"매칭도를 통해 당신과 가장 잘 맞는 사람을 알아보세요😊"})]})}),TitleHeader=({title})=>(0,emotion_react_jsx_runtime_browser_esm.Y)("header",{css:headerLayout(!0),children:(0,emotion_react_jsx_runtime_browser_esm.Y)("h1",{css:gameTitle,children:title})}),RoomSettingHeader=({title})=>{const{show}=(0,useModal.A)(),{handleExit}=(()=>{const{memberId}=(0,es.vc)(atom.u),navigate=(0,dist.Zp)(),{roomId}=(0,dist.g)(),exitRoomMutation=(0,useMutation.n)({mutationFn:({roomId,memberId})=>(0,room.Gn)(roomId,memberId),onSuccess:()=>{navigate("/")}});return{handleExit:()=>{exitRoomMutation.mutate({roomId:Number(roomId),memberId:Number(memberId)})}}})(),{isMaster}=(0,es.vc)(atom.u);return(0,emotion_react_jsx_runtime_browser_esm.FD)("header",{css:headerLayout(),children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("button",{onClick:handleExit,css:buttonWrapper,children:(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{src:exitIcon_namespaceObject,alt:"방 나가기",css:iconImage})}),(0,emotion_react_jsx_runtime_browser_esm.Y)("h1",{css:gameTitle,children:title}),isMaster?(0,emotion_react_jsx_runtime_browser_esm.Y)("button",{onClick:()=>{show(RoomSettingModal.A)},css:buttonWrapper,children:(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{src:settingsIcon_namespaceObject,alt:"방 설정",css:iconImage})}):(0,emotion_react_jsx_runtime_browser_esm.Y)("span",{css:roundText})]})},RoundHeader=()=>{const{roomId}=(0,dist.g)(),isRoundResultPage=location.pathname===routes.b.roundResult(Number(roomId)),{balanceContent}=(0,useBalanceContentQuery.A)(Number(roomId)),title=isRoundResultPage?"투표 결과":"밸런스 게임";return(0,emotion_react_jsx_runtime_browser_esm.FD)("header",{css:headerLayout(),children:[(0,emotion_react_jsx_runtime_browser_esm.FD)("span",{css:roundText,children:[balanceContent.currentRound,"/",balanceContent.totalRound]}),(0,emotion_react_jsx_runtime_browser_esm.Y)("h1",{css:gameTitle,children:title}),(0,emotion_react_jsx_runtime_browser_esm.Y)("span",{css:roundText})]})},BackHeader=({title})=>{const navigate=(0,dist.Zp)();return(0,emotion_react_jsx_runtime_browser_esm.FD)("header",{css:headerLayout(),children:[(0,emotion_react_jsx_runtime_browser_esm.Y)("button",{onClick:()=>{navigate(-1)},css:buttonWrapper,children:(0,emotion_react_jsx_runtime_browser_esm.Y)("img",{src:arrowLeft_namespaceObject,alt:"뒤로 가기"})}),(0,emotion_react_jsx_runtime_browser_esm.Y)("h1",{css:gameTitle,children:title}),(0,emotion_react_jsx_runtime_browser_esm.Y)("span",{css:roundText})]})},Header_Header=Header;MatchingResultHeader.__docgenInfo={description:"",methods:[],displayName:"MatchingResultHeader",props:{title:{required:!0,tsType:{name:"string"},description:""}}},TitleHeader.__docgenInfo={description:"",methods:[],displayName:"TitleHeader",props:{title:{required:!0,tsType:{name:"string"},description:""}}},RoomSettingHeader.__docgenInfo={description:"",methods:[],displayName:"RoomSettingHeader",props:{title:{required:!0,tsType:{name:"string"},description:""}}},RoundHeader.__docgenInfo={description:"",methods:[],displayName:"RoundHeader"},BackHeader.__docgenInfo={description:"",methods:[],displayName:"BackHeader",props:{title:{required:!0,tsType:{name:"string"},description:""}}},Header.__docgenInfo={description:"",methods:[],displayName:"Header"}}}]);
"use strict";(self["webpackChunkmimyz_h5"]=self["webpackChunkmimyz_h5"]||[]).push([[550],{99:function(e,t,a){a.d(t,{R:function(){return b},Z:function(){return k}});var l=a(3396),i=a(7139),n=a(4870);const o=(0,l.Uk)("登录");var s={__name:"SmallBtn",props:{inline:{type:Boolean,default:!0},style:{type:Object,default:()=>({})}},emits:["click"],setup(e,{emit:t}){const a=e,s=(0,n.qj)({display:(a.inline?"inline-":"")+"block",fontSize:"0.3rem",backgroundColor:"#f46b84",borderRadius:"0.1rem",color:"#fff",...a.style}),d=e=>{t("click",e)};return(e,t)=>((0,l.wg)(),(0,l.iD)("span",{class:"custom-btn",onClick:d,style:(0,i.j5)(s)},[(0,l.WI)(e.$slots,"icon"),(0,l.WI)(e.$slots,"default",{},(()=>[o]))],4))}},d=a(89);const r=(0,d.Z)(s,[["__scopeId","data-v-bc94e48c"]]);var c=r,u=a(2229);const v=["type","disabled"],f=(0,l.Uk)("登  录");var p={__name:"BigBtn",props:{type:{type:String,default:"button"},style:{type:Object,default:()=>({})},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},background:String},emits:["click"],setup(e,{emit:t}){const a=e,o=(0,n.qj)({...a.style,background:a.background}),s=e=>{a.loading||a.disabled||t("click",e)};return(t,a)=>((0,l.wg)(),(0,l.iD)("button",{type:e.type,disabled:e.disabled,style:(0,i.j5)({...o}),class:(0,i.C_)(["big-btn",[e.loading?"not-allow":"",e.disabled?"not-allow disabled":""]]),onClick:s},[(0,l.WI)(t.$slots,"default",{},(()=>[e.loading?((0,l.wg)(),(0,l.j4)((0,n.SU)(u.g),{key:0})):(0,l.kq)("",!0),f]))],14,v))}};const g=(0,d.Z)(p,[["__scopeId","data-v-fe1782ce"]]);var b=g,k=c},6550:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var l=a(4821),i=(a(5193),a(3396)),n=a(7139),o=a(4870),s=a(9242),d=a(5216),r=a(65),c=a(2483),u=a(99);const v=e=>((0,i.dD)("data-v-123e9186"),e=e(),(0,i.Cn)(),e),f={class:"fixed-top"},p=(0,i.Uk)("全删"),g={class:"favorite-page"},b={class:"favorite-list"},k=["onClick"],y=v((()=>(0,i._)("span",null,[(0,i._)("i",{class:"fi fi-angle-right"})],-1)));var _={__name:"index",setup(e){const t=(0,r.oR)(),a=(0,c.tv)(),v=(0,o.iH)([]),_=(0,o.iH)(0),m=(0,o.iH)(!1),h=(0,o.iH)(!1),w=(0,o.iH)("没有更多了"),C=async()=>{m.value=!0,v.value=t.state.favoriteList,_.value=t.getters.getFavoriteTotal,0===_.value&&(w.value="暂无收藏哦！"),m.value=!1,h.value=!0},j=e=>{a.push({path:`/filmdetail/${e}`,query:{id:e}})},H=()=>{d.V.confirm({title:"提示",message:"确定要清除所有收藏吗？"}).then((()=>{t.dispatch("clearFavorite"),v.value=[],_.value=0})).catch((()=>{console.log("取消！")}))};return(e,t)=>{const a=l.a;return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",f,[(0,i._)("p",null,"收藏总数："+(0,n.zw)(_.value),1),(0,i.wy)((0,i.Wm)((0,o.SU)(u.Z),{class:"all-btn",onClick:H},{default:(0,i.w5)((()=>[p])),_:1},512),[[s.F8,_.value>0]])]),(0,i._)("div",g,[(0,i.Wm)(a,{onLoad:C,loading:m.value,"onUpdate:loading":t[0]||(t[0]=e=>m.value=e),error:e.error,"onUpdate:error":t[1]||(t[1]=t=>e.error=t),finished:h.value,"finished-text":w.value},{default:(0,i.w5)((()=>[(0,i._)("div",b,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(v.value,(e=>((0,i.wg)(),(0,i.iD)("div",{class:"favorite-item",key:e.id,onClick:t=>j(e.id)},[(0,i._)("span",null,(0,n.zw)(e.filmName),1),y],8,k)))),128))])])),_:1},8,["loading","error","finished","finished-text"])])],64)}}},m=a(89);const h=(0,m.Z)(_,[["__scopeId","data-v-123e9186"]]);var w=h}}]);
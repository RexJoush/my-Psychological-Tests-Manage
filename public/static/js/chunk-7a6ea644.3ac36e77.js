(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a6ea644"],{"11f6":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"img-upload"},[n("p",[e._v("温馨提示：在点击上传之前请先选择图片!")]),n("el-upload",{attrs:{action:"action","http-request":e.modeUpload}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),n("el-button",{attrs:{size:"small",icon:"el-icon-upload",type:"danger"},on:{click:e.upload}},[e._v("点击上传")])],1),n("br"),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"70%"},attrs:{data:e.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"图片ID",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.$index+1)+" ")]}}])}),n("el-table-column",{attrs:{label:"Swiper",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("img",{staticClass:"img",attrs:{src:e.row.img_url}})]}}])}),n("el-table-column",{attrs:{label:"操作",align:"center",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"danger"},on:{click:function(n){return e.delBanner(t.row.banner_id)}}},[e._v("删除")])]}}])})],1)],1)},i=[],r=(n("96cf"),n("1da1")),o={data:function(){return{list:[],listLoading:!0,action:"http://www.rexjoush.com:3000/webapp/home/changeSwiper",mode:{}}},created:function(){this.getSwiper()},methods:{getSwiper:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.listLoading=!0,e.$api.getSwiper().then((function(t){var n=t.data.data;e.list=n,console.log("swiper",n),e.listLoading=!1})).catch((function(e){console.log("err",e)}));case 2:case"end":return t.stop()}}),t)})))()},delBanner:function(e){var t=this;this.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(n){t.$api.delSwiper({banner_id:e}).then((function(e){0===e.data.result?t.$message({type:"error",message:e.data.err}):t.$message({type:"success",message:"删除成功!"}),t.getSwiper()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"}),t.getSwiper()}))},upload:function(){var e=this,t=new FormData;t.append("img_url",this.mode),this.$api.uploadSwiper(t).then((function(t){e.$message({type:"success",message:"上传成功!"}),e.getSwiper()}))},modeUpload:function(e){this.mode=e.file}}},s=o,l=(n("e2e5"),n("2877")),c=Object(l["a"])(s,a,i,!1,null,"20b7a63e",null);t["default"]=c.exports},7807:function(e,t,n){},e2e5:function(e,t,n){"use strict";var a=n("7807"),i=n.n(a);i.a}}]);
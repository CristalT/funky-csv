!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(global,(function(){return(()=>{"use strict";var t={341:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.header="",this.content="",this.options={delimiter:",",filename:"output.csv",closure:'"'},Object.assign(this.options,t)}return t.prototype.getOptions=function(){return this.options},t.prototype.setHeader=function(t){var e=this;if(!Array.isArray(t))throw new Error("Error trying to set the CSV Header. The column names must be an array");if(this.content&&this.content.split("\n")[0].split(this.options.delimiter).length!==t.length)throw new Error("Error trying to set the CSV Header. The content cells quantity does not match with header columns.");this.header="";var n=this.options.closure;t.forEach((function(t){e.header+="".concat(n).concat(String(t).trim().replace(new RegExp(n,"g"),n+n)).concat(n).concat(e.options.delimiter)})),this.header=this.header.slice(0,-1)+"\n"},t.prototype.setContent=function(t){var e=this;if(!Array.isArray(t)||!t.every((function(t){return t&&"object"==typeof t&&!Array.isArray(t)})))throw new Error("Error trying to set the CSV Content. The content must be an objects array");t.forEach((function(t){var n=Object.values(t);if(e.header&&e.header.split(e.options.delimiter).length!==n.length)throw new Error("Error trying to set the CSV Content. The header does not match with the content cells quantity.");var r=e.options.closure;n.forEach((function(t){e.content+="".concat(r).concat(String(t).trim().replace(new RegExp(r,"g"),r+r)).concat(r).concat(e.options.delimiter)})),e.content=e.content.slice(0,-1),e.content+="\n"}))},t.prototype.getCsv=function(){return this.header+this.content},t.prototype.parseFilename=function(t){var e=null!=t?t:this.options.filename;return e.endsWith(".csv")||(e+=".csv"),e},t}();e.default=n},697:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function s(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,s)}a((r=r.apply(t,e||[])).next())}))},c=this&&this.__generator||function(t,e){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=s(n(341)),u=n(147),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.write=function(t){return i(this,void 0,void 0,(function(){var e=this;return c(this,(function(n){if("undefined"==typeof process&&"[object process]"!==Object.prototype.toString.call(process))throw new Error("Write method is not available in current environment.");return[2,new Promise((function(n,r){(0,u.writeFile)(e.parseFilename(t),e.getCsv(),(function(t){if(t)return r(t);n()}))}))]}))}))},e}(a.default);e.default=l},147:t=>{t.exports=require("fs")}},e={},n=function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}(697);return n.default})()}));
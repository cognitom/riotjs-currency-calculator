!function t(e,n,r){function i(u,a){if(!n[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(t){var e=t("riot"),n=t("./lib/convert");t("./components/app.tag"),t("./components/item.tag"),bootstrap=function(t){e.mount("app",{items:n(t)})}},{"./components/app.tag":3,"./components/item.tag":4,"./lib/convert":5,riot:2}],2:[function(t,e,n){!function(){function t(t){var e={val:t},n=t.split(/\s+in\s+/);return n[1]&&(e.val="{ "+n[1],n=n[0].slice(1).trim().split(/,\s*/),e.key=n[0],e.pos=n[1]),e}function r(e,n,r){l(e,"each");var i,o=e.outerHTML,a=e.previousSibling,c=e.parentNode,s=[],f=[];r=t(r),n.one("update",function(){c.removeChild(e)}).one("mount",function(){m(c)||(c=n.root)}).on("update",function(){var t=y(r.val,n);if(t){if(!Array.isArray(t)){var e=JSON.stringify(t);if(e==i)return;i=e,f.map(function(t){t.unmount()}),f=s=[],t=Object.keys(t).map(function(e){var n={};return n[r.key]=e,n[r.pos]=t[e],n})}v(s,t).map(function(t){var e=s.indexOf(t),n=f[e];n&&(n.unmount(),s.splice(e,1),f.splice(e,1))});var l=c.childNodes,p=Array.prototype.indexOf.call(l,a);v(t,s).map(function(e){var a=t.indexOf(e);if(!i&&r.key){var s={};s[r.key]=e,s[r.pos]=a,e=s}var d=new u({tmpl:o},{before:l[p+1+a],parent:n,root:c,loop:!0,item:e});f.splice(a,0,d)}),s=t.slice()}})}function i(t,e){h(t,function(t){1==t.nodeType&&f(t.attributes,function(n){/^(name|id)$/.test(n.name)&&(e[n.value]=t)})})}function o(t,e,n){function i(t,e,r){if(y(e)||r){var i={dom:t,expr:e};n.push(p(i,r||{}))}}h(t,function(t){var n=t.nodeType;if(3==n&&"STYLE"!=t.parentNode.tagName&&i(t,t.nodeValue),1==n){var o=t.getAttribute("each");if(o)return r(t,e,o),!1;var a=w[t.tagName.toLowerCase()];return a?(a=new u(a,{root:t,parent:e}),!1):void f(t.attributes,function(e){var n=e.name,r=e.value,o=n.split("__")[1];return i(t,r,{attr:o||n,bool:o}),o?(l(t,n),!1):void 0})}})}function u(t,e){function n(){Object.keys(c).map(function(t){w[t]=y(c[t],h||u)})}function r(){for(;C.firstChild;)v?(k=C.firstChild,b.insertBefore(C.firstChild,e.before||null)):b.appendChild(C.firstChild);m(b)||(u.root=b=h.root),u.trigger("mount"),h&&h.on("update",u.update).one("unmount",u.unmount)}var u=g.observable(this),a=[],c={},h=e.parent,v=e.loop,b=e.root,w=e.opts,x=e.item;if(v||!b.riot){b.riot=1,w=w||{},p(this,{parent:h,root:b,opts:w,children:[]}),p(this,x),f(b.attributes,function(t){var e=t.name,n=t.value;return c[e]=n,n.indexOf("{")>=0?(l(b,e),!1):void 0}),n(),h&&h.children.push(this);var k,C=d(t.tmpl);i(C,this),this.update=function(t){p(u,t),p(u,x),u.trigger("update"),n(),s(a,u,x),u.trigger("updated")},this.unmount=function(){if(v)b.removeChild(k);else{var t=b.parentNode;t&&t.removeChild(b)}if(h){var e=h.children;e.splice(e.indexOf(u),1)}u.trigger("unmount"),h&&h.off("update",u.update),mounted=!1},t.fn&&t.fn.call(this,w),o(C,this,a),this.update(),r()}}function a(t,e,n,r,i){n[t]=function(t){t=t||window.event,t.which=t.which||t.charCode||t.keyCode,t.target=t.target||t.srcElement,t.currentTarget=n,t.item=i,e.call(r,t)!==!0&&(t.preventDefault&&t.preventDefault(),t.returnValue=!1),r.update()}}function c(t,e,n){t&&(t.insertBefore(n,e),t.removeChild(e))}function s(t,e,n){f(t,function(t){var r=t.dom,i=t.attr,o=y(t.expr,e);if(null==o&&(o=""),t.value!==o){if(t.value=o,!i)return r.nodeValue=o;if((!o&&t.bool||/obj|func/.test(typeof o))&&l(r,i),"function"==typeof o)a(i,o,r,e,n);else if("if"==i){l(r,i);var u=t.stub;o?u&&c(u.parentNode,u,r):(u=t.stub=u||document.createTextNode(""),c(r.parentNode,r,u))}else if(/^(show|hide)$/.test(i))l(r,i),"hide"==i&&(o=!o),r.style.display=o?"":"none";else{if(t.bool){if(r[i]=o,!o)return;o=i}r.setAttribute(i,o)}}})}function f(t,e){for(var n=0;n<(t||[]).length;n++)e(t[n],n)===!1&&n--}function l(t,e){t.removeAttribute(e)}function p(t,e){return e&&Object.keys(e).map(function(n){t[n]=e[n]}),t}function d(t){var e=t.trim().slice(1,3).toLowerCase(),n=/td|th/.test(e)?"tr":"tr"==e?"tbody":"div";return el=document.createElement(n),el.stub=!0,el.innerHTML=t,el}function h(t,e){for(t=e(t)===!1?t.nextSibling:t.firstChild;t;)h(t,e),t=t.nextSibling}function v(t,e){return t.filter(function(t){return e.indexOf(t)<0})}function m(t){var e=t.parentNode,n=window.HTMLDocument;return e&&!(n&&e instanceof n)}var g={version:"v2.0.8",settings:{}};g.observable=function(t){t=t||{};var e={};return t.on=function(n,r){return"function"==typeof r&&n.replace(/\S+/g,function(t,n){(e[t]=e[t]||[]).push(r),r.typed=n>0}),t},t.off=function(n,r){if("*"==n)e={};else if(r)for(var i,o=e[n],u=0;i=o&&o[u];++u)i==r&&(o.splice(u,1),u--);else n.replace(/\S+/g,function(t){e[t]=[]});return t},t.one=function(e,n){return n&&(n.one=1),t.on(e,n)},t.trigger=function(n){for(var r,i=[].slice.call(arguments,1),o=e[n]||[],u=0;r=o[u];++u)r.busy||(r.busy=1,r.apply(t,r.typed?[n].concat(i):i),r.one?(o.splice(u,1),u--):o[u]!==r&&u--,r.busy=0);return t},t},function(t,e){function n(){return o.hash.slice(1)}function r(t){return t.split("/")}function i(t){t.type&&(t=n()),t!=a&&(u.trigger.apply(null,["H"].concat(r(t))),a=t)}if(this.top){var o=location,u=t.observable(),a=n(),c=window,s=t.route=function(t){t[0]?(o.hash=t,i(t)):u.on("H",t)};s.exec=function(t){t.apply(null,r(n()))},s.parser=function(t){r=t},c.addEventListener?c.addEventListener(e,i,!1):c.attachEvent("on"+e,i)}}(g,"hashchange");var y=function(){function t(t,n){return n=(t||i.join("")).replace(r(/\\{/),"￰").replace(r(/\\}/),"￱").split(o),new Function("d","return "+(n[0]||n[2]||n[3]?"["+n.map(function(t,n){return n%2?e(t,1):'"'+t.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")':e(n[1])).replace(/\uFFF0/g,i[0]).replace(/\uFFF1/g,i[1]))}function e(t,e){return t=t.replace(/\n/g," ").replace(r(/^[{ ]+|[ }]+$|\/\*.+?\*\//g),""),/^\s*[\w-"']+ *:/.test(t)?"["+t.replace(/\W*([\w-]+)\W*:([^,]+)/g,function(t,r,i){return i.replace(/\w[^,|& ]*/g,function(t){return n(t,e)})+'?"'+r+'":"",'})+'].join(" ")':n(t,e)}function n(t,e){return"(function(v){try{v="+(t.replace(a,function(t,e,n){return n?"(d."+n+"===undefined?window."+n+":d."+n+")":t})||"x")+"}finally{return "+(e?'!v&&v!==0?"":v':"v")+"}}).call(d)"}function r(t){return RegExp(t.source.split("{").join("\\"+i[0]).split("}").join("\\"+i[1]),t.global?"g":"")}var i,o,u={},a=/("|').+?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_]\w*)/gi;return function(e,n){var a=g.settings.brackets||"{ }";return a!=i&&(i=a.split(" "),o=r(/({[\s\S]*?})/)),n?e&&(u[e]=u[e]||t(e))(n):o.test(e)}}(),b=[],w={};g.tag=function(t,e,n){w[t]={name:t,tmpl:e,fn:n}};var x=g.mountTo=function(t,e,n){var r,i=w[e];return i&&(r=new u(i,{root:t,opts:n})),r?(b.push(r),r.on("unmount",function(){b.splice(b.indexOf(r),1)})):void 0};g.mount=function(t,e){"*"==t&&(t=Object.keys(w).join(", "));var n=[];return f(document.querySelectorAll(t),function(t){var r=t.tagName.toLowerCase(),i=x(t,r,e);i&&n.push(i)}),n},g.update=function(){return b.map(function(t){t.update()}),b},"object"==typeof n?e.exports=g:"function"==typeof define&&define.amd?define(function(){return g}):this.riot=g}()},{}],3:[function(t){var e=t("riot");e.tag("app",'<h1>Currencies</h1> <form> <input type="search" value="{ keyword }" onkeyup="{ keyup }" placeholder="search"> </form> <item each="{ filtered }" title="{ title }" price="{ price }"></item> <p if="{ more }">and { count - MAX } more currencies</p>',function(t){MAX=20,this.init=function(){this.keyword="",this.items=t.items,this.filtered=[],this.count=0,this.more=!1,this.search()}.bind(this),this.keyup=function(t){this.keyword=t.target.value.trim().toUpperCase(),this.search()}.bind(this),this.search=function(){filtered=this.items.filter(this.filter),this.count=filtered.length,this.more=filtered.length>MAX,this.filtered=filtered.slice(0,MAX)}.bind(this),this.filter=function(t){return!this.keyword.length||t.title.replace(/\-\w\w$/,"").match(this.keyword)}.bind(this),this.init()})},{riot:2}],4:[function(t){var e=t("riot");e.tag("item",'<span class="title">{ opts.title }</span> <span class="price">{ opts.price }</span> <span class="usd">= 1 USD</span>',function(){})},{riot:2}],5:[function(t,e){e.exports=function(t){for(var e=[],n=0;n<t.list.resources.length;n++){var r=t.list.resources[n].resource.fields,i=/^USD\//;i.test(r.name)&&e.push({title:r.name.replace(i,""),price:r.price})}return e}},{}]},{},[1]);
//# sourceMappingURL=app.js.map
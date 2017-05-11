var ADGEAR=ADGEAR||{};ADGEAR.lang=ADGEAR.lang||{};
ADGEAR.lang.namespace=function(b){var a=b.split(".");
var d=window;for(var c=0;c<a.length;c++){d[a[c]]=d[a[c]]||{};
d=d[a[c]]}return d};ADGEAR.lang.singleton=function(){var d=Array.prototype.slice.call(arguments);
var c=d.shift();var g=d.shift();var b=c.split(".");
var h=window;var a=b.length-1;var f;for(var e=0;
e<a;e++){h[b[e]]=h[b[e]]||{};h=h[b[e]]}f=h[b[a]];
h[b[a]]=f||g.apply(null,d);return h};ADGEAR.lang.klass=function(a,b){return ADGEAR.lang.singleton(a,function(){return b
})};ADGEAR.lang.bind=function(b,c){var a=c;
return function(){return b.apply(a,arguments)
}};ADGEAR.lang.mergeHashes=function(c,a){var d={};
for(var b in c){d[b]=c[b]}for(var b in a){d[b]=a[b]
}return d};ADGEAR.lang.log=function(c){if((typeof ADGEAR_JS_DEBUG==="undefined")||(ADGEAR_JS_DEBUG!==true)){return
}try{if(typeof(window.console)==="object"){window.console.log(c)
}var g=document.getElementById("adgearPreviewConsole");
if(g){var f=g.getElementsByTagName("ul");
if(f&&f[0]){f=f[0]}else{f=document.createElement("ul");
g.appendChild(f)}var a=new Date();var b=document.createElement("li");
b.innerHTML="<strong>[ "+String(a.getFullYear())+"-"+String(a.getMonth()+1)+"-"+String(a.getDate())+" "+String(a.getHours())+":"+String(a.getMinutes())+":"+String(a.getSeconds())+"  ] &gt;&gt; </strong>"+String(c);
f.appendChild(b);g.scrollTop=g.scrollHeight
}}catch(d){}};ADGEAR.lang.indexOf=function(d,b){var a=d.length;
var c=Number(arguments[2])||0;c=(c<0)?Math.ceil(c):Math.floor(c);
if(c<0){c+=a}for(;(c>=0)&&(c<a);c++){if(d[c]===b){return c
}}return -1};ADGEAR.lang.safeDecodeURIComponent=function(c){var a="";
try{a=decodeURIComponent(c)}catch(b){}return a
};ADGEAR.lang.klass("ADGEAR.EventQueue",function(){var h={num_processed:0,num_loaded:0,num_error:0,num_aborted:0};
var f=new Array();var b=new Image();var j=false;
function i(){h.num_processed+=1;b=new Image();
if(f.length>0){d()}else{j=false}}function e(){h.num_loaded+=1;
i()}function c(){h.num_error+=1;i()}function a(){h.num_aborted+=1;
i()}function d(){j=true;b.onload=e;b.onerror=c;
b.onabort=a;b.src=f.shift()}function g(){if(!j){d();
return true}return false}return{dispatch:function(k){if("string"===typeof(k)&&k.match(/^https?:\/\//)){f.push(k);
return g()}},stats:function(k){if(k in h){return h[k]
}return null}}});ADGEAR.lang.klass("ADGEAR.QueryString",function(e){var d="";
var b={};function c(i){var j={};for(var g in i){j[g]=i[g]
}return j}function a(j){var f,l,h,m,g,k;var n=ADGEAR.lang.safeDecodeURIComponent;
if((typeof j==="string")&&(j!=="")){d=j;if(d.substring(0,1)==="?"){d=d.substring(1)
}l=d.split("&");for(h=0;h<l.length;h++){m=l[h].split("=");
g=n(m.shift());k=((m!=null)&&(m.length>0))?n(m.join("=")):null;
b[g]=k}}else{if(typeof j==="object"){b=c(j);
f=new Array();for(g in b){k=encodeURIComponent(String(g));
if(b[g]!=null){k+="="+encodeURIComponent(String(b[g]))
}f.push(k)}d=f.join("&")}}}if(e!=null){a(e)
}return{toString:function(){return d},toHash:function(){return b
},isEmpty:function(){for(var f in b){if(b.hasOwnProperty(f)){return false
}}return true},update:function(f,g){b[f]=g;
a(b);return this},add:function(f,g){return this.update(f,g)
},del:function(f){delete b[f];a(b);return this
},contains:function(f){return !!(f in b)},get:function(f){if(this.contains(f)){return b[f]
}return null},delAdGearParams:function(){var g={};
for(var f in b){if(!f.match(/^AG_/)){g[f]=b[f]
}}a(g);return this},dup:function(){return ADGEAR.QueryString(this.toHash())
}}});ADGEAR.lang.singleton("ADGEAR.browser",function(){var b=ADGEAR.lang;
var e=null;var d=null;var c=null;var a=null;
return{type:{IE:!!(window.attachEvent&&(b.indexOf(navigator.userAgent,"Opera")===-1)),Opera:b.indexOf(navigator.userAgent,"Opera")>-1,WebKit:b.indexOf(navigator.userAgent,"AppleWebKit/")>-1,Gecko:b.indexOf(navigator.userAgent,"Gecko")>-1&&b.indexOf(navigator.userAgent,"KHTML")===-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},topWindow:function(){if(e==null){try{e=window.parent;
while(e&&(e!=e.parent)){e=e.parent}}catch(f){}}return e
},isTopWindow:function(){return(this.topWindow()==window)
},currentQueryString:function(){if(d==null){try{d=ADGEAR.QueryString(window.location.search)
}catch(f){}}return d},trueReferrer:function(){if(c==null){try{c=this.topWindow().document.referrer
}catch(f){}if(c==null){c=""}}return c},trueReferer:function(){return this.trueReferrer()
},trueLocation:function(){if(a==null){try{a=String(this.topWindow().location)
}catch(f){}if(a==null){a=""}}return a},localtime:function(){var h="";
try{var m=new Date();var l=m.getTimezoneOffset();
var g=(l<0?"+":"-");l=Math.abs(l);var k=parseInt(l/60);
var f=(l%60);var j=function(n){n=String(n);
while(n.length<2){n="0"+n}return(n)};h=String(m.getFullYear())+"-"+j(m.getMonth()+1)+"-"+j(m.getDate())+"T"+j(m.getHours())+":"+j(m.getMinutes())+":"+j(m.getSeconds())+g+j(k)+":"+j(f)
}catch(i){}return h}}});ADGEAR.lang.klass("ADGEAR.Environment",function(a){var e={};
var c={};var b="ag"+String(Math.floor(Math.random()*100000000000000));
var i=ADGEAR.EventQueue();var d="http";for(var g in a){e[g]=a[g]
}function h(){e.durl="";e.aurl="";if(("delivery" in e)&&(d in e.delivery)&&("hostname" in e.delivery[d])&&(e.delivery[d]["hostname"]!=="")){e.durl=d+"://"+e.delivery[d]["hostname"]
}if(("assets" in e)&&(d in e.assets)&&("hostname" in e.assets[d])&&(e.assets[d]["hostname"]!=="")){e.aurl=d+"://"+e.assets[d]["hostname"];
if(("bucket" in e.assets[d])&&(e.assets[d]["bucket"]!=="")){e.aurl+="/"+e.assets[d]["bucket"]
}}}function f(n,k){var m=n.indexOf("?");var j=n;
var l="";if(k!==""){if(m<0){l="?"}else{if(m!=(n.length-1)){l="&"
}}j=j+l+k}return j}if(((typeof __ADGEAR_SSL!="undefined")&&__ADGEAR_SSL)||(window.location.protocol=="https:")){d="https"
}h();return{config:function(){return e},proto:function(){return d
},getSessionId:function(){return b},setSessionId:function(j){b=String(j)
},eventQueue:function(){return i},helloUrl:function(){this.setSessionId(arguments[0]||this.getSessionId());
return this.deliveryUrl("/session.js",{session:this.getSessionId()})
},deliveryUrl:function(n){var l=arguments[1]||{};
var k=ADGEAR.browser;var j=ADGEAR.QueryString({});
if("querystring" in l&&typeof(l.querystring.toHash)!=="undefined"){j=ADGEAR.QueryString(l.querystring.toHash())
}if(String(n).match(/^https?:\/\//)){return f(n,j.toString())
}if(!("cachebust" in l)||(l.cachebust!==false)){j.add("AG_R",String(Math.floor(Math.random()*100000000000000)))
}if(!("localtime" in l)||(l.localtime!==false)){j.add("AG_LT",k.localtime())
}if(!("trueref" in l)||(l.trueref!==false)){j.add("AG_REF",k.trueReferrer())
}if("session" in l){j.add("AG_SESSID",l.session)
}if(!("deliveryhints" in l)||(l.deliveryhints!==false)){for(var m in c){j.add(m,c[m].join(","))
}}return(e.durl+f(n,j.toString()))},assetUrl:function(l){var k=arguments[1]||{};
var j=ADGEAR.QueryString({});if("querystring" in k){j=ADGEAR.QueryString(k.querystring.toHash())
}if(String(l).match(/^https?:\/\//)){return f(l,j.toString())
}if(("cachebust" in k)&&(k.cachebust===true)){j.add("AG_R",String(Math.floor(Math.random()*100000000000000)))
}return(e.aurl+f(l,j.toString()))},addDeliveryHint:function(j,k){if(!(j in c)){c[j]=[]
}c[j].push(k)},isLivePreview:function(){return(("live_preview" in e)&&(e.live_preview===true))
}}});ADGEAR.lang.singleton("ADGEAR.envs",function(){var a={};
return{config:function(c){var b=c.name;if(!(b in a)){a[b]=ADGEAR.Environment(c)
}return a[b]}}});ADGEAR.lang.singleton("ADGEAR.templateApi",function(){return{getClickUrlFromPath:function(c){var b={querystring:arguments[1]||ADGEAR.QueryString({}),cachebust:false,localtime:false,trueref:false,deliveryhints:false};
if(this["adunit_click_url"]){b.querystring.add("AG_RED",this["adunit_click_url"])
}var a=this.env.deliveryUrl(c,b);if(this["source_clicktracker"]){var f;
if(this["source_clicktracker_is_encoded"]){f=ADGEAR.lang.safeDecodeURIComponent(this["source_clicktracker"])
}else{if(this["source_clicktracker_is_double_encoded"]){var e=ADGEAR.lang.safeDecodeURIComponent;
f=e(e(this["source_clicktracker"]))}else{f=this["source_clicktracker"]
}}var d=this["source_clicktracker_expects_encoded"]?encodeURIComponent(a):a;
a=f+d}return a},getClickUrl:function(b){if(!("clicks" in this)||!(b in this["clicks"])){return null
}if(this.env.isLivePreview()){return this.declared_click_urls[b]
}var a=arguments[1]||ADGEAR.QueryString({});
return this.getClickUrlFromPath(this.clicks[b],a)
},getInteractionUrl:function(a){if(("interactions" in this)&&(a in this["interactions"])){return this.env.deliveryUrl(this.interactions[a],{querystring:arguments[1]||ADGEAR.QueryString({}),localtime:false,trueref:false,deliveryhints:false})
}return null},getFileUrl:function(a){if(("files" in this)&&(a in this["files"])){return this.env.assetUrl(this.files[a])
}return null},getVariable:function(a){if(("variables" in this)&&(a in this["variables"])){return this.variables[a]
}return null},getContainerId:function(){return"adgear_"+String(this.instance_id).replace(/-/g,"_")
},getWidth:function(){var a=this["format_width"];
if(a&&String(a)!=="1"){return a}if(this["natural_width"]){return String(this["natural_width"])
}return"500"},getHeight:function(){var a=this["format_height"];
if(a&&String(a)!=="1"){return a}if(this["natural_height"]){return String(this["natural_height"])
}return"500"},getInstanceId:function(){return this.instance_id
},getTxnId:function(){return this.instance_id
},replaceKnownTokens:function(b){if(!b.match(/__AG_/)){return b
}b=b.replace(/__AG_PLACEMENT_ID__/g,this.placement_id);
b=b.replace(/__AG_AD_ID__/g,this.adunit_id);
b=b.replace(/__AG_AD_IMPRESSIONS_COUNT__/g,this.impressions_count);
b=b.replace(/__AG_AD_CLICKS_COUNT__/g,this.clicks_count);
b=b.replace(/__AG_INSTANCE_ID__/g,this.getInstanceId());
b=b.replace(/__AG_TXN_ID__/g,this.getTxnId());
b=b.replace(/__AG_CLIENT_IP__/g,this.client_ip);
if(b.match(/__AG_GEO/)){b=b.replace(/__AG_GEO_COUNTRY_CODE__/g,this.getGeoCountryCode());
b=b.replace(/__AG_GEO_COUNTRY_NAME__/g,this.getGeoCountryName());
b=b.replace(/__AG_GEO_REGION__/g,this.getGeoRegion());
b=b.replace(/__AG_GEO_CITY__/g,this.getGeoCity());
b=b.replace(/__AG_GEO_ZIP_CODE__/g,this.getGeoPostalCode());
b=b.replace(/__AG_GEO_ISP__/g,this.getGeoIsp());
b=b.replace(/__AG_GEO_NETSPEED__/g,this.getGeoNetspeed());
b=b.replace(/__AG_GEO_LONGITUDE__/g,this.getGeoLongitude());
b=b.replace(/__AG_GEO_LATITUDE__/g,this.getGeoLatitude());
b=b.replace(/__AG_GEO_DMA_CODE__/g,this.getGeoDmaCode());
b=b.replace(/__AG_GEO_AREA_CODE__/g,this.getGeoAreaCode());
b=b.replace(/__AG_GEO_ORGANIZATION__/g,this.getGeoAreaCode())
}if(b.match(/__AG_IMPR_HINT/)){for(var a in this.impression_hints){if(this.impression_hints.hasOwnProperty(a)){b=b.replace(RegExp("__AG_IMPR_HINT\\["+a+"\\]__","g"),this.getImpressionHint(a));
b=b.replace(RegExp("__AG_IMPR_HINT\\["+a+"\\]:URL__","g"),encodeURIComponent(this.getImpressionHint(a)))
}}}if(b.match(/__AG_AD_VAR/)){for(var a in this.variables){if(this.variables.hasOwnProperty(a)){b=b.replace(RegExp("__AG_AD_VAR\\["+a+"\\]__","g"),this.getVariable(a));
b=b.replace(RegExp("__AG_AD_VAR\\["+a+"\\]:URL__","g"),encodeURIComponent(this.getVariable(a)))
}}}if(b.match(/__AG_AD_FILE_URL/)){for(var a in this.files){if(this.files.hasOwnProperty(a)){b=b.replace(RegExp("__AG_AD_FILE_URL\\["+a+"\\]__","g"),this.getFileUrl(a));
b=b.replace(RegExp("__AG_AD_FILE_URL\\["+a+"\\]:URL__","g"),encodeURIComponent(this.getFileUrl(a)))
}}}if(b.match(/__AG_AD_CLICK_URL/)){for(var a in this.clicks){if(this.clicks.hasOwnProperty(a)){b=b.replace(RegExp("__AG_AD_CLICK_URL\\["+a+"\\]__","g"),this.getClickUrl(a));
b=b.replace(RegExp("__AG_AD_CLICK_URL\\["+a+"\\]:URL__","g"),encodeURIComponent(this.getClickUrl(a)))
}}}if(b.match(/__AG_AD_IACTION_URL/)){for(var a in this.interactions){if(this.interactions.hasOwnProperty(a)){b=b.replace(RegExp("__AG_AD_IACTION_URL\\["+a+"\\]__","g"),this.getInteractionUrl(a));
b=b.replace(RegExp("__AG_AD_IACTION_URL\\["+a+"\\]:URL__","g"),encodeURIComponent(this.getInteractionUrl(a)))
}}}return b},prepThirdParty:function(b){var d=b;
var a=this["click_tracker"];if(String(a).length>0){var c=this["adunit_click_url"];
delete this["adunit_click_url"];d=d.replace(/__CLICK_TRACKER_URL__/g,this.getClickUrlFromPath(a+"?"));
d=d.replace(/__CLICK_TRACKER_URL_ENCODED__/g,encodeURIComponent(this.getClickUrlFromPath(a+"?")));
this["adunit_click_url"]=c}d=d.replace(/__RANDOM_NUMBER__/g,Math.floor(Math.random()*100000000000000));
d=d.replace(/__AG_TXN_ID__/g,this.getTxnId());
d=this.replaceKnownTokens(d);return d},regClick:function(b){var a=arguments[1]||ADGEAR.QueryString({});
var c=this.getClickUrl(b,a);if(c){ADGEAR.lang.log("AdUnit registered CLICK with name: "+String(b)+" - redirect URL: "+c+" - params: [ "+a.toString()+" ]")
}else{ADGEAR.lang.log("AdUnit attempted to register CLICK with name: "+String(b)+" - params: [ "+a.toString()+" ] - but click NOT FOUND!")
}ADGEAR.browser.topWindow().location=c},regInteraction:function(c){var b=arguments[1]||ADGEAR.QueryString({});
var a=this.env.eventQueue();var d=this.getInteractionUrl(c,b);
if(d){ADGEAR.lang.log("AdUnit registered INTERACTION/EVENT with name: "+String(c)+" - params: [ "+b.toString()+" ]")
}else{ADGEAR.lang.log("AdUnit attempted to register INTERACTION/EVENT with name: "+String(c)+" - params: [ "+b.toString()+" ] - but interaction NOT FOUND!")
}return a.dispatch(d)},getGeoCountryCode:function(){if(("geo" in this)&&("country_code" in this["geo"])){return String(this.geo.country_code)
}return null},getGeoCountryName:function(){if(("geo" in this)&&("country_name" in this["geo"])){return String(this.geo.country_name)
}return null},getGeoRegion:function(){if(("geo" in this)&&("region" in this["geo"])){return String(this.geo.region)
}return null},getGeoCity:function(){if(("geo" in this)&&("city" in this["geo"])){return String(this.geo.city)
}return null},getGeoPostalCode:function(){if(("geo" in this)&&("postal_code" in this["geo"])){return String(this.geo.postal_code)
}return null},getGeoIsp:function(){if(("geo" in this)&&("isp" in this["geo"])){return String(this.geo.isp)
}return null},getGeoNetspeed:function(){if(("geo" in this)&&("netspeed" in this["geo"])){return String(this.geo.netspeed)
}return null},getGeoLongitude:function(){if(("geo" in this)&&("longitude" in this["geo"])){return String(this.geo.longitude)
}return null},getGeoLatitude:function(){if(("geo" in this)&&("latitude" in this["geo"])){return String(this.geo.latitude)
}return null},getGeoDmaCode:function(){if(("geo" in this)&&("dma_code" in this["geo"])){return String(this.geo.dma_code)
}return null},getGeoAreaCode:function(){if(("geo" in this)&&("area_code" in this["geo"])){return String(this.geo.area_code)
}return null},getImpressionHint:function(a){if(("impression_hints" in this)&&(a in this["impression_hints"])){return String(this.impression_hints[a])
}return null},doViewportDetect:function(){return(("viewport_detect" in this)&&(true===this["viewport_detect"])&&!this.env.isLivePreview())
},regOnLoadEvent:function(a){if(typeof window.addEventListener!="undefined"){window.addEventListener("load",a,false)
}else{if(typeof document.addEventListener!="undefined"){document.addEventListener("load",a,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",a)
}else{if(typeof window.onload=="function"){var b=window.onload;
window.onload=function(){b();a()}}else{window.onload=a
}}}}}}});ADGEAR.render=function(i,j,f){function c(e){if(("placement_id" in e)&&("adunit_id" in e)){e.env.addDeliveryHint("AG_S","p"+String(e.placement_id)+",a"+String(e.adunit_id))
}}function h(p){var q=null;try{if("tilings" in p){q=p.tilings;
if("served" in q){p.env.addDeliveryHint("AG_TS",String(q.served))
}if("unserved" in q){for(var o=0;o<q.unserved.length;
o++){p.env.addDeliveryHint("AG_TN",String(q.unserved[o]))
}}}}catch(e){}}function a(o){for(var e in ADGEAR.templateApi){o[e]=ADGEAR.templateApi[e]
}}function l(e){e.source_clicktracker=null;
e.source_clicktracker_expects_encoded=false;
e.source_clicktracker_is_encoded=false;e.source_clicktracker_is_double_encoded=false;
if((typeof ADGEAR_SOURCE_CLICKTRACKER==="string")&&(String(ADGEAR_SOURCE_CLICKTRACKER).toLowerCase().match(/^http/))){e.source_clicktracker=ADGEAR_SOURCE_CLICKTRACKER
}e.source_clicktracker_expects_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED;
e.source_clicktracker_is_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED;
e.source_clicktracker_is_double_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED;
ADGEAR_SOURCE_CLICKTRACKER=null;ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED=null;
ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED=null;
ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED=null
}function n(e){if(typeof OOBClickTrack==="string"){e.OOBClickTrack=OOBClickTrack
}OOBClickTrack=null}function d(e){if(typeof ADGEAR_ADUNIT_CLICK_URL==="string"&&ADGEAR_ADUNIT_CLICK_URL.toLowerCase().match(/^(http|tel)/)){e.adunit_click_url=ADGEAR_ADUNIT_CLICK_URL
}ADGEAR_ADUNIT_CLICK_URL=null}function m(e){if(typeof ADGEAR_RENDER_CB==="function"){e.render_cb=ADGEAR_RENDER_CB
}ADGEAR_RENDER_CB=null}if(("env" in j)&&("name" in j.env)){var k=ADGEAR.envs.config(j.env);
if(!k){ADGEAR.lang.log("Unable to reference environment specified by AdUnit payload (name = "+String(j.env["name"])+"). Aborting rendering!");
return false}j.env=k;c(j);h(j);l(j);n(j);
d(j);m(j);a(j);try{i(j)}catch(g){ADGEAR.lang.log("Failed in executing ad rendering template '"+String(j.template)+"' - placement ID: "+String(j.placement_id)+", adunit ID: "+String(j.adunit_id)+" - in environment '"+String((k.config())["name"])+"'. Exception: "+String(g));
if(f){try{f(j)}catch(b){ADGEAR.lang.log("Failed in executing backup rendering handler provided by '"+String(j.template)+"' - placement ID: "+String(j.placement_id)+", adunit ID: "+String(j.adunit_id)+" - in environment '"+String((k.config())["name"])+"'. Exception: "+String(b))
}}return false}}try{j.render_cb&&j.render_cb(j)
}catch(g){ADGEAR.lang.log("Failed to call user-supplied render callback. Exception: "+String(g))
}return true};ADGEAR.lang.namespace("ADGEAR.vendor");
ADGEAR.vendor.Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(d){var a="";
var l,j,g,k,h,f,e;var b=0;var c=ADGEAR.vendor.Base64;
d=c._utf8_encode(d);while(b<d.length){l=d.charCodeAt(b++);
j=d.charCodeAt(b++);g=d.charCodeAt(b++);k=l>>2;
h=((l&3)<<4)|(j>>4);f=((j&15)<<2)|(g>>6);
e=g&63;if(isNaN(j)){f=e=64}else{if(isNaN(g)){e=64
}}a=a+this._keyStr.charAt(k)+this._keyStr.charAt(h)+this._keyStr.charAt(f)+this._keyStr.charAt(e)
}return a},decode:function(d){var a="";var l,j,g;
var k,h,f,e;var b=0;var c=ADGEAR.vendor.Base64;
d=d.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<d.length){k=this._keyStr.indexOf(d.charAt(b++));
h=this._keyStr.indexOf(d.charAt(b++));f=this._keyStr.indexOf(d.charAt(b++));
e=this._keyStr.indexOf(d.charAt(b++));l=(k<<2)|(h>>4);
j=((h&15)<<4)|(f>>2);g=((f&3)<<6)|e;a=a+String.fromCharCode(l);
if(f!=64){a=a+String.fromCharCode(j)}if(e!=64){a=a+String.fromCharCode(g)
}}a=c._utf8_decode(a);return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");
var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);
if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);
a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)
}}}return a},_utf8_decode:function(a){var d="";
var b=0;var e=c1=c2=0;while(b<a.length){e=a.charCodeAt(b);
if(e<128){d+=String.fromCharCode(e);b++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(b+1);
d+=String.fromCharCode(((e&31)<<6)|(c2&63));
b+=2}else{c2=a.charCodeAt(b+1);c3=a.charCodeAt(b+2);
d+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));
b+=3}}}return d}};ADGEAR.lang.singleton("ADGEAR.viewport",function(){var d=ADGEAR.browser.type;
function b(i){var e=0;var h=0;var g=document.getElementById(i);
var f=g;do{e+=f.offsetTop||0;h+=f.offsetLeft||0
}while(f=f.offsetParent);f=g;do{if(!d.Opera||(f.tagName&&(f.tagName.toUpperCase()=="BODY"))){e-=f.scrollTop||0;
h-=f.scrollLeft||0}}while(f=f.parentNode);
return{left:h,top:e}}function a(g){var j=document.getElementById(g);
var l=j.style.display;if(l!="none"&&l!=null){return{width:j.offsetWidth,height:j.offsetHeight}
}var h=j.style;var m=h.visibility;var k=h.position;
var f=h.display;h.visibility="hidden";h.position="absolute";
h.display="block";var e=j.clientWidth;var i=j.clientHeight;
h.display=f;h.position=k;h.visibility=m;return{width:e,height:i}
}function c(){var h={};var g=["Width","Height"];
for(var f=0;f<g.length;f++){var e=g[f];var j=e.toLowerCase();
if(d.WebKit&&!document.evaluate){h[j]=self["inner"+e]
}else{if((d.Opera&&parseFloat(window.opera.version())<9.5)||(document.documentElement.clientHeight==0)||(d.Gecko&&!(document.body.clientHeight==document.body.offsetHeight&&document.body.clientHeight==document.body.scrollHeight))){h[j]=document.body["client"+e]
}else{h[j]=document.documentElement["client"+e]
}}}return h}return{dimensions:function(){return c()
},isElementVisible:function(h){var g=b(h);
var f=a(h);g.right=g.left+f.width;g.bottom=g.top+f.height;
var e=c();if(g.right>0&&g.left<e.width&&g.bottom>0&&g.top<e.height){return true
}return false},observeAd:function(e){if(ADGEAR.browser.isTopWindow()){if(ADGEAR.viewport.isElementVisible(e.getContainerId())){e.regInteraction("LOADED_IN_VIEWPORT")
}else{var g=function(){if(ADGEAR.viewport.isElementVisible(e.getContainerId())){e.regInteraction("ENTERED_VIEWPORT");
clearInterval(f)}};var f=window.setInterval(g,500)
}}else{e.regInteraction("LOADED_IN_IFRAME")
}}}});ADGEAR.lang.singleton("ADGEAR.v",function(){function f(){return window.BloomGHUaVZLoaded
}function a(){window.BloomGHUaVZLoaded=true
}function e(h){var g=document.createElement("script");
g.type="text/javascript";if(g.readyState){g.onreadystatechange=function(){if(g.readyState=="loaded"||g.readyState=="complete"){g.onreadystatechange=null;
a();h()}}}else{g.onload=function(){a();h()
}}g.src="http://v.adgear.com/v.js";document.body.appendChild(g)
}function b(i,g,h){ADGEAR.lang.log("viewport_sio: attempting to register with sio for ID: "+i+" and container ID: "+String(g.id));
if(window.BloomGJUaVZ){window.BloomGJUaVZ({uid:i,el:g,vars:h});
ADGEAR.lang.log("viewport_sio: REGISTERED with sio for ID: "+i+" and container ID: "+String(g.id))
}}function c(h,g){ADGEAR.lang.log("viewport_sio: observing DOM element: "+g);
var k=document.getElementById(g);if(k){var j=h.env.config();
var i=h.getImpressionHint("url");var l={};
if("name" in j){l.farm=String(j.name);if("placement_id" in h){l.placement_id=String(h.placement_id)
}if("adunit_id" in h){l.adunit_id=String(h.adunit_id)
}}if("rtb_data" in h){if("request_id" in h.rtb_data){l.trader_request_id=String(h.rtb_data["request_id"])
}if("spot_id" in h.rtb_data){l.trader_spot_id=String(h.rtb_data["spot_id"])
}if("flight_id" in h.rtb_data){l.trader_flight_id=String(h.rtb_data["flight_id"])
}if("tag_id" in h.rtb_data){l.trader_tag_id=String(h.rtb_data["tag_id"])
}if("bidder_id" in h.rtb_data){l.trader_bidder_id=String(h.rtb_data["bidder_id"])
}if("exchange_id" in h.rtb_data){l.trader_exchange_id=String(h.rtb_data["exchange_id"])
}if("exchange_seller_id" in h.rtb_data){l.trader_exchange_seller_id=String(h.rtb_data["exchange_seller_id"])
}}if(i!=null){l.url=String(i)}if(f()){ADGEAR.lang.log("viewport_sio: script already loaded, registering with sio for instance ID: "+String(h.instance_id)+" and container ID: "+g);
b(String(h.instance_id),k,l)}else{ADGEAR.lang.log("viewport_sio: script not loaded, loading script then registering with sio for instance ID: "+String(h.instance_id)+" and container ID: "+g);
e(function(){b(String(h.instance_id),k,l)
})}}}function d(h,g){ADGEAR.lang.log("viewport_sio: checking whether to observe ad...");
if(h.doViewportDetect()&&("http"===h.env.proto())){ADGEAR.lang.log("viewport_sio: viewport_detect is turned on for ad and no SSL...");
if(null==document.getElementById(h.getContainerId())){ADGEAR.lang.log("viewport_sio: cannot find DOM element: "+String(h.getContainerId())+" ... registering on load event.");
h.regOnLoadEvent(function(){c(h,g)})}else{ADGEAR.lang.log("viewport_sio: found DOM element: "+String(h.getContainerId())+" ...");
c(h,g)}}}return{observeAd:function(g){d(g,g.getContainerId())
},observeAdInContainer:function(h,g){d(h,g)
}}});ADGEAR.lang.singleton("ADGEAR.adchoices",function(){var e={},a=null;
e.dom_id_prefix="adgear_adchoices_";e.style={};
e.style["font-family"]="Arial,sans-serif";
e.style["font-size"]="12px";e.style["line-height"]="16px";
e.style["text-align"]="left";e.style["text-decoration"]="none";
e.style["opacity"]="1";e.style["color"]="black";
e.style["border"]="none";e.style["background-color"]="transparent";
e.style["box-shadow"]="none";e.style["webkit-box-shadow"]="none";
e.style["moz-box-shadow"]="none";e.style["z-index"]="20000";
function q(r){var s=h();e.privacy_link=r.env.deliveryUrl("/privacy");
e.privacy_target="_blank";e.privacy_link_color="#0088cc";
e.width=r.getVariable("adchoices_width")||19;
e.height=r.getVariable("adchoices_height")||15;
e.icon_and_text_en={};e.icon_and_text_en["width"]=r.getVariable("adchoices_width")||77;
e.icon_and_text_en["height"]=r.getVariable("adchoices_height")||15;
e.icon_and_text_fr={};e.icon_and_text_fr["width"]=r.getVariable("adchoices_width")||87;
e.icon_and_text_fr["height"]=r.getVariable("adchoices_height")||15;
e.icon=r.env.assetUrl("/adchoices/icon.png");
e.icon_text_en=r.env.assetUrl("/adchoices/icon_text_en.png");
e.icon_text_fr=r.env.assetUrl("/adchoices/icon_text_fr.png");
e.instance_id=r.getInstanceId()||"12345678abcde";
e.instance_id=e.instance_id.replace(/-/g,"_");
e.options={};e.options["icon_only"]=r.getVariable("adchoices_icon_only")||false;
e.options["icon_and_text"]=r.getVariable("adchoices_icon_and_text")||true;
e.options["language"]=r.getVariable("adchoices_language")||"en";
e.options["icon_position"]=r.ad_choices_position||"TR";
e.ad={};e.ad["width"]=Math.max(r.config?r.config.width:0,r.getWidth())||"300";
e.ad["height"]=Math.max(r.config?r.config.height:0,r.getHeight())||"250";
e.ad["container_id"]=r.getContainerId();e.ad["container"]=f(e.ad.container_id);
if(r&&r.config&&r.config.innerWrapperID){e.ad.container=f(r.config.innerWrapperID);
e.ad.container_id=r.config.innerWrapperID
}else{if(r&&r.config&&r.config.catfishContainerID){e.ad.container=f(r.config.catfishContainerID);
e.ad.container_id=r.config.catfishContainerID
}else{if(r&&r.config&&r.config.banner_containerID){e.ad.container=f(r.config.banner_containerID);
e.ad.container_id=r.config.banner_containerID
}}}e.collapsed_state={};e.collapsed_state["type"]="div";
e.collapsed_state["id"]=b();e.collapsed_state["image"]={};
e.collapsed_state["image"]["type"]="img",e.collapsed_state["image"]["id"]=b("image"),e.collapsed_state["image"]["src"]=e.options.icon_and_text?e["icon_text_"+e.options.language]:e.icon,e.collapsed_state["image"]["style"]={};
e.collapsed_state["image"]["style"]["display"]="inline",e.collapsed_state["image"]["style"]["padding"]="1px",e.collapsed_state["link"]={};
e.collapsed_state["link"]["type"]="a",e.collapsed_state["link"]["href"]=e.privacy_link,e.collapsed_state["link"]["target"]=e.privacy_target;
e.collapsed_state["style"]={};e.collapsed_state["style"]["width"]=e.options.icon_and_text?e["icon_and_text_"+e.options.language].width+"px":e.width+"px";
e.collapsed_state["style"]["height"]=e.options.icon_and_text?e["icon_and_text_"+e.options.language].height+"px":e.height+"px";
e.collapsed_state["style"]["background-repeat"]="no-repeat";
e.collapsed_state["style"]["position"]="relative";
e.collapsed_state["style"]["vertical-align"]="top";
e.collapsed_state["style"]["text-align"]="right";
e.collapsed_state["style"]["overflow"]="hidden";
e.collapsed_state["style"]["cursor"]="pointer";
e.collapsed_state["style"]["left"]=String(e.ad.width-e.width)+"px"
}function h(){if(a==null){try{a=ADGEAR.browser.topWindow().document
}catch(s){try{a=top.window.document}catch(r){a=window.document
}}}return a}function f(t){var s=h(),r=s.getElementById(t);
a=s;if(r==null){a=document;r=document.getElementById(t)
}return r}function m(t,s){var u=h();var r=t;
if(typeof(t)=="string"){r=u.getElementById(t)
}if(r.currentStyle){var v=r.currentStyle[s]
}else{if(window.getComputedStyle){var v=u.defaultView.getComputedStyle(r,null).getPropertyValue(s)
}}return v}function c(r){return r in document.body.style
}function d(r){r=r.replace(/^-/,"");return r.toLowerCase().replace(/-(.)/g,function(t,s){return s.toUpperCase()
})}function n(v){var u=h();var t=u.createElement(v.type);
if(v.innerHTML!=null&&v.innerHTML!=""){t.innerHTML=v.innerHTML
}for(var r in v){if(r!="style"&&r!="type"&&r!="innerHTML"&&r!="image"&&r!="link"){t.setAttribute(r,v[r])
}}for(var r in v.style){if(r=="float"){t.style.cssFloat=v.style[r];
t.style.styleFloat=v.style[r]}else{if(c(d(r))){try{t.style[d(r)]=v.style[r]
}catch(s){}}}}return t}function p(r){if(r.match(/(px|em|pt|in|cm|mm|ex|pc|rem|vw|vh|%)/)){return Number(r.split(r.match(/(px|em|pt|in|cm|mm|ex|pc|rem|vw|vh|%)/)[0])[0])
}}function b(r){if(typeof(r)==="undefined"){r=""
}if(r!==""){r+="_"}return e.dom_id_prefix+r+e.instance_id
}function i(s){s.style=s.style||{};for(var r in e.style){if(s.style[r]==null){s.style[r]=e.style[r]
}}return s}function o(){var s=b("wrapper_container");
var r=n(i({type:"div",id:s,style:{width:e.ad.width+"px",height:e.ad.height+"px",display:"block",position:"relative",visibility:"visible","z-index":"10",margin:"0px auto","text-align":"center"}}));
return r}function l(r,s){switch(s){case"top-left":case"TL":r.style.position="absolute";
r.style.top=0+"px";r.style.left=0+"px";r.style.bottom="auto";
r.style.right="auto";break;case"bottom-left":case"BL":r.style.position="absolute";
r.style.top="auto";r.style.left=0+"px";r.style.bottom=0+"px";
r.style.right="auto";break;case"bottom-right":case"BR":r.style.position="absolute";
r.style.top="auto";r.style.left="auto";r.style.bottom=0+"px";
r.style.right=0+"px";break;case"top-right":case"TR":default:r.style.position="absolute";
r.style.top=0+"px";r.style.left="auto";r.style.bottom="auto";
r.style.right=0+"px";break}}function j(s,B,y,w,z,t,A){var D=e.ad.container||f(e.ad.container_id);
var u=e.ad["height"];var v=p(m(D,"height"));
if(v<u){u=v}var C=(w||0)-(y||0);var x=(w||0)-(y||0)+u-e.height;
var r=e.ad.width-A-((z||0)-(t||0));var E=((t||0)-(z||0));
switch(B){case"top-left":case"TL":s.style.left=E+"px";
s.style.top=C+"px";break;case"bottom-left":case"BL":s.style.left=E+"px";
s.style.top=x+"px";break;case"bottom-right":case"BR":s.style.left=r+"px";
s.style.top=x+"px";break;case"top-right":case"TR":default:s.style.left=r+"px";
s.style.top=C+"px";break}}function k(){var z=h();
var C=e.ad.container||f(e.ad.container_id);
var r=f(b());var w=r.offsetTop;var x=r.offsetLeft;
var s=e.ad.width;var v=e.ad.height;var u=p(r.style.top);
if(u==""||u==null){u=0}var t=p(r.style.left);
if(t==""||t==null){t=0}var A=(e.options.icon_and_text?e["icon_and_text_"+e.options.language].width:e.width);
var B=e.options.icon_position;var y=C.style.position;
if(y==null||y==""){y=m(C,"position")}if(y=="static"){C.style.position="relative";
y="relative";w=r.offsetTop;x=r.offsetLeft;
u=p(r.style.top);if(u==""||u==null){u=0}t=p(r.style.left);
if(t==""||t==null){t=0}}if(C.style.width==null||C.style.width==""){C.style.width=s+"px"
}if(C.style.height==null||C.style.height==""){C.style.height=v+"px"
}if(y=="absolute"||y==""||y=="static"){l(r,B)
}else{if(C.style.position=="relative"||C.style.position=="fixed"){j(r,B,w,u,x,t,A)
}}}function g(){var v=h();var w=e.ad.container||f(e.ad.container_id);
var t=n(i(e.collapsed_state));var r=n(i(e.collapsed_state.image));
var u=n(i(e.collapsed_state.link));u.appendChild(r);
t.appendChild(u);if(w.nodeName.toLowerCase()!="div"){var s=w;
w=o();s.parentNode.insertBefore(w,s);w.appendChild(s);
e.ad.object_id=e.ad.container_id;e.ad.container_id=w.id
}w.appendChild(t);k()}return{init:function(r){if(r.ad_choices_enabled==true){q(r);
g();r.regOnLoadEvent(k)}}}});ADGEAR.lang.singleton("ADGEAR.comscore.vce",function(){var a;
function b(c){var d=document.createElement("div");
a=document.createElement("script");a.src=c.comscore_tracker;
d.appendChild(a);document.writeln(d.innerHTML)
}return{init:function(c){if(("comscore_tracker" in c)&&c.comscore_tracker!=null&&c.comscore_tracker!=""){b(c)
}}}});ADGEAR.lang.singleton("ADGEAR.nielsen.ocr",function(){var a;
function b(c){var d=document.createElement("div");
if(c.nielsen_masked_enabled!=null&&c.nielsen_masked_enabled===true){a=document.createElement("script")
}else{a=document.createElement("img");a.style.display="none"
}a.src=c.nielsen_tracker;d.appendChild(a);
document.writeln(d.innerHTML)}return{init:function(c){if(("nielsen_tracker" in c)&&c.nielsen_tracker!=null&&c.nielsen_tracker!=""){b(c)
}}}});ADGEAR.lang.singleton("ADGEAR.moat",function(){var a;
function b(f){var d=!!(top.location.href);
var g=(window!=top);var e=null;if(g&&d){e=top.document.getElementById(f)
}if(e===null){e=document.getElementById(f)
}return e}function c(f,e){var d;var g=document.createElement("div");
a=document.createElement("script");a.src=f.moat_viewability_tracker;
g.appendChild(a);if(e){d=b(e)}if(d){d.appendChild(a)
}else{document.writeln(g.innerHTML)}}return{init:function(e,d){if(("moat_viewability_tracker" in e)&&e.moat_viewability_tracker!=null&&e.moat_viewability_tracker!=""){c(e,d)
}}}});ADGEAR.render(function(ddata){var containerId=ddata.getContainerId();
document.writeln('<div id="'+containerId+'" style="margin:0;padding:0;"></div>');
var img=document.createElement("img");var link=document.createElement("a");
var file=ddata.getFileUrl("image");var click=ddata.getClickUrl("clickTAG");
var alt=ddata.getVariable("alt");var tpImpression=ddata.getVariable("thirdparty_witness_url");
var link_target=ddata.getVariable("link_target")||"_blank";
if(alt){alt=ADGEAR.vendor.Base64.decode(alt)
}if(tpImpression){var _tp=ddata.prepThirdParty(ADGEAR.vendor.Base64.decode(tpImpression));
ADGEAR.lang.log("AdGear AdUnit dispatching third-party impression beacon: "+_tp);
ddata.env.eventQueue().dispatch(_tp)}img.src=file;
img.alt=alt;img.width=ddata.getWidth();img.height=ddata.getHeight();
img.style.border="0";link.href=click;link.target=link_target;
link.appendChild(img);if(typeof ddata.OOBClickTrack!=="undefined"){link.onclick=function(){ddata.env.eventQueue().dispatch(ddata.OOBClickTrack)
}}var loadAd=function(){document.getElementById(containerId).appendChild(link)
};if(document.getElementById(containerId)==null){ddata.regOnLoadEvent(loadAd)
}else{loadAd()}ADGEAR.viewport.observeAd(ddata);
ADGEAR.v.observeAd(ddata);ADGEAR.adchoices.init(ddata);
ADGEAR.comscore.vce.init(ddata);ADGEAR.nielsen.ocr.init(ddata);
ADGEAR.moat.init(ddata);try{var payload=ddata.getVariable("ADGEAR_JS_PAYLOAD");
if(typeof payload!=="undefined"&&payload!==""){var jsPayload=ADGEAR.vendor.Base64.decode(payload);
var global_evaler=window.execScript||window.eval||eval;
var previous_window_adgear_instance=window.adgear_instance;
window.adgear_instance=ddata;global_evaler(jsPayload);
window.adgear_instance=previous_window_adgear_instance
}}catch(e){ADGEAR.lang.log("AdGear AdUnit found exception in executing user-defined JavaScript payload: "+String(e))
}},{template:"Standard::Image",instance_id:"2068bc4a-8819-11e6-a07b-0026b937c890",env:{delivery:{http:{hostname:"dcs.adgear.com"},https:{hostname:"dcs.adgear.com"}},name:"cossette_production",assets:{http:{bucket:"acs",hostname:"cdn.adgear.com"},https:{bucket:"",hostname:"acs.adgear.com"}}},live_preview:false,tilings:{},campaign_id:3623,placement_id:1667432,adunit_id:66639,format_width:160,format_height:600,natural_width:160,natural_height:600,impressions_count:0,clicks_count:0,impression_tracker:"",click_tracker:"\/clicks\/thirdparty\/b=VFhOPTIwNjhiYzRhLTg4MTktMTFlNi1hMDdiLTAwMjZiOTM3Yzg5MA**\/p=1667432\/ag=13318\/a=66639",clicks:{ "clickTAG": "\/clicks\/ext\/b=VFhOPTIwNjhiYzRhLTg4MTktMTFlNi1hMDdiLTAwMjZiOTM3Yzg5MA**\/p=1667432\/ag=13318\/a=66639\/c=78741" },interactions:{ "LOADED_IN_IFRAME": "\/interactions\/ext\/b=VFhOPTIwNjhiYzRhLTg4MTktMTFlNi1hMDdiLTAwMjZiOTM3Yzg5MA**\/p=1667432\/ag=13318\/a=66639\/i=127078", "LOADED_IN_VIEWPORT": "\/interactions\/ext\/b=VFhOPTIwNjhiYzRhLTg4MTktMTFlNi1hMDdiLTAwMjZiOTM3Yzg5MA**\/p=1667432\/ag=13318\/a=66639\/i=127077", "ENTERED_VIEWPORT": "\/interactions\/ext\/b=VFhOPTIwNjhiYzRhLTg4MTktMTFlNi1hMDdiLTAwMjZiOTM3Yzg5MA**\/p=1667432\/ag=13318\/a=66639\/i=127076" },files:{image:"/assets/3623/66639/20160105221739_0.464541283133187_TELTP887_ROI_Generic_160x600_EN_R0_I0.jpg"},geo:{ "country_code": "CA", "country_name": "Canada", "region": "ON", "city": "Toronto", "postal_code": "M5S", "isp": "University of Toronto", "netspeed": "Cable\/DSL", "organization": "University of Toronto", "longitude": "-79.398697", "latitude": "43.662899" },viewport_detect:false,impression_hints:{ "AG_R": "1475355217700" },variables:{thirdparty_witness_url:"",link_target:"",alt:"",ADGEAR_JS_PAYLOAD:""},declared_click_urls:{clickTAG:"http://www.telus.com/mobility/catalog"},rtb_data:{ },comscore_tracker:null,nielsen_tracker:null,nielsen_masked_enabled:false,ad_choices_enabled:false,ad_choices_position:"TR",moat_viewability_tracker:null,client_ip:"128.100.8.181"});
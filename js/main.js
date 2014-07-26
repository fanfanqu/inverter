define("screen",["zepto"],function(e){var t=function(){this.init()};return e.extend(t.prototype,{init:function(){var t=e("#screen"),n=parseInt(t.css("width"),10);this.$screen=t,this.width=n,t.height(n),this.bindEvent()},reset:function(){this.$screen.empty(),this.$squares=e()},create:function(t){var n,r=this.$screen,i=(this.width-6*t)/t,s=e('<div class="row"></div>'),o=e('<div class="square js-square"></div>');if(this.n&&this.n===t)return this.$squares.removeClass("square-active"),0;this.reset(),this.n=t,o.width(i).height(i);for(n=0;n<t;n++)s.append(o.clone());for(n=0;n<t;n++)r.append(s.clone());this.$squares=r.find(".js-square")},bindEvent:function(){function r(e){return e.not(".square-active").length>0?!1:!0}function i(e,t){var n=Math.floor(e/t),r=e%t,i=[];return i.push(e),n+1<t&&i.push((n+1)*t+r),n-1>-1&&i.push((n-1)*t+r),r-1>-1&&i.push(n*t+r-1),r+1<t&&i.push(n*t+r+1),i}function s(t,n,s){var o=n.index(t),u=i(o,s);u.forEach(function(e){n.eq(e).toggleClass("square-active")}),e(document).trigger("screen/click"),r(n)&&e(document).trigger("screen/success")}var t=this.$screen,n=this;t.on("tap",".js-square",function(t){var r=e(this);s(r,n.$squares,n.n)})}}),t}),define("storage",[],function(){var e=function(){this.init()};return e.prototype={init:function(){function e(){var e=!1;return typeof window.localStorage=="object"?e=localStorage:typeof window.globalStorage=="object"&&(e=window.globalStorage),e}this.storage=e()},getStorage:function(){return this.storage},save:function(e,t){var n=this.storage,r=!1;return n!==!1&&(r=n.setItem(e,t)),r},load:function(e){var t=this.storage,n="";return t!==!1&&(n=t.getItem(e)),n}},e}),define("score",["zepto","storage"],function(e,t){var n=function(){this.init()};return e.extend(n.prototype,{init:function(){var n=new t,r=parseInt(n.load("curLevel"),10)||1,i=parseInt(n.load("supLevel"),10)||1,s=parseInt(n.load("supClick"),10)||0,o=parseInt(n.load("curClick"),10)||0,u=parseInt(n.load("totalClick"),10)||0,a=e("#cur-level"),f=e("#sup-level"),l=e("#cur-click"),c=e("#total-click");this.storage=n,this.$curLevel=a,this.$supLevel=f,this.$curClick=l,this.$totalClick=c,this.curLevel=r,this.supLevel=i,this.supClick=s,this.curClick=o,this.totalClick=u,this.updateView()},getLevel:function(){return this.curLevel},addClick:function(){this.curClick+=1,this.totalClick+=1,this.updateView()},addLevel:function(){this.curLevel+=1;if(this.curLevel>this.supLevel||this.curLevel===this.supLevel&&this.supClick>this.totalClick)this.supLevel=this.curLevel,this.supClick=this.totalClick,e(document).trigger("score/hightLevel");return this.save(),this.updateView(),this.curLevel},resetLevel:function(){var e=this.storage;return this.curLevel=parseInt(e.load("curLevel"),10)||1,this.curClick=parseInt(e.load("curClick"),10)||0,this.totalClick=parseInt(e.load("totalClick"),10)||0,this.updateView(),this.curLevel},reset:function(){this.curLevel=1,this.curClick=0,this.totalClick=0,this.updateView()},save:function(){var e=this.storage;e.save("curLevel",this.curLevel),e.save("supLevel",this.supLevel),e.save("supClick",this.supClick),e.save("curClick",this.curClick),e.save("totalClick",this.totalClick)},updateView:function(){this.$curLevel.html(this.curLevel),this.$supLevel.html(this.supLevel+"("+this.supClick+"次点击)"),this.$curClick.html(this.curClick),this.$totalClick.html(this.totalClick)}}),n}),define("sound",[],function(){var e=function(){this.init()};return e.prototype={init:function(){this.sound=document.createElement("audio"),this.sound.setAttribute("src",""),this.sound.setAttribute("autoplay",!0),this.sound.setAttribute("id","yanSound"),document.body.appendChild(this.sound)},src:function(e){this.sound.src=e},play:function(e){e=e||this.sound.src,this.src(e)}},e}),require.config({shim:{zepto:{exports:"Zepto"}}}),require(["zepto","screen","score","sound"],function(e,t,n,r){var i=new t,s=new n,o=e(".js-pop"),u=e("#pop-wrap"),a=new r;e(function(){var e=s.getLevel();i.create(e)}),e(document).on("screen/success",function(){var t=s.addLevel();i.create(t),u.show(),e("#success-pop").find(".js-pop-body").html("即将进入第"+t+"关"),e("#success-pop").show(),window.setTimeout(function(){e("#success-pop").hide(),u.hide()},2e3)}).on("screen/click",function(){s.addClick(),a.play("media/click.wav")}).on("score/hightLevel",function(){u.show(),e("#hightLevel-pop").show()}),o.on("tap",function(e){o.hide(),u.hide(),e.preventDefault()}),e("#restart-game").on("tap",function(e){s.reset(),i.create(1),e.preventDefault()}),e("#pop-restart-game").on("tap",function(t){u.show(),e("#restart-game-pop").show(),t.preventDefault()}),e("#restart-level").on("tap",function(e){i.create(s.resetLevel()),e.preventDefault()}),e("#pop-restart-level").on("tap",function(t){u.show(),e("#restart-level-pop").show(),t.preventDefault()}),e("#pop-intro").on("tap",function(t){u.show(),e("#intro-pop").show(),t.preventDefault()})}),define("index",function(){});
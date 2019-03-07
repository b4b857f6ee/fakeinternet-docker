 			
window.onload = function(){
		//分类导航
		  var Mnav = document.getElementById('normal-nav'),
			subC = document.getElementById('sub'),
			catGc = document.getElementById('category-con'),
			Nli = Mnav.querySelectorAll('ul li'),
			sub = subC.querySelectorAll('.line-list'),
			len = Nli.length;
				
			for(var i=0;i<len;i++){
				(function(i){
					var subCss = sub[i].className;		//存储初始的class
					Nli[i].onmouseenter = function(){
						for(var j=0;j<len;j++){
							Nli[j].className = ""
							sub[j].className = subCss
						}
						this.className = "licolor" + i +" active"	
						sub[i].className = subCss+" block"
					} 
					catGc.onmouseleave = function(){
							for(var j=0;j<len;j++){
								sub[j].className = subCss
								Nli[j].className = ""
							}
						
					}
				})(i);
				//Nli[i].dataset.id	;//获取data-id的值
				
			}
			
		//点击返回顶部
		  var oTopL = document.getElementById("to-top-l");
		  var oTopR = document.getElementById("to-top-r");
		  oTopR.onclick = goblack;
		  oTopL.onclick = goblack;
		 function goblack(){
			scrollToptimer = setInterval(function () {
				var top = document.body.scrollTop || document.documentElement.scrollTop;
				var speed = top / 4;
				if (document.body.scrollTop!=0) {
					document.body.scrollTop -= speed;
				}else {
					document.documentElement.scrollTop -= speed;
				}
				if (top == 0) {
					clearInterval(scrollToptimer);
				}//
				console.log(top)
			}, 30); 
		  }
		
		 /*
		 **时间版运动框架，占用全局 tMove 变量
		 *
		 * 参数：
			 @ obj   object 执行动画的对象
			 @ json  json 要改变的属性及目标值
			 @ time  number 动画持续时间
			 @ type  string （可缺省） 运动曲线
			 @ callback function （可缺省） 回调函数

		 * return：
		 *   默认不需要使用return，当tMove变量被占用是，可以用来代替
		 *
			* tMove 函数本身返回一个json，拥有timer属性，可以用来清楚定时器
		 */
 			(function () {
                var Tween = {
                    linear: function (t, b, c, d){  //匀速
                        return c*t/d + b;
                    },
                    easeIn: function(t, b, c, d){  //加速曲线
                        return c*(t/=d)*t + b;
                    },
                    easeOut: function(t, b, c, d){  //减速曲线
                        return -c *(t/=d)*(t-2) + b;
                    },
                    easeBoth: function(t, b, c, d){  //加速减速曲线
                        if ((t/=d/2) < 1) {
                            return c/2*t*t + b;
                        }
                        return -c/2 * ((--t)*(t-2) - 1) + b;
                    },
                    easeInStrong: function(t, b, c, d){  //加加速曲线
                        return c*(t/=d)*t*t*t + b;
                    },
                    easeOutStrong: function(t, b, c, d){  //减减速曲线
                        return -c * ((t=t/d-1)*t*t*t - 1) + b;
                    },
                    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                        if ((t/=d/2) < 1) {
                            return c/2*t*t*t*t + b;
                        }
                        return -c/2 * ((t-=2)*t*t*t - 2) + b;
                    },
                    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                        if (t === 0) {
                            return b;
                        }
                        if ( (t /= d) == 1 ) {
                            return b+c;
                        }
                        if (!p) {
                            p=d*0.3;
                        }
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            var s = p/4;
                        } else {
                            var s = p/(2*Math.PI) * Math.asin (c/a);
                        }
                        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    },
                    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                        if (t === 0) {
                            return b;
                        }
                        if ( (t /= d) == 1 ) {
                            return b+c;
                        }
                        if (!p) {
                            p=d*0.3;
                        }
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            var s = p / 4;
                        } else {
                            var s = p/(2*Math.PI) * Math.asin (c/a);
                        }
                        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                    },
                    elasticBoth: function(t, b, c, d, a, p){
                        if (t === 0) {
                            return b;
                        }
                        if ( (t /= d/2) == 2 ) {
                            return b+c;
                        }
                        if (!p) {
                            p = d*(0.3*1.5);
                        }
                        if ( !a || a < Math.abs(c) ) {
                            a = c;
                            var s = p/4;
                        }
                        else {
                            var s = p/(2*Math.PI) * Math.asin (c/a);
                        }
                        if (t < 1) {
                            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                        }
                        return a*Math.pow(2,-10*(t-=1)) *
                            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
                    },
                    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                        if (typeof s == 'undefined') {
                            s = 1.70158;
                        }
                        return c*(t/=d)*t*((s+1)*t - s) + b;
                    },
                    backOut: function(t, b, c, d, s){
                        if (typeof s == 'undefined') {
                            s = 3.70158;
                        }
                        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                    },
                    backBoth: function(t, b, c, d, s){
                        if (typeof s == 'undefined') {
                            s = 1.70158;
                        }
                        if ((t /= d/2 ) < 1) {
                            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                        }
                        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                    },
                    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
                    },
                    bounceOut: function(t, b, c, d){
                        if ((t/=d) < (1/2.75)) {
                            return c*(7.5625*t*t) + b;
                        } else if (t < (2/2.75)) {
                            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                        } else if (t < (2.5/2.75)) {
                            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                        }
                        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
                    },
                    bounceBoth: function(t, b, c, d){
                        if (t < d/2) {
                            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                        }
                        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
                    }
                };
                function tMove( obj , json , time , type , callback ) {
                    window.requestAnimationFrame = window.requestAnimationFrame||function(a){return setTimeout(a,1000/60)};
                    window.cancelAnimationFrame = window.cancelAnimationFrame||clearTimeout;
                    var sss = {};
                    if ( typeof type === "function" ){
                        callback = type;
                        type = "easeBoth";
                    }else{
                        type = type || "easeBoth";
                    }
                    var cssJson = obj.currentStyle || getComputedStyle(obj);
                    var start = {},S = {};
                    for (var key in json) {
                        start[key] = parseFloat(cssJson[key]);//储存每个属性的 初始值
                        S[key] = json[key] - start[key];//存储每个属性的 总路程
                        if ( !S[key] ){
                            delete start[key];
                            delete S[key];
                        }
                    }
                    var sTime = new Date();
                    (function fn() {
                        var t = new Date() - sTime; //经过了多长时间
                        t>= time?t=time:sss.timer=requestAnimationFrame(fn);
                        for (var key in S) {
                            var val = Tween[type](t , start[key] , S[key] , time);
                            if ( key === "opacity" || key === "zIndex" ){
                                obj.style[key] = val;
                                obj.style.filter = "alpha(opacity="+ val*100 +")";
                            }else{
                                obj.style[key] = val + 'px';
                            }
                        }
                        if(t===time)callback && callback.call( obj );
                    })();
                    return sss;
                }
                window.tMove = tMove;
                return tMove;
            })();

            //console.log( Tween.easeOut() );
            /*
             t:  已经过了多长时间
             b:  初始值
             c:  总路程
             d:  总持续时间
             */
			
			 
			(function(){
				var bannerBg = document.querySelectorAll('#bg-repeat div')
				var obox = document.querySelector('#category-con .banner-Carousel')
				var dot = obox.querySelectorAll(".slider i")
				var ali = obox.querySelectorAll("ul li");
				var arr = ['#3d0453','#e8e8e8','#e8e8e8','#4579ae','#42a3f8'];
				var len = dot.length;
				var timer = null;
				var n = 0;	
				
				for(var i=0;i<len;i++){
				//图片渐显渐隐处理
					dot[i].a = i;
					(function(i){					//用闭包存储i
						bannerBg[i].style.backgroundColor = arr[i]		
						dot[i].onmouseenter = function(){
                        if ( n === this.a ){
                            return;
                        };
						fn(n,this.a)
						}	
					})(i);
					
				};
					
			//自动轮播	
			auto();
			obox.onmouseleave = function(){
				auto()
			};		
			obox.onmouseenter = function(){
				clearInterval(timer)
			};		
			function auto(){
				timer = setInterval(function(){
								n++
								n %= len
								fn(n,n);
								// document.title = n;
				},3000)
			}
				
				function fn(m,index){					
						for(var j=0;j<len;j++){
							dot[j].className = ""
							ali[j].stop && cancelAnimationFrame( ali[j].stop.timer ); //需要清除，否则切换窗口会出现Bug
							bannerBg[j].stop && cancelAnimationFrame( bannerBg[j].stop.timer ); //需要清除，否则切换窗口会出现Bug
							ali[j].stop = tMove(ali[j],{opacity:0,zIndex:0},300);  //运动框架  
							bannerBg[j].stop = tMove(bannerBg[j],{opacity:0,zIndex:0},300);  //背景色
						}
						dot[index].className = "dot"			//给当前btn下标添加属性
						m =  index
						ali[m].stop && cancelAnimationFrame( ali[m].stop.timer );	//需要清除，否则切换窗口会出现Bug
						bannerBg[m].stop && cancelAnimationFrame(bannerBg[m].stop.timer );	//需要清除，否则切换窗口会出现Bug
						ali[m].stop = tMove(ali[m],{opacity:1,zIndex:1},300);
						bannerBg[m].stop = tMove( bannerBg[m],{opacity:1,zIndex:1},300);//背景色
						ali[m].className = 'on'					//给当前列表下标添加属性
						n = m			//重新赋值给n
				}
			})();
				
			
				
}
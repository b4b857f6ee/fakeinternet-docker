
window.onload = function () {
    // getStyle
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }

    //完美运动
    function startMove(obj, json, endFn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in json) {
                var iCur = 0;
                if (attr == 'opacity') {
                    iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }

                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (iCur != json[attr]) {
                    bStop = false;
                }

                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if (bStop) {
                clearInterval(obj.timer);
                endFn && endFn();
            }
        }, 30);
    }

    // 搜索框移入
    showSearch();
    function showSearch() {
        var oSearchIp = document.getElementById('search_input');
        var oSearch = document.getElementById('search');
        var oUl = oSearch.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');

        oSearchIp.onclick = function (ev) {
            var ev = ev || event;
            startMove(oSearch, {
                opacity: '100'
            });
            // oSearch.style.display = 'block';
            ev.stopPropagation();
        }
        document.onclick = function () {
            startMove(oSearch, {
                opacity: '0'
            });
        }

        for (var i = 0; i < aLi.length - 1; i++) {
            aLi[i].onmouseover = function () {
                this.style.background = '#31c27c';
            }
            aLi[i].onmouseout = function () {
                this.style.background = '#fff';
            }
        }
    }
    // 新歌首发翻页
    pageOne();
    function pageOne(){
        var oNewSong = document.getElementById('newSong');
        var oNewSongPic = document.getElementById('newSong_pic');
        var oUl = oNewSongPic.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');
        var oPagrOne = document.getElementById('page_one');
        var aA = oPagrOne.getElementsByTagName('a');
        var oSpan = document.getElementById('newSong_li');
        var aSpan = oSpan.getElementsByTagName('span');
        for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        aLi[i].onmouseover = function(){
            this.getElementsByTagName('h3')[0].style.background = '#31c27c';
            startMove(this.getElementsByTagName('h3')[0],{opacity:'90'});
        }
        aLi[i].onmouseout = function(){
            this.getElementsByTagName('h3')[0].style.background = 'rgba(05,05,05,0.5)' ;
        }
        aLi[i].getElementsByTagName('a')[0].onmouseover = function(){
            startMove(this,{opacity:'50'});
            this.getElementsByTagName('img')[0].style.transform = 'scale(1.1,1.1)';
        }
        aLi[i].getElementsByTagName('a')[0].onmouseout =function(){
            startMove(this,{opacity:'100'});
            this.getElementsByTagName('img')[0].style.transform = 'scale(1,1)';
        }
        }
        oNewSong.onmouseover = function(){
        startMove(aA[0],{marginLeft:'0'});
        startMove(aA[1],{marginRight:'0'});
        }
        oNewSong.onmouseout = function(){
        startMove(aA[0],{marginLeft:'-75'});
        startMove(aA[1],{marginRight:'-75'});
        }
        oUl.style.width = aLi[0].offsetWidth*aLi.length+'px';
        var num=0;
        var l=aLi[0].offsetWidth*4;
        aA[1].onclick = function(){

        num++;
        for(var i=0;i<aSpan.length;i++){
                aSpan[i].className = '';
            }if(num>2){
                aSpan[2].className='active'
            }else{
                aSpan[num].className = 'active';
            }
        if(l*num>2400){
            oUl.style.left = -2400+'px';
            num = 2;
        }else{
            startMove(oUl,{left:-l*num});
        }
        }
        aA[0].onclick=function(){
        num--;
        for(var i=0;i<aSpan.length;i++){
                aSpan[i].className = '';
            }if(num<0){
                aSpan[0].className='active';
            }else{
                aSpan[num].className = 'active';
            }

        if(l*num<1200){
            startMove(oUl,{left:0});
            num=0;
        }else{
            startMove(oUl,{left:-l*num});
        }
        }
    }
    //精彩推荐
    recommendHot();
    function recommendHot(){
        var oSongRecommed = document.getElementById('song_recommed');
        var oPageTwo = document.getElementById('page_two'); 
        var aA = oPageTwo.getElementsByTagName('a');
        var oCascadingPic = document.getElementById('cascading_pic');
        var aPic =  oCascadingPic.getElementsByTagName('a');
        var oCascadingLi = document.getElementById('cascading_pic_li');
        var aSpan = oCascadingLi.getElementsByTagName('span');
        var arr=[];
        var picnum=0;
        for(var i=0;i<aPic.length;i++){
        aPic[i].index = i;
        var oImg = aPic[i].getElementsByTagName('img')[0];
        arr.push([ parseInt(getStyle(aPic[i],'left')),parseInt(getStyle(aPic[i],'top')),getStyle(aPic[i],'opacity')*100,getStyle(aPic[i],'zIndex') , oImg.width ]);
        }
        // alert(arr);
        oSongRecommed.onmouseover = recommedShow;
        function recommedShow(){
        startMove(aA[0],{marginLeft:'0'});
        startMove(aA[1],{marginRight:'0'});
        }
        oSongRecommed.onmouseout = recommedHide;
        function recommedHide(){
        startMove(aA[0],{marginLeft:'-75'});
        startMove(aA[1],{marginRight:'-75'});
        }
        // 上一张
        function cascadingPic(){
        for(var i=0;i<aPic.length;i++){
            var oImg = aPic[i].getElementsByTagName('img')[0];
            aPic[i].style.zIndex = arr[i][3];
            startMove(aPic[i],{left:arr[i][0],top : arr[i][1] , opacity : arr[i][2] });
            startMove(oImg,{width:arr[i][4]});
        }
        }
        aA[0].onclick = function(){
        arr.push(arr[0]);
        arr.shift();
        cascadingPic();
        }
        // 下一张
        aA[1].onclick = function(){
        arr.unshift(arr[arr.length-1]);
        arr.pop();
        cascadingPic();
        }           
    }           
    //排行榜 移入移出
    toplistShow();
    function toplistShow() {
        var oToplist = document.getElementById('toplist_mod_list');
        var aLi = oToplist.getElementsByClassName('toplist_mod_list_li');
        var aA = oToplist.getElementsByClassName('line_box');
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].style.background = 'url(' + 'images/Toplist' + i + '.jpg)';
            aLi[i].onmouseover = function () {
                for (var j = 0; j < aA.length; j++) {
                    aA[j].style.background = '';
                }
                aA[this.index].style.background = 'url(' + 'images/icon_play.png' + ')';
                startMove(aA[this.index], {
                    opacity: '100'
                });
                startMove(this, {
                    opacity: '70'
                });
                // this.style.transform = 'scale(1.1,1.1)';
            }
            aLi[i].onmouseout = function () {
                aA[this.index].style.background = '';
                startMove(aA[this.index], {
                    opacity: '0'
                });
                startMove(this, {
                    opacity: '100'
                });
                // this.style.transform = 'scale(1,1)';
            }
        }
    }
    // MV 移入移出
    mvPic();
    function mvPic(){
        var oMvPic = document.getElementById('mv_pic');
        var aLi = oMvPic.getElementsByTagName('li');
        for(var i=0;i<aLi.length;i++){
        aLi[i].onmouseover =function(){
            this.getElementsByTagName('img')[0].style.transform = 'scale(1.1,1.1)';
            startMove(this,{opacity:'70'});
        }
        aLi[i].onmouseout =function(){
            this.getElementsByTagName('img')[0].style.transform = 'scale(1,1)';
            startMove(this,{opacity:'100'});
        }
        // aLi[i].getElementsByTagName('a')[0].onmouseover = function(){
        //     startMove(this,{opacity:'60'});
        // };
        // aLi[i].getElementsByTagName('a')[0].onmouseout = function(){
        //     startMove(this,{opacity:'100'});
        // };
        }
    };
    // footer移入移出
    footerShow();
    function footerShow(){
        var oDownloadPic =document.getElementById('downloadPic');
        var aLid = oDownloadPic.getElementsByTagName('li');
        var oProductPic =document.getElementById('productPic');
        var aLip =oProductPic.getElementsByTagName('li');
        for(var i=0;i<aLid.length;i++){
        showbg(aLid[i]);
        // aLid[i].onmouseover =function(){
        //     this.getElementsByTagName('a')[0].style.backgroundPositionY = -50+'px';
        //     this.style.color ='#31c27c';
        // }
        // aLid[i].onmouseout = function(){
        //     this.getElementsByTagName('a')[0].style.backgroundPositionY = -3+'px';
        //     this.style.color = '#999';
        // }
         }
        for(var i=0;i<aLip.length;i++){
        showbg(aLip[i]);
        // aLip[i].onmouseover =function(){
        //     this.getElementsByTagName('a')[0].style.backgroundPositionY = -50+'px';
        //     this.style.color ='#31c27c';
        // }
        // aLip[i].onmouseout = function(){
        //     this.getElementsByTagName('a')[0].style.backgroundPositionY = -3+'px';
        //     this.style.color = '#999';
        // }
        }

        function showbg(obj){
        obj.onmouseover =function(){
            this.getElementsByTagName('a')[0].style.backgroundPositionY = -50+'px';
            this.style.color ='#31c27c';
        }
        obj.onmouseout = function(){
            this.getElementsByTagName('a')[0].style.backgroundPositionY = -3+'px';
            this.style.color = '#999';
        }
        }
    };
}
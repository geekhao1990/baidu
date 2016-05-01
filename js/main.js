/**
 * Created by hao on 2016/4/28.
 */
/**********************************
 *tabMove()     鼠标移动切换标签  *
 *tab           移动到哪个标签对象*
 *tabCurrent    移除当前标签样式  *
 *content       内容页            *
 *tabOnClass    标签选中时样样式  *
 *contentOnClass内容选中时样样式  *
 *********************************/
function tabMove(tab, tabCurrent, content, tabOnClass, contentOnClass) {
    $(tab).each(function(index) {
        $(this).mouseover(function() {
            $(content).removeClass(contentOnClass);
            $(tabCurrent).removeClass(tabOnClass);
            $(content).eq(index).addClass(contentOnClass);
            $(this).addClass(tabOnClass);
        })
    });
}

/**********************************
 *tabCilck()    鼠标单击切换标签    *
 *tabbtn        需要单击的标签对象  *
 *tabbtnclass   单击后标签更变样式  *
 *content       内容页             *
 *********************************/
function tabCilck(tabbtn, tabbtnclass, content) {
    $(tabbtn).click(function() {
        $(this).addClass(tabbtnclass).siblings().removeClass();
        var index = $(this).index();
        $(content).stop().animate({
            top: -320 * index
        }, 500)
    });
}
/**********************************
 *         mouseMTSH(a,b)         *
 *    鼠标移动显示隐藏下拉列表    *
 *a 移动到哪个对象显示隐藏下拉列表*
 *a 下拉列表对象                  *
 *********************************/
//这个是工厂模式，好处是一次定义处处应用
function mouseMTSH(a, b) {
    $(a).hover(
        function() {
            $(b).show();
        },
        function() {
            $(b).hide();
        }
    );
    $(b).hover(
        function() {
            $(b).show();
        },
        function() {
            $(b).hide();
        }
    );
}
/**********************************
 *         setBodyBg(   )         *
 *          单击更换背景          *
 *     btn 被单击的对象           *
 *     bgImg 被更换背景的对象     *
 *********************************/

function setBodyBg(imgurl){
    $('body').css("background-image", "url(" + imgurl + ")");
    if(imgurl=="images/609.jpg" || "images/608.jpg"){
        $('.weather a').css("color","#555");
        $('.u_sp a').css("color","#555");
        $('.nav>a').not($('.more')).css("color","#555");
    }else{
        $('.weather a').css("color","#F9F9F9");
        $('.u_sp a').css("color","#F9F9F9");
        $('.nav>a').not($('.more')).css("color","#F9F9F9");
    }
    localStorage.setItem("bodybg", imgurl);
}
//setBodyBg(".s-skin ul li", ".bodybg");
/**************************************
 *banner()      左右切换滚播焦点图效果*
 *tab           角标                  *
 *tabClass      角标当前内容的角标样式*
 *content       内容页                *
 *next          左边按钮              *
 *prev          右边按钮              *
 *************************************/
function banner(tab, tabClass, content, next, prev) {
    var num = 0;
    // 下面写一些事件
    // 1.用户点击角标部分
    $(tab).click(function() {
        $(this).addClass(tabClass).siblings().removeClass(); // 角标排他切换类
        var index = $(this).index();
        $(content).stop().animate({
            left: $('.scbl_t a').outerWidth()  * index * (-1)+'px'
        }, 500); // ul移动切换对应图片
        num = index; // 记得把2个索引值同步
        // 放到头部去测试看的虚拟索引值，项目中删掉
    });
    // 2.左右箭头模块
    $(next).click(function() {
        num++;
        if (num > 4) {
            num = 0;
        }
        // 都有谁需要跟着这个虚拟索引值顺序走。   num
        $(tab).eq(num).addClass(tabClass).siblings().removeClass();
        $(content).stop().animate({
            left: -$('.scbl_t a').outerWidth()  * num
        }, 500) ;// ul移动切换对应图片
    });
    $(prev).click(function() {
        num--;
        if (num < 0) {
            num = 4;
        }
        // 都有谁需要跟着这个虚拟索引值顺序走。
        $(tab).eq(num).addClass(tabClass).siblings().removeClass();
        $(content).stop().animate({
            left: -$('.scbl_t a').outerWidth()  * num
        }, 500)
    });
    // 自动播放模块，其实需要定时器
    //var num=0;
    var timer = null;

    function autorun(sum) {
        num++;
        var sum;
        if (num > sum) {
            num = 0
        }
        $(tab).eq(num).addClass(tabClass).siblings().removeClass();
        $(content).stop().animate({
            left: -$('.scbl_t a').outerWidth()  * num
        }, 500);

    }
    timer = setInterval(function(){autorun(4)}, 3000); // 指令进行了分离
    //停止自动播放，鼠标移上清除定时器，鼠标离开重新启动定时器。
    $('.scb_l').hover(function() {
        clearInterval(timer)
    }, function() {
        clearInterval(timer);
        timer = setInterval(function(){autorun(4)}, 3000); // 指令进行了分离
    });
}
//判断是否存在主题;
function ifbg(){
    var bdbg = localStorage.getItem("bodybg");
    if (bdbg != null) {
        $("body").css("background-image", "url(" + bdbg + ")");
    }
    switch(bdbg){
        case "images/609.jpg":
        case "images/608.jpg":
            $('.weather a').css("color","#555");
            $('.u_sp a').css("color","#555");
            $('.nav>a').not($('.more')).css("color","#555");
            //$('.content .logo img').attr("src","images/logo_white.png");
            break;
        case null:
            //$('.logo img').attr("src","images/logo.png");
            break;
        default:
            $('.weather a').css("color","#F9F9F9");
            $('.u_sp a').css("color","#F9F9F9");
            $('.nav>a').not($('.more')).css("color","#F9F9F9");
            //$('.content .logo img').attr("src","images/logo_white.png");
            break;
    }

}
$(document).ready(function() {
    ifbg();
    tabCilck(".s_menu_left ul li", "lion", ".scbox>div");
    tabMove(".scb_t a", ".scb_t a.scb_ton", ".scb_b>div", "scb_ton", "scb_bon");
    banner('.imglist span', 'ison', '.scbl_t', '.rightbtn', '.leftbtn');
    mouseMTSH(".more", ".morePd");
    mouseMTSH(".header .nav .set", ".header .nav .listMenu");
    mouseMTSH(".header .nav .login", ".header .nav .userSet");
    mouseMTSH(".s-skin", ".s-skin ul");
    $(".s-skin ul li").click(function() {
        var imgurl = $(this).find("img").attr("src");
        setBodyBg(imgurl);
    });

    $("#sr").mousemove(function() {
        $(this).addClass("ipt_texthover");
    }).focus(function() {
        $(this).addClass("ipt_textFocus");
    }).blur(function() {
        $(this).removeClass("ipt_textFocus");
    }).mouseout(function() {
        $(this).removeClass("ipt_texthover");
    });
});

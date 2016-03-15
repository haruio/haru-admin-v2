$(function(){
	
	//language
	$("header dl dt").click(function(){
		$(this).next("dd").slideToggle(200);
	});

	//channels
	$("#container>nav>div dl dd a").click(function(){
		$(this).parents("dl").next("ul").slideToggle(200);
		$("#container>nav>div dl dd a").not(this).parents("dl").next("ul").slideUp(200);
		return false
	});

	//gnb & lnb
	var gnbCrt1 = $("header ul li:nth-child(" + (gnbDep1) + ") a");
	var lnbCrt1 = $("#lnb>li:nth-child(" + (lnbDep1) + ")");
	var lnbCrt2 = $("#lnb>li:nth-child(" + (lnbDep1) + ") ul li:nth-child(" + (lnbDep2) + ") a");
	if(gnbCrt1) gnbCrt1.addClass("on");
	if(lnbCrt1) {
		lnbCrt1.addClass("on").find("ul").slideDown(0);
		lnbCrt1.prev("li").addClass("no_bg")
	}
	if(lnbCrt2) lnbCrt2.addClass("on");
	
	$("#lnb>li:has(ul)").addClass("child")
	$("#lnb>li:has(ul)>a").click(function(){
		$(this).parent().addClass("on").find("ul").slideDown(200);
		$(this).parent().prev("li").addClass("no_bg");
		$("#lnb>li>a").not(this).parent().removeClass("on").find("ul").slideUp(200);
		$("#lnb>li>a").not(this).parent().prev("li").removeClass("no_bg");
		return false;
	});
	$("#container>nav").mouseleave(function(){
		if(lnbCrt1) {
			lnbCrt1.addClass("on").find("ul").slideDown(200);
			lnbCrt1.prev("li").addClass("no_bg")
			$("#lnb>li").not(lnbCrt1).removeClass("on").find("ul").slideUp(200);
			$("#lnb>li").not(lnbCrt1).prev("li").removeClass("no_bg");
		}
	});

	//공통리스트
	$(".list>li").hover(function(){
		$(this).find("div p").stop().fadeIn(300).stop().animate({opacity:1}, 100);
	}, function(){
		$(this).find("div p").stop().fadeOut(300);
	});
	//메인피트 리스트
	$(".main_list>li").hover(function(){
		$(this).find(".modifi").stop().fadeIn(300).stop().animate({opacity:1}, 100);
	}, function(){
		$(this).find(".modifi").stop().fadeOut(300);
	});

});
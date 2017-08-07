

function collapseNavbar(){
    if($(".navbar").offset().top>50){
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $( "#logomenu" ).css("display", "block");

    }else{
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $( "#logomenu" ).css("display", "none");
    }}
 $(window).scroll(collapseNavbar);
 $(document).ready(collapseNavbar);

 $(function(){
    $('a.page-scroll').bind('click',function(event){
        var $anchor=$(this);
        $('html, body').stop().animate({
            scrollTop:$($anchor.attr('href')).offset().top},1500,'easeInOutExpo');
        event.preventDefault();});});


 $('.navbar-collapse ul li a').click(function(){
    $(".navbar-collapse").collapse('hide');
 });


if($(window).width()<700){
        $('#icone4').attr( "src", "iconeseta01.png" );
        $('#icone6').attr( "src", "iconeseta01.png" );
    }
if($(window).width()<900){
        $('#icone6').attr( "src", "iconeseta01.png" );
    }

if($(window).width()<500){
        $('.button').removeClass('hvr-grow');
    }

$(document).ready(function(){

    $("#flip1").click(function(){
    $("#panel1").slideToggle("slow");

    if($('#icone1').attr( "src")=="iconeseta01.png"){
        $('#icone1').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone1').attr( "src", "iconeseta01.png" );
    }

    });

});

$(document).ready(function(){
    $("#flip2").click(function(){
    $("#panel2").slideToggle("slow");

    if($('#icone2').attr( "src")=="iconeseta01.png"){
        $('#icone2').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone2').attr( "src", "iconeseta01.png" );
    }
    });
});
$(document).ready(function(){
    $("#flip3").click(function(){
    $("#panel3").slideToggle("slow");

    if($('#icone3').attr( "src")=="iconeseta01.png"){
        $('#icone3').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone3').attr( "src", "iconeseta01.png" );
    }
    });
});
$(document).ready(function(){
    $("#flip4").click(function(){
        $("#panel4").slideToggle("slow");
    if($('#icone4').attr( "src")=="iconeseta01.png"){
        $('#icone4').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone4').attr( "src", "iconeseta01.png" );
    }
    });
});
$(document).ready(function(){
    $("#flip5").click(function(){
        $("#panel5").slideToggle("slow");

    if($('#icone5').attr( "src")=="iconeseta01.png"){
        $('#icone5').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone5').attr( "src", "iconeseta01.png" );
    }
    });
});
$(document).ready(function(){
    $("#flip6").click(function(){
        $("#panel6").slideToggle("slow");

    if($('#icone6').attr( "src")=="iconeseta01.png"){
        $('#icone6').attr( "src", "iconeseta02.png" );
    }
    else{
        $('#icone6').attr( "src", "iconeseta01.png" );
    }


    });
});


$('#help').click(function () {
  $('body').chardinJs('start')
})

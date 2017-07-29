
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



$(document).ready(function(){
    

    $("#flip1").click(function(){
        $("#panel1").slideToggle("slow");

    if(window.document.getElementById("icone1").name==="desligado1"){
        window.document.getElementById("icone1").src="iconeseta02.png";
        window.document.getElementById("icone1").name="ligado1";
    }
    else{
        window.document.getElementById("icone1").src="iconeseta01.png";
        window.document.getElementById("icone1").name="desligado1";
    }

    });

});

$(document).ready(function(){
    $("#flip2").click(function(){
        $("#panel2").slideToggle("slow");
    if(window.document.getElementById("icone2").name==="desligado2"){
        window.document.getElementById("icone2").src="iconeseta02.png";
        window.document.getElementById("icone2").name="ligado2";
    }
    else{
        window.document.getElementById("icone2").src="iconeseta01.png";
        window.document.getElementById("icone2").name="desligado2";
    }
    });
});
$(document).ready(function(){
    $("#flip3").click(function(){
        $("#panel3").slideToggle("slow");
    if(window.document.getElementById("icone3").name==="desligado3"){
        window.document.getElementById("icone3").src="iconeseta02.png";
        window.document.getElementById("icone3").name="ligado3";
    }
    else{
        window.document.getElementById("icone3").src="iconeseta01.png";
        window.document.getElementById("icone3").name="desligado3";
    }
    });
});
$(document).ready(function(){
    $("#flip4").click(function(){
        $("#panel4").slideToggle("slow");
         if(window.document.getElementById("icone4").name==="desligado4"){
        window.document.getElementById("icone4").src="iconeseta02.png";
        window.document.getElementById("icone4").name="ligado4";
    }
    else{
        window.document.getElementById("icone4").src="iconeseta01.png";
        window.document.getElementById("icone4").name="desligado4";
    }
    });
});
$(document).ready(function(){
    $("#flip5").click(function(){
        $("#panel5").slideToggle("slow");
            if(window.document.getElementById("icone5").name==="desligado5"){
        window.document.getElementById("icone5").src="iconeseta02.png";
        window.document.getElementById("icone5").name="ligado5";
    }
    else{
        window.document.getElementById("icone5").src="iconeseta01.png";
        window.document.getElementById("icone5").name="desligado5";
    }
    });
});
$(document).ready(function(){
    $("#flip6").click(function(){
        $("#panel6").slideToggle("slow");
            if(window.document.getElementById("icone6").name==="desligado6"){
        window.document.getElementById("icone6").src="iconeseta02.png";
        window.document.getElementById("icone6").name="ligado6";
    }
    else{
        window.document.getElementById("icone6").src="iconeseta01.png";
        window.document.getElementById("icone6").name="desligado6";
    }
    });
});





$(function() {
  $('.form-avaliacao').on('submit', function () {
    $(this).ajaxSubmit({
      success: function (resposta) {
        alert('Obrigado pela avaliação, paz')
      },
      error: function () {
        $('.modal').addClass("animated shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
          alert('Não foi possível registrar sua avaliação, por favor, tente mais tarde')
          $('.modal').removeClass("animated shake");
        });
      }
    });
    return false;
  });
});

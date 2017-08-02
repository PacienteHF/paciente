$(function() {
  $('.form-avaliacao').on('submit', function() {
    $(this).ajaxSubmit({
      success: function(resposta) {
        new Noty({
          type: 'success',
          text: 'Avaliação realizada com sucesso. Agradecemos sua contribuição.',
          timeout: 4000,
          modal: true,
          layout: 'centerRight',
          callbacks: {
            onClose: function() {
              window.location.reload();
            }
          }
        }).show();
      },
      error: function(resposta) {
        if(resposta.status === 401) {
          $('.modal').addClass("animated shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            new Noty({
              type: 'warning',
              text: 'Você já avaliou esse estabelecimento neste quesito. Aguarde até que possa avaliar novamente.',
              timeout: 5000,
              modal: true,
              layout: 'centerRight'
            }).show();
            $('.modal').removeClass("animated shake");
          });
        } else {
          $('.modal').addClass("animated shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            new Noty({
              type: 'error',
              text: 'Algum erro acontenceu. Por favor, tente mais tarde.',
              timeout: 5000,
              modal: true,
              layout: 'centerRight'
            }).show();
            $('.modal').removeClass("animated shake");
          });
        }
      }
    });
    return false;
  });
});

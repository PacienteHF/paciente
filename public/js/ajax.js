$(function() {
  $('.form-avaliacao').on('submit', function () {
    $(this).ajaxSubmit({
      success: function (resposta) {
        alert('Obrigado pela avaliação, paz')
      },
      error: function () {
        alert('Não foi possível registrar sua avaliação, por favor, tente mais tarde')
      }
    });
    return false;
  });
});

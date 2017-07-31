$(function() {
    $('.form-avaliacao').on('submit', function() {
        $(this).ajaxSubmit({
            success: function(resposta) {
                new Noty({
                    type: 'success',
                    text: 'Avaliação realizada com sucesso. Agradecemos sua contribuição.',
                    timeout: 3000,
                    modal: true,
                    layout: 'centerRight',
                    callbacks: { onClose: function() { window.location.reload(); } }
                }).show();
            },
            error: function() {
                $('.modal').addClass("animated shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    new Noty({
                        type: 'error',
                        text: 'ERRO - Algum erro acontenceu. Por favor, tente mais tarde.',
                        timeout: 3000,
                        modal: true,
                        layout: 'centerRight'
                    }).show();
                    $('.modal').removeClass("animated shake");
                });
            }
        });
        return false;
    });
});
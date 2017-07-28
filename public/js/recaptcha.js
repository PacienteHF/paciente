var CaptchaCallback = function() {
  grecaptcha.render('RecaptchaField1', {'sitekey' : '6LcZRioUAAAAAFgqz1mtcJ9wSfOqPD2zP0QFf7zj', 'expired-callback': 'disablePresenca', 'callback' : 'enablePresenca'});
  grecaptcha.render('RecaptchaField2', {'sitekey' : '6LeGNSoUAAAAAKW4_-Tak4JKTFHxoAox1WM4W5uD', 'expired-callback': 'disableDemora', 'callback' : 'enableDemora'});
  grecaptcha.render('RecaptchaField3', {'sitekey' : '6LeMNSoUAAAAAKk-g0b3sVLL9SnEHLT3TJEidMnN', 'expired-callback': 'disableEquipamento', 'callback' : 'enableEquipamento'});
  grecaptcha.render('RecaptchaField4', {'sitekey' : '6Lf8QioUAAAAAOTrVZz5DsXuldpdYV7AgsFIwOK6', 'expired-callback': 'disableAtendimento', 'callback' : 'enableAtendimento'});
  grecaptcha.render('RecaptchaField5', {'sitekey' : '6LdUSyoUAAAAAIIbUzlc-y9w00FGL8-El1Zfbd2b', 'expired-callback': 'disableMedicamento', 'callback' : 'enableMedicamento'});
  grecaptcha.render('RecaptchaField6', {'sitekey' : '6LcmRioUAAAAAJM8TnCCWkGduSPelRmRM7JjAUrF', 'expired-callback': 'disableInfraestrutura', 'callback' : 'enableInfraestrutura'});
};

$("#btn-presenca").prop('disabled', true);
function enablePresenca(){
  $("#btn-presenca").prop('disabled', false);
}
function disablePresenca(){
  $("#btn-presenca").prop('disabled', true);
}

$("#btn-demora").prop('disabled', true);
function enableDemora(){
  $("#btn-demora").prop('disabled', false);
}
function disableDemora(){
  $("#btn-demora").prop('disabled', true);
}

$("#btn-equipamento").prop('disabled', true);
function enableEquipamento(){
  $("#btn-equipamento").prop('disabled', false);
}
function disableEquipamento(){
  $("#btn-equipamento").prop('disabled', true);
}

$("#btn-atendimento").prop('disabled', true);
function enableAtendimento(){
  $("#btn-atendimento").prop('disabled', false);
}
function disableAtendimento(){
  $("#btn-atendimento").prop('disabled', true);
}

$("#btn-medicamento").prop('disabled', true);
function enableMedicamento(){
  $("#btn-medicamento").prop('disabled', false);
}
function disableMedicamento(){
  $("#btn-medicamento").prop('disabled', true);
}

$("#btn-infraestrutura").prop('disabled', true);
function enableInfraestrutura(){
  $("#btn-infraestrutura").prop('disabled', false);
}
function disableInfraestrutura(){
  $("#btn-infraestrutura").prop('disabled', true);
}

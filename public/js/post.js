$(function(){
    $('#form-1').on('submit', function(e){
      console.log("evento");
      e.preventDefault();
      $.ajax({
          url: '/submitForm', //this is the submit URL
          type: 'POST', //or POST
          data: { problema : $('#texto-001').val(),
                  classificacao: $('input[name=rating-01]:checked').val()
                }
      });
    });
});

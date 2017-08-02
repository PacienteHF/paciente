$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});

var now = moment;
var now = now().tz('America/Recife').format('YYYY-MM-DD');
$('input[type=date]').val(now);

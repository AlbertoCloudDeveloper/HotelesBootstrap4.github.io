$(function () {
  $("[data-toggle='tooltip']").tooltip();
  $("[data-toggle='popover']").popover();
  $('.carousel').carousel({
    interval: 2000
  })
  $('#contactoModal').on('show.bs.modal', function (e) {
    console.log('El modal contacto se está mostrando');
    $('#contactoBtn').removeClass('btn-outline-success');
    $('#contactoBtn').addClass('btn-primary');
    $('#contactoBtn').prop('disabled', true);

  });
  $('#contactoModal').on('shown.bs.modal', function (e) {
    console.log('El modal contacto se mostró');
  });
  $('#contactoModal').on('hide.bs.modal', function (e) {
    console.log('El modal contacto se oculta');
  });
  $('#contactoModal').on('hidden.bs.modal', function (e) {
    console.log('El modal contacto se ocultó');
    // $('#contactoBtn').prop('disabled', false);
  });

});

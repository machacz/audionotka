$(function(){
  var templates = {};

  var loadPage = function(data) {
    $('#content-wrapper').css({opacity: 0});
    return $.ajax({
      url: '/views/' + data.view + '.hbs',
      type: 'GET',
      success: (templateBody) => {
          template = Handlebars.compile(templateBody);
          rendered = template(data.data);
          $('#content-wrapper').empty().append(rendered);
          $('#content-wrapper').animate({opacity: 1}, 100);
      }
    })
  };

  window.onpopstate = function(event) {
    loadPage(event.state);
  }

  $('body').on('click', '.mainmenu a', function(e) {
    e.preventDefault();

    var url = $(this).attr('href');

    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        "X-Accept-Renderable" : "yes"
      },
      success: function(data) {
        loadPage(data)
        .done(function(){
          window.history.pushState(data, document.title, url);
        });
      }
    })
  });

});

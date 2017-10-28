$(function(){
  $('body').on('click', 'div.mainmenu a', function(e) {
    e.preventDefault();

    var url = $(this).attr('href');

    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        "X-Accept-Renderable" : "yes"
      },
      success: function(data) {
        $.ajax({
          url: '/views/' + data.view + '.hbs',
          type: 'GET',
          success: (templateBody) => {
              template = Handlebars.compile(templateBody);
              rendered = template(data);
              $('div#content-wrapper').empty().append(rendered);
          }
        })
        console.log(data);
      }
    })
  });
});

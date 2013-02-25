
$(document).ready(function(){
  
  $('a[href^="#"]').click(function(e){
    e.preventDefault();
    var anchorName = $(this).attr('href'),
        anchor = $(anchorName);
    if (anchor.length > 0) {
      $(document.body).animate({
        scrollTop: $(anchorName).offset().top
      }, 750, 'easeInOutQuint', function(){
        window.location.hash = anchorName;
      });
    }
  });
  
});


jQuery(document).ready(function($){
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

  // make a JQUERY.JSON call with the provided API URL
  function callPDXWebAPI(x){
    var url = x;
    $.getJSON(url, function(data) {
      //Do Stuff with the returned JSON data
      console.log(data);
      });
    }

  //Call the PDXWeb&Design Meetup Event API 
  callPDXWebAPI('http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=pdxweb&desc=false&offset=0&format=json&page=20&fields=&sig_id=14633664&sig=4ef7562ef1624cb125f51f48616320bff23b6c95');
})();
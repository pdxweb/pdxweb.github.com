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
  // Calculate the Month
  function findMonth (m){
    var month = "";
    switch(m){
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "";
      }
      return month;
    }
    // Calculate the Day
  function findDay (d){
    var day = "";
    switch(d){
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = 'Sunday';
        break;
      default:
        day = "";
      }
      return day;
    }
  function showMap(){
    mapDiv = $('.mapDiv');
  }
  //Take an array of objects and create an HTML object out of them
  function createItem(x, dClass){
    var newDiv = $(document.createElement('div')),
        iName  = x[0],
        iFullDate  = new Date(x[1]),
        iDay   = findDay(iFullDate.getDay()),
        iMonth = findMonth(iFullDate.getMonth()),
        iDate  = iFullDate.getDate(),
        iYear  = iFullDate.getFullYear(),
        iHour  = iFullDate.getHours(),
        iMinutes = iFullDate.getMinutes(),
        iDesc  = x[2],
        iRSVP  = x[3],
        iURL   = x[4],
        iVenue = x[5],
        iAddr  = iVenue.address_1 + '<br>' + iVenue.city + ', ' +iVenue.state,
        iMap   = '<br><a href="https://maps.google.com/maps?q='+ iVenue.address_1 + '+' + iVenue.city + '+' + iVenue.state +'" target="_blank" class="map">Show Map</a>';

    newDiv.addClass(dClass);
    newDiv.html ('<h3>' + iName +'</h3>' +
                '<h4 class="date">' +iDay + ' ' + iMonth + ' ' + iDate + ', ' + iYear+ '</h4>' +
                '<p class="desc">' +iDesc+ '</p>'+
                '<p class="rsvp">' + iRSVP + ' Attending .. <a href="' +iURL+ '" target="_blank">RSVP</a></p>'+
                '<p class="addr">' +iAddr + iMap + '</p>');
    return newDiv;
    }
  // make a JQUERY.JSON call with the provided API URL
  function callPDXWebAPI(x){
    var url = x + "&callback=?";
    $.getJSON(url, function(data) {
      var dResults = data.results,
          containerDiv = $('#events');
      if (dResults !== undefined){
        //Do Stuff with the returned JSON data
        var itemCount = 3;
        if (dResults.length <= 3){
          itemCount = dResults.length;
          }
        for (var i = 0; i <= itemCount; i++) {
          var dResultItem = dResults[i];
          // Check if Results are undefined
          if (dResultItem !== undefined){
            // Create Event Variables
            var eItemObj = [dResultItem.name,
                            dResultItem.time,
                            dResultItem.description,
                            dResultItem.yes_rsvp_count,
                            dResultItem.event_url,
                            dResultItem.venue];
                // Do Something with them
                if (i === 0) {
                  eItem = createItem(eItemObj, 'span12');
                  } else {
                      eItem = createItem(eItemObj, 'span4');
                    }
            containerDiv.append(eItem);
            }
          }
        }
      });
    }

  //Call the PDXWeb&Design Meetup Event API 
  callPDXWebAPI('http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=pdxweb&desc=false&offset=0&format=json&page=20&fields=&sig_id=14633664&sig=4ef7562ef1624cb125f51f48616320bff23b6c95');
});
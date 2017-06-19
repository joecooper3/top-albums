currentYear = 2016
currentPos = 1
Faders = (div, item) ->
  if div is 'selected-year'
   $('#'+div).animate({opacity:0}).queue ->
     $('#'+div).html(item)
     $('#'+div).dequeue()
   $('#'+div).delay(1000).animate({opacity:1})
  else
    if div is 'album-art'
      item = '<img src="images/' + item + '.jpg">'
   $('#'+div).animate({opacity:0}).queue ->
     $('#'+div).html(item)
     $('#'+div).dequeue()
   $('#'+div).delay(300).animate({opacity:1})
$.ajax
   url: "data.json"
   dataType: "json"
   error: (jqXHR, textStatus, errorThrown) ->
     $('body').append "AJAX Error: #{textStatus}"
   success: (data, textStatus, jqXHR) ->

     Searcher = (year, pos) ->
       for thing, i in data.info
         if data.info[i].year is year
           if data.info[i].rank is pos
             #Faders('rank-number',data.info[i].rank)
             Faders('selected-year',data.info[i].year)
             #Faders('album-art',data.info[i].image)
             imagepath = '<img src="images/' + data.info[i].image + '.jpg">'
             $('#album-art').animate({opacity: 0})
             $('#album-art').html imagepath
             $('#album-art').animate({opacity: 1})
             $('#name-and-artist').html data.info[i].artist + ' &ndash; ' + data.info[i].album

     $('#positions').find('li').click ->
       dataID = $(this).attr("data-id")
       currentPos = parseInt(dataID, 10)
       Searcher(currentYear,currentPos)
       $('#positions').find('li').removeClass('active')
       $(this).addClass('active')

      $('#years').find('li').click ->
        dataID = $(this).attr("data-id")
        currentYear = parseInt(dataID, 10)
        Searcher(currentYear,currentPos)
        $('#years').find('li').removeClass('active')
        $(this).addClass('active')

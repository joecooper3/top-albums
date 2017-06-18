currentYear = 2016
currentPos = 1
$.ajax
   url: "data.json"
   dataType: "json"
   error: (jqXHR, textStatus, errorThrown) ->
     $('body').append "AJAX Error: #{textStatus}"
   success: (data, textStatus, jqXHR) ->
     console.log "Successful AJAX call: #{data}"
     Searcher = (year, pos) ->
       for thing, i in data.info
         if data.info[i].year is year
           if data.info[i].rank is pos
             $('#rank-number').html '#'+data.info[i].rank
             $('#selected-year').html data.info[i].year
             imagepath = '<img src="images/' + data.info[i].image + '.jpg">'
             $('#album-art').html imagepath
             $('#name-and-artist').html data.info[i].artist + ' &ndash; ' + data.info[i].album
     $('#positions').find('li').click ->
       dataID = $(this).attr("data-id")
       currentPos = parseInt(dataID, 10)
       Searcher(currentYear,currentPos)
      $('#years').find('li').click ->
        dataID = $(this).attr("data-id")
        currentYear = parseInt(dataID, 10)
        Searcher(currentYear,currentPos)

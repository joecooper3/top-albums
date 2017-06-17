$.ajax
   url: "data.json"
   dataType: "json"
   error: (jqXHR, textStatus, errorThrown) ->
     $('body').append "AJAX Error: #{textStatus}"
   success: (data, textStatus, jqXHR) ->
     console.log "Successful AJAX call: #{data}"
     $('body').append data.info[4].album
     $('#2016').click ->
       imagepath = '<img src="images/' + data.info[0].image + '.jpg">'
       $('#album-art').html imagepath
       $('#name-and-artist').html data.info[0].artist + ' &ndash; ' + data.info[0].album
       $('#2015').click ->
         imagepath = '<img src="images/' + data.info[3].image + '.jpg">'
         $('#album-art').html imagepath
         $('#name-and-artist').html data.info[3].artist + ' &ndash; ' + data.info[3].album
     for thing, i in data.info

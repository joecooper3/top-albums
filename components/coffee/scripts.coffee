chosenYear = 2016
currentYear = 2016
chosenPos = 1
currentPos = 1

Faders = (div, item) ->
  if div is 'selected-year'
    if chosenYear != currentYear
      $('#'+div).animate({opacity:0}).queue ->
        $('#'+div).html(item)
        $('#'+div).dequeue()
      $('#'+div).delay(1000).animate({opacity:1})
  else
    if div is 'album-art'
      item = '<img src="images/' + item + '.jpg">'
    if div is 'spotify'
      if (item?)
        item = '<a href="' + item + '">Listen on Spotify</a>'
      else
        item = ''
    if div is 'soundcloud'
      if (item?)
       item = '<a href="' + item + '" target="_blank">Listen on Soundcloud</a>'
      else
       item = ''
    if div is 'bandcamp'
      if (item?)
       item = '<a href="' + item + '" target="_blank">Listen on Bandcamp</a>'
      else
       item = ''
    if div is 'youtube'
      if (item?)
       item = '<a href="' + item + '" target="_blank">Listen on YouTube</a>'
      else
       item = ''
    $('#'+div).animate({opacity:0},200).queue ->
      $('#'+div).html(item)
      $('#'+div).dequeue()
    $('#'+div).delay(150).animate({opacity:1})

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
            Faders('selected-year',data.info[i].year)
            Faders('rank-number',data.info[i].rank)
            Faders('album-art',data.info[i].image)
            Faders('name-and-artist',data.info[i].artist + ' &ndash; ' + data.info[i].album)
            Faders('genres',data.info[i].genres)
            Faders('spotify',data.info[i].spotify)
            Faders('soundcloud',data.info[i].soundcloud)
            Faders('bandcamp',data.info[i].bandcamp)
            Faders('youtube',data.info[i].youtube)

    $('#positions').find('li').click ->
      dataID = $(this).attr("data-id")
      chosenPos = parseInt(dataID, 10)
      Searcher(currentYear,chosenPos)
      currentPos = chosenPos
      $('#positions').find('li').removeClass('active')
      $(this).addClass('active')

    $('#years').find('li').click ->
      dataID = $(this).attr("data-id")
      chosenYear = parseInt(dataID, 10)
      if chosenYear != currentYear
        Searcher(chosenYear,currentPos)
        currentYear = chosenYear
        $('#years').find('li').removeClass('active')
        $(this).addClass('active')

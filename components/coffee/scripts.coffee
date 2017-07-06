chosenYear = 1
currentYear = 1
chosenPos = 1
currentPos = 1
fadeOutcomplete = false
showAll = false

Faders = (div, item) ->
  if div is 'selected-year'
    if chosenYear != currentYear
      $('#'+div).animate({opacity:0},400).queue ->
        $('#'+div).html(item)
        $('#'+div).delay(1000).animate({opacity:1})
        $('#'+div).dequeue()
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
    if div is 'datpiff'
      if (item?)
       item = '<a href="' + item + '" target="_blank">Listen on DatPiff</a>'
      else
       item = ''
    $('#'+div).animate({opacity:0},200).queue ->
      $('#'+div).html(item)
      $('#'+div).dequeue()
      $('#'+div).delay(150).animate({opacity:1})

resetToOne = ->
  chosenPos = currentPos = 1
  $('#positions').find('li').removeClass('active')
  $('#first-pos').addClass('active')

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
            Faders('datpiff',data.info[i].datpiff)

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
      if currentYear = 1
        $('#positions').find('ul').removeClass('asleep')
      if chosenYear != currentYear
        Searcher(chosenYear,1)
        currentYear = chosenYear
        $('#years').find('li').removeClass('active')
        $(this).addClass('active')
        resetToOne()

    document.onkeydown = (e) ->
      #up key
      if e.keyCode is 38 && currentPos > 1
        $('#positions').find('li').removeClass('active')
        currentPos--
        $('#positions').find('li:nth-child('+currentPos+')').addClass('active')
        Searcher(currentYear,currentPos)
      #down key
      if e.keyCode is 40 && currentPos < 10
        $('#positions').find('li').removeClass('active')
        currentPos++
        $('#positions').find('li:nth-child('+currentPos+')').addClass('active')
        Searcher(currentYear,currentPos)
      #left key
      if e.keyCode is 37 && currentYear < 2016
         $('#years').find('li').removeClass('active')
         currentYear++
         $('#years').find('[data-id="'+currentYear+'"]').addClass('active')
         resetToOne()
         Searcher(currentYear,1)
         chosenYear++
       #right key
       if e.keyCode is 39 && currentYear > 2011
          $('#years').find('li').removeClass('active')
          currentYear--
          $('#years').find('[data-id="'+currentYear+'"]').addClass('active')
          resetToOne()
          Searcher(currentYear,1)
          chosenYear--

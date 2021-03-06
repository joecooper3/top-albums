chosenYear = 1
currentYear = 1
chosenPos = 1
currentPos = 1
fadeOutcomplete = false
showAll = false

Faders = (div, item) ->
  if div is 'selected-year'
    if chosenYear != currentYear
      $('#'+div).animate({opacity:0},300).queue ->
        $('#'+div).delay(200).html(item)
        $('#'+div).delay(1000).animate({opacity:1})
        $('#'+div).dequeue()
  else
    if div is 'album-art'
      item = '<img src="images/' + item + '.jpg" srcset="images/' + item + '.jpg 1x, images/' + item + '@2x.jpg 2x">'
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
    $div = $('#'+div)
    customFade($div, item)

customFade = (target, content) ->
  target.animate({opacity:0},200).queue ->
    target.html(content)
    target.dequeue()
    target.delay(150).animate({opacity:1})

resetToOne = (status) ->
  chosenPos = currentPos = 1
  if showAll is false
    $('#positions').find('li').removeClass('active')
    $('#first-pos').addClass('active')

hideMost = ->
  $('#rank-number, #name-and-artist, #album-art, #genres, #player-container').fadeOut()

showMost = ->
  $('#rank-number, #name-and-artist, #album-art, #genres, #player-container').fadeIn()
  $('#show-all-container').fadeOut().remove()
  $('#show-all, .blue-line').removeClass('active')


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

    GridDisplay = (year) ->
      if showAll is false
        $showAllContainer = $('<div>', {id: 'show-all-container'})
        $($showAllContainer).hide().prependTo('#main-content').fadeIn()
      else
        $showAllContainer = $('#show-all-container')
      content = ''
      for thing, i in data.info
        if data.info[i].year is year
          content += '<div class="item">
            <div class="image-container">
            <img src="images/thumbs/' + data.info[i].image + '.jpg"
            srcset="images/thumbs/' + data.info[i].image + '.jpg 1x,
            images/' + data.info[i].image + '.jpg 2x">
            <div class="meta-hover" data-id="' + data.info[i].rank + '">
            <div class="text">' + data.info[i].rank + '</div>
            </div>
            </div>
            <div class="meta">' + data.info[i].artist + ' - ' + data.info[i].album + '</div>
          </div>'
      if showAll is true
        customFade($showAllContainer, content)
      else
        $showAllContainer.html(content)

    $('#positions').find('li:not(#show-all)').click ->
      dataID = $(this).attr("data-id")
      chosenPos = parseInt(dataID, 10)
      Searcher(currentYear,chosenPos)
      currentPos = chosenPos
      $('#positions').find('li').removeClass('active')
      $(this).addClass('active')
      if showAll is true
        showMost()
        showAll = false

    $('#years').find('li').click ->
      dataID = $(this).attr("data-id")
      chosenYear = parseInt(dataID, 10)
      if currentYear is 1
        $('#positions').find('ul').removeClass('asleep')
        $('#selected-year').removeClass('asleep')
        $ranknumber = $('<div>', {id: 'rank-number'}).delay(400).queue ->
          $($ranknumber).hide().text('1').prependTo('#main-content').fadeIn()
          $(this).dequeue()
      if chosenYear != currentYear
        if showAll is false
          Searcher(chosenYear,1)
        if showAll is true
          GridDisplay(chosenYear)
          Faders('selected-year',chosenYear)
        currentYear = chosenYear
        $('#years').find('li').removeClass('active')
        $(this).addClass('active')
        resetToOne()

    $('#show-all').click ->
      if showAll is false
        GridDisplay(chosenYear)
        showAll = true
        $('#positions').find('li').removeClass('active')
        $('#show-all').addClass('active').delay(400).queue ->
          $('.blue-line').addClass('active')
          $(this).dequeue()
         hideMost()
      else if showAll is true
        showAll = false
        showMost()
        Searcher(currentYear, currentPos)

    $('#main-content').on 'click', '.image-container', ->
      dataID = $(this).find('.meta-hover').attr("data-id")
      chosenPos = parseInt(dataID, 10)
      Searcher(currentYear,chosenPos)
      currentPos = chosenPos
      $('#positions').find('li').removeClass('active')
      $('#positions').find('[data-id="' + chosenPos + '"]').addClass('active')
      showMost()
      showAll = false


    document.onkeydown = (e) ->
      #up key
      if e.keyCode is 38 && currentPos > 1 && showAll is false
        $('#positions').find('li').removeClass('active')
        currentPos--
        $('#positions').find('li:nth-child('+currentPos+')').addClass('active')
        Searcher(currentYear,currentPos)
      #down key
      if e.keyCode is 40 && currentPos < 10 && showAll is false
        $('#positions').find('li').removeClass('active')
        currentPos++
        $('#positions').find('li:nth-child('+currentPos+')').addClass('active')
        Searcher(currentYear,currentPos)
      #left key
      if e.keyCode is 37 && currentYear < 2016
         $('#years').find('li').removeClass('active')
         currentYear++
         $('#years').find('[data-id="'+currentYear+'"]').addClass('active')
         if showAll is true
           GridDisplay(currentYear)
           Faders('selected-year',currentYear)
          if showAll is false
           resetToOne()
           Searcher(currentYear,1)
         chosenYear++
       #right key
       if e.keyCode is 39 && currentYear > 2010
          $('#years').find('li').removeClass('active')
          currentYear--
          $('#years').find('[data-id="'+currentYear+'"]').addClass('active')
          if showAll is true
            GridDisplay(currentYear)
            Faders('selected-year',currentYear)
          if showAll is false
            resetToOne()
            Searcher(currentYear,1)
          chosenYear--

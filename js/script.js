var Faders, chosenPos, chosenYear, currentPos, currentYear, customFade, fadeOutcomplete, hideMost, resetToOne, showAll, showMost;

chosenYear = 1;

currentYear = 1;

chosenPos = 1;

currentPos = 1;

fadeOutcomplete = false;

showAll = false;

Faders = function(div, item) {
  var $div;
  if (div === 'selected-year') {
    if (chosenYear !== currentYear) {
      return $('#' + div).animate({
        opacity: 0
      }, 400).queue(function() {
        $('#' + div).html(item);
        $('#' + div).delay(1000).animate({
          opacity: 1
        });
        return $('#' + div).dequeue();
      });
    }
  } else {
    if (div === 'album-art') {
      item = '<img src="images/' + item + '.jpg" srcset="images/' + item + '.jpg 1x, images/' + item + '@2x.jpg 2x">';
    }
    if (div === 'spotify') {
      if ((item != null)) {
        item = '<a href="' + item + '">Listen on Spotify</a>';
      } else {
        item = '';
      }
    }
    if (div === 'soundcloud') {
      if ((item != null)) {
        item = '<a href="' + item + '" target="_blank">Listen on Soundcloud</a>';
      } else {
        item = '';
      }
    }
    if (div === 'bandcamp') {
      if ((item != null)) {
        item = '<a href="' + item + '" target="_blank">Listen on Bandcamp</a>';
      } else {
        item = '';
      }
    }
    if (div === 'youtube') {
      if ((item != null)) {
        item = '<a href="' + item + '" target="_blank">Listen on YouTube</a>';
      } else {
        item = '';
      }
    }
    if (div === 'datpiff') {
      if ((item != null)) {
        item = '<a href="' + item + '" target="_blank">Listen on DatPiff</a>';
      } else {
        item = '';
      }
    }
    $div = $('#' + div);
    return customFade($div, item);
  }
};

customFade = function(target, content) {
  return target.animate({
    opacity: 0
  }, 200).queue(function() {
    target.html(content);
    target.dequeue();
    return target.delay(150).animate({
      opacity: 1
    });
  });
};

resetToOne = function(status) {
  chosenPos = currentPos = 1;
  if (showAll === false) {
    $('#positions').find('li').removeClass('active');
    return $('#first-pos').addClass('active');
  }
};

hideMost = function() {
  return $('#rank-number, #name-and-artist, #album-art, #genres, #player-container').fadeOut();
};

showMost = function() {
  $('#rank-number, #name-and-artist, #album-art, #genres, #player-container').fadeIn();
  $('#show-all-container').fadeOut().remove();
  return $('#show-all, .blue-line').removeClass('active');
};

$.ajax({
  url: "data.json",
  dataType: "json",
  error: function(jqXHR, textStatus, errorThrown) {
    return $('body').append("AJAX Error: " + textStatus);
  },
  success: function(data, textStatus, jqXHR) {
    var GridDisplay, Searcher;
    Searcher = function(year, pos) {
      var i, j, len, ref, results, thing;
      console.log('SEARCHER ' + year + ' ' + pos);
      ref = data.info;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        thing = ref[i];
        if (data.info[i].year === year) {
          if (data.info[i].rank === pos) {
            Faders('selected-year', data.info[i].year);
            Faders('rank-number', data.info[i].rank);
            Faders('album-art', data.info[i].image);
            Faders('name-and-artist', data.info[i].artist + ' &ndash; ' + data.info[i].album);
            Faders('genres', data.info[i].genres);
            Faders('spotify', data.info[i].spotify);
            Faders('soundcloud', data.info[i].soundcloud);
            Faders('bandcamp', data.info[i].bandcamp);
            Faders('youtube', data.info[i].youtube);
            results.push(Faders('datpiff', data.info[i].datpiff));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    GridDisplay = function(year) {
      var $showAllContainer, content, i, j, len, ref, thing;
      if (showAll === false) {
        $showAllContainer = $('<div>', {
          id: 'show-all-container'
        });
        $($showAllContainer).hide().prependTo('#main-content').fadeIn();
      } else {
        $showAllContainer = $('#show-all-container');
      }
      content = '';
      ref = data.info;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        thing = ref[i];
        if (data.info[i].year === year) {
          content += '<div class="item"> <div class="image-container"> <img src="images/thumbs/' + data.info[i].image + '.jpg" srcset="images/thumbs/' + data.info[i].image + '.jpg 1x, images/' + data.info[i].image + '.jpg 2x"> <div class="meta-hover" data-id="' + data.info[i].rank + '"> <div class="text">' + data.info[i].rank + '</div> </div> </div> <div class="meta">' + data.info[i].artist + ' - ' + data.info[i].album + '</div> </div>';
        }
      }
      if (showAll === true) {
        console.log($showAllContainer);
        return customFade($showAllContainer, content);
      } else {
        return $showAllContainer.html(content);
      }
    };
    $('#positions').find('li:not(#show-all)').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      chosenPos = parseInt(dataID, 10);
      Searcher(currentYear, chosenPos);
      currentPos = chosenPos;
      $('#positions').find('li').removeClass('active');
      $(this).addClass('active');
      if (showAll === true) {
        showMost();
        return showAll = false;
      }
    });
    $('#years').find('li').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      chosenYear = parseInt(dataID, 10);
      if (currentYear = 1) {
        $('#positions').find('ul').removeClass('asleep');
      }
      if (chosenYear !== currentYear) {
        if (showAll === false) {
          Searcher(chosenYear, 1);
        }
        if (showAll === true) {
          GridDisplay(chosenYear);
          Faders('selected-year', chosenYear);
        }
        currentYear = chosenYear;
        $('#years').find('li').removeClass('active');
        $(this).addClass('active');
        return resetToOne();
      }
    });
    $('#show-all').click(function() {
      if (showAll === false) {
        GridDisplay(chosenYear);
        showAll = true;
        $('#positions').find('li').removeClass('active');
        $('#show-all').addClass('active').delay(400).queue(function() {
          $('.blue-line').addClass('active');
          return $(this).dequeue();
        });
        return hideMost();
      } else if (showAll === true) {
        showAll = false;
        showMost();
        return Searcher(currentYear, currentPos);
      }
    });
    $('#main-content').on('click', '.image-container', function() {
      var dataID;
      dataID = $(this).find('.meta-hover').attr("data-id");
      chosenPos = parseInt(dataID, 10);
      Searcher(currentYear, chosenPos);
      currentPos = chosenPos;
      $('#positions').find('li').removeClass('active');
      $('#positions').find('[data-id="' + chosenPos + '"]').addClass('active');
      showMost();
      return showAll = false;
    });
    return document.onkeydown = function(e) {
      if (e.keyCode === 38 && currentPos > 1 && showAll === false) {
        $('#positions').find('li').removeClass('active');
        currentPos--;
        $('#positions').find('li:nth-child(' + currentPos + ')').addClass('active');
        Searcher(currentYear, currentPos);
      }
      if (e.keyCode === 40 && currentPos < 10 && showAll === false) {
        $('#positions').find('li').removeClass('active');
        currentPos++;
        $('#positions').find('li:nth-child(' + currentPos + ')').addClass('active');
        Searcher(currentYear, currentPos);
      }
      if (e.keyCode === 37 && currentYear < 2017) {
        $('#years').find('li').removeClass('active');
        currentYear++;
        $('#years').find('[data-id="' + currentYear + '"]').addClass('active');
        if (showAll === true) {
          GridDisplay(currentYear);
          Faders('selected-year', currentYear);
        }
        if (showAll === false) {
          resetToOne();
          Searcher(currentYear, 1);
        }
        chosenYear++;
      }
      if (e.keyCode === 39 && currentYear > 2010) {
        $('#years').find('li').removeClass('active');
        currentYear--;
        $('#years').find('[data-id="' + currentYear + '"]').addClass('active');
        if (showAll === true) {
          GridDisplay(currentYear);
          Faders('selected-year', currentYear);
        }
        if (showAll === false) {
          resetToOne();
          Searcher(currentYear, 1);
        }
        return chosenYear--;
      }
    };
  }
});

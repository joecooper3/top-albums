var Faders, chosenPos, chosenYear, currentPos, currentYear, fadeOutcomplete, resetToOne;

chosenYear = 1;

currentYear = 1;

chosenPos = 1;

currentPos = 1;

fadeOutcomplete = false;

Faders = function(div, item) {
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
      item = '<img src="images/' + item + '.jpg">';
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
    return $('#' + div).animate({
      opacity: 0
    }, 200).queue(function() {
      $('#' + div).html(item);
      $('#' + div).dequeue();
      return $('#' + div).delay(150).animate({
        opacity: 1
      });
    });
  }
};

resetToOne = function() {
  chosenPos = currentPos = 1;
  $('#positions').find('li').removeClass('active');
  return $('#first-pos').addClass('active');
};

$.ajax({
  url: "data.json",
  dataType: "json",
  error: function(jqXHR, textStatus, errorThrown) {
    return $('body').append("AJAX Error: " + textStatus);
  },
  success: function(data, textStatus, jqXHR) {
    var Searcher;
    Searcher = function(year, pos) {
      var i, j, len, ref, results, thing;
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
    $('#positions').find('li').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      chosenPos = parseInt(dataID, 10);
      Searcher(currentYear, chosenPos);
      currentPos = chosenPos;
      $('#positions').find('li').removeClass('active');
      return $(this).addClass('active');
    });
    $('#years').find('li').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      chosenYear = parseInt(dataID, 10);
      if (currentYear = 1) {
        $('#positions').find('ul').removeClass('asleep');
      }
      if (chosenYear !== currentYear) {
        Searcher(chosenYear, 1);
        currentYear = chosenYear;
        $('#years').find('li').removeClass('active');
        $(this).addClass('active');
        return resetToOne();
      }
    });
    return document.onkeydown = function(e) {
      if (e.keyCode === 38 && currentPos > 1) {
        $('#positions').find('li').removeClass('active');
        currentPos--;
        $('#positions').find('li:nth-child(' + currentPos + ')').addClass('active');
        Searcher(currentYear, currentPos);
      }
      if (e.keyCode === 40 && currentPos < 10) {
        $('#positions').find('li').removeClass('active');
        currentPos++;
        $('#positions').find('li:nth-child(' + currentPos + ')').addClass('active');
        Searcher(currentYear, currentPos);
      }
      if (e.keyCode === 37 && currentYear < 2016) {
        $('#years').find('li').removeClass('active');
        currentYear++;
        $('#years').find('[data-id="' + currentYear + '"]').addClass('active');
        resetToOne();
        Searcher(currentYear, 1);
        chosenYear++;
      }
      if (e.keyCode === 39 && currentYear > 2011) {
        $('#years').find('li').removeClass('active');
        currentYear--;
        $('#years').find('[data-id="' + currentYear + '"]').addClass('active');
        resetToOne();
        Searcher(currentYear, 1);
        return chosenYear--;
      }
    };
  }
});

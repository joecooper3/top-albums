var Faders, chosenPos, chosenYear, currentPos, currentYear;

chosenYear = 2016;

currentYear = 2016;

chosenPos = 1;

currentPos = 1;

Faders = function(div, item) {
  if (div === 'selected-year') {
    if (chosenYear !== currentYear) {
      $('#' + div).animate({
        opacity: 0
      }).queue(function() {
        $('#' + div).html(item);
        return $('#' + div).dequeue();
      });
      return $('#' + div).delay(1000).animate({
        opacity: 1
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
    $('#' + div).animate({
      opacity: 0
    }, 200).queue(function() {
      $('#' + div).html(item);
      return $('#' + div).dequeue();
    });
    return $('#' + div).delay(150).animate({
      opacity: 1
    });
  }
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
    return $('#years').find('li').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      chosenYear = parseInt(dataID, 10);
      if (chosenYear !== currentYear) {
        chosenPos = currentPos = 1;
        Searcher(chosenYear, 1);
        currentYear = chosenYear;
        $('#years').find('li').removeClass('active');
        $(this).addClass('active');
        $('#positions').find('li').removeClass('active');
        return $('#first-pos').addClass('active');
      }
    });
  }
});

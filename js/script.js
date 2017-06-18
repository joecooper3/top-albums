

function two(){return "chino amobi"};

var currentPos, currentYear;

currentYear = 2016;

currentPos = 1;

$.ajax({
  url: "data.json",
  dataType: "json",
  error: function(jqXHR, textStatus, errorThrown) {
    return $('body').append("AJAX Error: " + textStatus);
  },
  success: function(data, textStatus, jqXHR) {
    var Searcher;
    Searcher = function(year, pos) {
      var i, imagepath, j, len, ref, results, thing;
      ref = data.info;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        thing = ref[i];
        if (data.info[i].year === year) {
          if (data.info[i].rank === pos) {
            $('#rank-number').html('#' + data.info[i].rank);
            $('#selected-year').html(data.info[i].year);
            imagepath = '<img src="images/' + data.info[i].image + '.jpg">';
            $('#album-art').html(imagepath);
            results.push($('#name-and-artist').html(data.info[i].artist + ' &ndash; ' + data.info[i].album));
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
      currentPos = parseInt(dataID, 10);
      Searcher(currentYear, currentPos);
      $('#positions').find('li').removeClass('active');
      return $(this).addClass('active');
    });
    return $('#years').find('li').click(function() {
      var dataID;
      dataID = $(this).attr("data-id");
      currentYear = parseInt(dataID, 10);
      Searcher(currentYear, currentPos);
      $('#years').find('li').removeClass('active');
      return $(this).addClass('active');
    });
  }
});

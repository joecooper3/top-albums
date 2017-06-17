

function two(){return "chino amobi"};

$.ajax({
  url: "data.json",
  dataType: "json",
  error: function(jqXHR, textStatus, errorThrown) {
    return $('body').append("AJAX Error: " + textStatus);
  },
  success: function(data, textStatus, jqXHR) {
    var i, j, len, ref, results, thing;
    console.log("Successful AJAX call: " + data);
    $('body').append(data.info[4].album);
    ref = data.info;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      thing = ref[i];
      $('#2016').click(function() {
        var imagepath;
        imagepath = '<img src="images/' + data.info[0].image + '.jpg">';
        $('#album-art').html(imagepath);
        return $('#name-and-artist').html(data.info[0].artist + ' &ndash; ' + data.info[0].album);
      });
      results.push($('#2015').click(function() {
        var imagepath;
        imagepath = '<img src="images/' + data.info[3].image + '.jpg">';
        $('#album-art').html(imagepath);
        return $('#name-and-artist').html(data.info[3].artist + ' &ndash; ' + data.info[3].album);
      }));
    }
    return results;
  }
});

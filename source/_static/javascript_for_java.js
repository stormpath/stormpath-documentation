$(document).ready(function () {
  $.ajax({
    url: 'https://search.maven.org/solrsearch/select',
    data: { q: 'stormpath-sdk-root', wt: 'json' },
    dataType: 'jsonp',
    jsonp: 'json.wrf',
    success: function (json) {
      var version = json.response.docs[0].latestVersion;
      $("pre:contains('###latest_stormpath_version###')").html(
        function (index, text) { return text.replace(/###latest_stormpath_version###/g, version); }
      )
    }
  });
});

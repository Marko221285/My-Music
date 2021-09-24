$(document).ready(function() {
  
    var key = "AIzaSyB_JLw3mSiqOjVrpPXvPeHwKCwxlmyHgko";
    var playlistId = "PL6eZos88XvJ9rHEGzMR9cP6cVPnbB-sN8";
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
    
    var options = {
      part: 'snippet',
      key: key,
      maxResults: 20,
      playlistId: playlistId
    }
    
    loadVids();
    
    function loadVids() {
      $.getJSON(URL, options, function(data) {
        console.log(data);
        var id = data.items[0].snippet.resourceId.videoId;
        mainVid(id);
        resultsLoop(data);
      })
    }
    
    function mainVid(id) {
      $('#video').html(`
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" 
      title="YouTube video player" frameborder="0" 
      allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `);
    }
    
    function resultsLoop(data) {
      
      $.each(data.items, function(i, item) {
        
        var thumb = item.snippet.thumbnails.default.url;
        var title = item.snippet.title;
        var desc = item.snippet.description.substring(0, 100);
        var vid = item.snippet.resourceId.videoId;
        
        $('main').append(`
          <article class="item" data-key="${vid}">
            <img src="${thumb}" alt="vid-poster" class="thumb">
            <div class="details">
              <h4>${title}</h4>
              <p>${desc}</p>
            </div>
          </article>
        `);
        
      });
         
    }
    
    $('main').on('click', 'article', function() {
          var id = $(this).attr('data-key');
          mainVid(id);
    });
    
})
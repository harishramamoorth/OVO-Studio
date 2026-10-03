const https = require('https');

function getPexelsVideoSrc(videoId, callback) {
  const options = {
    hostname: 'www.pexels.com',
    path: `/video/${videoId}/`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/videos\.pexels\.com\/video-files\/[^\s"']+\.mp4/g);
      if (match) {
        console.log(`Pexels ${videoId} MP4 URLs:`, [...new Set(match)]);
      } else {
        console.log(`No match for ${videoId}`);
      }
    });
  }).on('error', err => console.error(err));
}

getPexelsVideoSrc('9510022');
getPexelsVideoSrc('9510025');
getPexelsVideoSrc('9510023');
getPexelsVideoSrc('12433207');

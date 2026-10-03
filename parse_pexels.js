const https = require('https');

function parsePexelsPage(videoId) {
  const options = {
    hostname: 'www.pexels.com',
    path: `/video/${videoId}/`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      // search for video file links
      const links = data.match(/https?:\/\/[^"'\s]+\.mp4[^"'\s]*/gi);
      console.log(`Video ${videoId} matches:`, links ? links.slice(0, 3) : 'None');
    });
  }).on('error', err => console.error(err));
}

parsePexelsPage('9510022');
parsePexelsPage('9510025');
parsePexelsPage('9510023');
parsePexelsPage('12433207');

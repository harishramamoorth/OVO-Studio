const https = require('https');

const videoUrls = [
  'https://videos.pexels.com/video-files/9510022/9510022-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/9510025/9510025-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/9510023/9510023-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/12433207/12433207-hd_1080_1920_25fps.mp4'
];

videoUrls.forEach(url => {
  https.request(url, { method: 'HEAD' }, res => {
    console.log(url, '--> STATUS:', res.statusCode);
  }).on('error', err => console.error(url, err.message)).end();
});

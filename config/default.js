const path = require('path')

exports.youTube = {
  apiKey: 'YOUTUBE_API_KEY',
}

exports.demo = {
  secretKey: 'DEMO_SECRET_KEY',
  channels: [
    'UCzoVCacndDCfGDf41P-z0iA', // JSConf
    'UC_x5XG1OV2P6uZZ5FSM9Ttw', // Google Developers
    'UCyU5wkjgQYGRB0hIHMwm2Sg', // LevelUpTuts
  ],
  dataPath: path.join(__dirname, '../tmp/demo-data.json'),
}

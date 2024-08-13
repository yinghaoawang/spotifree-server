var express = require('express');
var { decode } = require('html-entities');
const { getSpotToken, setSpotToken } = require('../utils/spot');
var router = express.Router();

// destructively decodes ascii, i.e: &#39; to '
const decodeObjectProperties = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      decodeObjectProperties(obj[key]);
    }
  }

  return obj;
};

// router.get('/artist/:query', async function (req, res, next) {
//   const query = req.params.query;
//   if (query.trim() == '') {
//     return res.json({ error: 'Enter a search query' });
//   }

//   const data = { lol: 'lol' };

//   res.json({
//     message: 'respond with a resource',
//     data: decodeObjectProperties(data)
//   });
// });

router.get('/track/:query', async function (req, res, next) {
  const query = req.params.query;
  if (query.trim() == '') {
    return res.json({ error: 'Enter a search query' });
  }

  let spotRes = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&offset=0&limit=20`,
    {
      headers: {
        Authorization: 'Bearer ' + getSpotToken()
      }
    }
  );

  if (spotRes && spotRes.status === 401) {
    console.log('invalid or expired token, attempting to fetch another one');
    const tokenRes = await fetch(`https://accounts.spotify.com/api/token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SPOT_CLIENT_ID,
        client_secret: process.env.SPOT_CLIENT_SECRET
      })
    });

    const tokenJson = await tokenRes.json();

    if (tokenRes.status !== 200) {
      return res.status(500).json({
        message: 'unable to generate token for spotify api'
      });
    }

    setSpotToken(tokenJson.access_token);

    spotRes = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&offset=0&limit=20`,
      {
        headers: {
          Authorization: 'Bearer ' + getSpotToken()
        }
      }
    );
  }

  const spotJson = await spotRes.json();

  res.json({
    message: 'respond with a resource',
    data: decodeObjectProperties(spotJson)
  });
});

router.get('/raw/:query', async function (req, res, next) {
  const query = req.params.query;
  if (query.trim() == '') {
    return res.json({ error: 'Enter a search query' });
  }

  const searchQuery = query + ' audio';
  const searchOptions = `type=video&part=snippet&videoCategoryId=10&order=relevance&maxResults=20`;
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&q=${searchQuery}&${searchOptions}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  ).then((d) => d.json());

  console.log(decodeObjectProperties(data));

  res.json({
    message: 'respond with a resource',
    data: decodeObjectProperties(data)
  });
});

module.exports = router;

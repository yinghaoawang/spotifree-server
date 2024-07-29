var express = require('express');
var { decode } = require('html-entities');
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

router.get('/:query', async function (req, res, next) {
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

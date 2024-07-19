var express = require('express');
var router = express.Router();

/* GET users listing. */
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

  res.json({ message: 'respond with a resource', data });
});

module.exports = router;

const express = require("express");
const https = require("https");
const axios = require("axios");
const logger = require("morgan");
const router = express.Router();
const config = require("dotenv").config();

router.get("/:jikanQuery", async (req, res) => {
  try {
    const baseUrlJikan = "https://api.jikan.moe/v3";
    const baseUrlYoutube = "https://www.googleapis.com/youtube/v3";
    const baseUrlTwitter = "https://api.twitter.com/2";
    const apiKey = "AIzaSyD-qr8p2k-5cS-eAC0LP-5IYq52RIYGAuM";
    const TOKEN = process.env.TWITTER_BEARER_TOKEN;
    const jikanSearchUrl = `${baseUrlJikan}/search/anime?q=${req.params.jikanQuery}&order_by=title&sort=ascending&limit=3`;
    const response = await axios.get(jikanSearchUrl).catch(function (err) {
      console.log("error fetching searching animes", err);
    });

    const animeIds = response.data.results.map((result) => result.mal_id);
    const animeId = animeIds[0];
    const jikanRecommendationsUrl = `${baseUrlJikan}/anime/${animeId}/recommendations`;

    const rspJikan = await axios
      .get(jikanRecommendationsUrl)
      .catch(function (err) {
        console.log("error fetching available anime recommendations", err);
      });

    let allData = [];

    const animeList = rspJikan.data.recommendations.map(
      (recommendation) => recommendation.title
    );
    animeList.splice(2);

    await Promise.all(
      animeList.map(async (animeTitle) => {
        let newAnime = { animeTitle, youtube: {}, twitter: {} };
        const youtubeUrl = `${baseUrlYoutube}/search?key=${apiKey}&type=video&part=snippet&q=${animeTitle}`;
        await axios
          .get(youtubeUrl)
          .then(function (rsp) {
            rsp.data.items.length = 1;
            newAnime.youtube = rsp.data.items;
          })
          .catch(function (err) {
            console.log("error fetching available recommendations", err);
          });

        twitterQuery = animeTitle.replace(/ /g, "%20");
        const twitterUrl = `${baseUrlTwitter}/tweets/search/recent?query=${twitterQuery}&max_results=10`;

        await axios
          .get(twitterUrl, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          .then(function (rsp) {
            newAnime.twitter = rsp.data;
          })
          .catch(function (err) {
            console.log("error fetching available tweets", err);
          });

        allData.push(newAnime);
      })
    );

    res.send({
      data: allData,
    });
  } catch (err) {
    console.log("error fetching the page", err);
  }
});

module.exports = router;

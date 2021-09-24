import React from "react";
import TwitterCards from "./TwitterCards";

function AnimeDetails({ anime }) {
  let youtubeUrl =
    "https://www.youtube.com/embed/" + anime.youtube[0].id.videoId;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={youtubeUrl}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>

      <h3>{anime.animeTitle}</h3>

      <article className="card-body">
        <TwitterCards twitter={anime.twitter.data} />
      </article>
    </div>
  );
}

export default AnimeDetails;

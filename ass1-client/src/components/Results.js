import React from "react";
import AnimeDetails from "./AnimeDetails";

export default function Results(props) {
  return (
    <main>
      <div className="main-head">
        <form className="search-box" onSubmit={props.handleSearch}>
          <input
            type="search"
            placeholder="Search for an anime..."
            required
            value={props.search}
            onChange={(event) => props.setSearch(event.target.value)}
          />
        </form>
      </div>
      <div className="anime-list">
        {props.state.map((anime) => (
          <AnimeDetails anime={anime} key={anime.title} />
        ))}
      </div>
    </main>
  );
}

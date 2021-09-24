import React from "react";
import { Card } from "semantic-ui-react";

function TwitterCards({ twitter }) {
  const tweets = twitter.map((item) => ({
    description: item.text,
    meta: "Tweets by" + item.id,
  }));

  return <Card.Group centered fluid items={tweets} />;
}

export default TwitterCards;

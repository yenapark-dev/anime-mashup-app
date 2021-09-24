import React from "react";
import { Loader } from "semantic-ui-react";

const LoaderComponent = ({ loading }) => {
  if (!loading) return null;
  return (
    <div>
      <Loader active inline="centered">
        Loading
      </Loader>
    </div>
  );
};

export default LoaderComponent;

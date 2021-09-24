import { useState } from "react";
import Header from "./components/Header";
import Results from "./components/Results";
import LoaderComponent from "./components/LoaderComponent";

function App() {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimes = async (query) => {
    setIsLoading(true);
    await fetch(`/search/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "Server connection error");
        setIsLoading(false);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(search);
    fetchAnimes(search);
  };

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Results
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          state={state}
        />
      </div>
      <LoaderComponent loading={isLoading} />
    </div>
  );
}
export default App;

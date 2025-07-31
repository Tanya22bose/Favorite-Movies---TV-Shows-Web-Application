import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";

const Home = () => {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <Tabs items={tabItems} />
    </div>
  );
};

export default Home;

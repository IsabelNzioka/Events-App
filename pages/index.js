// import React from "react";
import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>Hello Next World</h1>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

// import React from "react";
import Link from "next/link";
// import { getFeaturedEvents } from "../dummy-data";

import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      {/* <h1>Featured Events</h1> */}
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default HomePage;

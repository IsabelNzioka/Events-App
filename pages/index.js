// import React from "react";
import Link from "next/link";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

// import { getFeaturedEvents } from "../dummy-data";

import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      {/* <h1>Featured Events</h1> */}
      <NewsletterRegistration />
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
    revalidate: 1800,
  };
}

export default HomePage;

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import { getEventById, getAllEvents } from "../../helpers/api-utils";

import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import LogisticsItem from "../../components/event-detail/logistics-item";
import EventLogistics from "../../components/event-detail/event-logistics";

import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>NO Event Found</p>{" "}
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;

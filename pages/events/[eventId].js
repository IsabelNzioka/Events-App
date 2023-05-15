import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import LogisticsItem from "../../components/event-detail/logistics-item";
import EventLogistics from "../../components/event-detail/event-logistics";

import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

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

export default EventDetailPage;

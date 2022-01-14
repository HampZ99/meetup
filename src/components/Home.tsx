import { Link } from "react-router-dom";
import { Meetup } from "../models/meetups";
import MeetupCard from "./meetup/MeetupCard";
import SearchBox from "./search/SearchBox";
import { useState } from "react";

function Home(props: { meetups: Array<Meetup> }) {
  const meetups = props.meetups;
  const [searchText, setSearchText] = useState("");
  const filteredMeetups = meetups.filter((meetup) =>
    meetup.name.match(new RegExp(searchText, "i"))
  );

  return (
    <>
      <SearchBox searchValue={searchText} setSearchValue={setSearchText} />
      {filteredMeetups.map((meetup) => (
        <Link key={meetup.id} to={`meetup/${meetup.id}`}>
          <MeetupCard
            name={meetup.name}
            description={meetup.description}
            image={meetup.image}
            date={meetup.date}
          />
        </Link>
      ))}
    </>
  );
}
export default Home;

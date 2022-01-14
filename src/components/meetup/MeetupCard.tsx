import moment from "moment";
import "./styler.css";

interface meetups {
  name: string;
  description: string;
  image: string;
  date: Date;
}

function MeetupCard({ name, description, image, date }: meetups) {
  const today = new Date();
  let isActive = false;
  let isVisible = false;
  if (moment(date).isBefore(today)) {
    isActive = true;
    isVisible = true;
  }
  return (
    <div className={isActive ? "datePassed" : "content"}>
      <div data-test="resultMeetup">
        <h2>{name}</h2>
        <img src={image}></img>
        <p>{description}</p>
        <br />
        <p>{date.toString()}</p>
        <p className={isVisible ? "isVisible" : "blank"}>
          The Date For This Event Has Passed
        </p>
      </div>
    </div>
  );
}

export default MeetupCard;

import { useEffect, useState } from "react";
import { Meetup } from "../../models/meetups";
import { Comments } from "../../models/comments";
import MeetupComments from "./MeetupComments";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./styler.css";

function MeetupsDetails(props: {
  meetups: Array<Meetup>;
  addToMeetups: (meetup: Meetup) => any; //should prob not be "any"
}) {
  const { id } = useParams();
  const [image, setImage]: any = useState("No image found.");
  const [meetup, setMeetup] = useState({
    id: 0,
    name: "",
    description: "",
    date: new Date(1111 - 11 - 11),
    image: "",
  });
  const today = new Date();
  const [isActive, setActive] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [myAuthor, setMyAuthor] = useState<string>("");
  const [newComment, setNewComment] = useState<Comments[]>([]);

  useEffect(() => {
    props.meetups.map((item) => {
      if (item.id.toString() === id) {
        const meet = {
          id: item.id,
          name: item.name,
          description: item.description,
          date: item.date,
          image: item.image,
        };
        if (moment(item.date).isBefore(today)) {
          setActive(!isActive);
        }
        if (item.image) {
          setImage(<img src={item.image} alt={item.name} />);
        }
        return setMeetup(meet);
      }
    });
  }, [id]);

  function handleAddToMeetups() {
    return props.addToMeetups(meetup);
  }
  const addComment = (): void => {
    if (comment !== "" || myAuthor !== "") {
      console.log("add comment clicked");
      const myComment = {
        message: comment,
        author: myAuthor,
      };
      setNewComment([...newComment, myComment]);
      setComment("");
      setMyAuthor("");
    }
  };

  return (
    <>
      <div
        data-test="datepassed-div"
        className={isActive ? "datePassed" : "content"}
      >
        <div>
          <h2 data-test="meetup-name">{meetup.name}</h2>
          <section data-test="meetup-image">{image}</section>
          <p data-test="meetup-description">{meetup.description}</p>
          <p data-test="meetup-date">{meetup.date.toString()}</p>
          {isActive && (
            <p data-test="meetup-passed" className="isVisible">
              The Date For This Event Has Passed.
            </p>
          )}
          {!isActive && (
            <div className="buttons">
              <button
                data-test="intresse-btn"
                className="intresseBtn"
                onClick={handleAddToMeetups}
              >
                Intresserad
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="comments">
        <h2>Kommentarer:</h2>
        {newComment.map((comment: Comments, key: number) => {
          return <MeetupComments key={key} comment={comment} />;
        })}
        <br />
        <div className="inputFields">
          <input
            data-test="textfield"
            type="text"
            placeholder="Write your name..."
            value={myAuthor}
            onChange={(e) => setMyAuthor(e.target.value)}
          ></input>
          <input
            data-test="textfield"
            type="text"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
        <button data-test="addCommentBtn" type="submit" onClick={addComment}>
          Add Comment
        </button>
      </div>
    </>
  );
}
export default MeetupsDetails;

//onSubmit={(e) => setComments([...comments, e.target.value])}

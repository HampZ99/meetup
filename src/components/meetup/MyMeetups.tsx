import { Link } from "react-router-dom";

function MyMeetups(props: {
  meetups: object[];
  removeFromMeetups: (index: number) => void;
}) {
  const meetups = props.meetups;

  return (
    <>
      {meetups.length > 0 && (
        <>
          {meetups.map((meetup: any, index: number) => (
            <div className="content" key={meetup.id}>
              <div>
                <h2>{meetup.name}</h2>
                <img src={meetup.image}></img>
                <p>{meetup.description}</p>
                <p>{meetup.date.toString()}</p>
                <div className="buttons">
                  <button
                    data-test="remove-button"
                    className="removeBtn"
                    onClick={() => {
                      props.removeFromMeetups(index);
                    }}
                  >
                    Ta Bort
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {meetups.length === 0 &&
        "Du har inte anmält intresse för några meetups än."}
    </>
  );
}
export default MyMeetups;

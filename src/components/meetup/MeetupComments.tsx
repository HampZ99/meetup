import { Comments } from "../../models/comments";
interface Props {
  comment: Comments;
}

function MeetupComments({ comment }: Props) {
  return (
    <>
      <p>Author: {comment.author}</p>
      <p>Comment: {comment.message}</p>
      <br />
    </>
  );
}

export default MeetupComments;

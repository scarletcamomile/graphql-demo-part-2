import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../gql/queries/getMessages";
import { MessageForm } from "./MessageForm";

const OUTGOING = "message-outgoing";
const INCOMING = "message-incoming";

const Chat = () => {
  const [username, setUsernameValue] = useState("");
  const [isUsernameSet, setUsername] = useState(false);
  const handleUsernameSubmit = (e) => {
    if (username) setUsername(true);
  };
  const { data, loading } = useQuery(GET_MESSAGES);

  if (loading) return "Loading...";

  return isUsernameSet ? (
    <>
      <div className="message-list">
        <button>Add cats</button>
        {data.messages.map((message) => {
          const type = message.author === username ? OUTGOING : INCOMING;
          return (
            <div className={`message ${type}`} key={message.id}>
              {type === INCOMING ? (
                <p className="message-author">{message.author}</p>
              ) : null}
              <p>{message.body}</p>
            </div>
          );
        })}
      </div>
      <MessageForm username={username} />
    </>
  ) : (
    <>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="Enter username"
        onChange={(e) => setUsernameValue(e.target.value)}
      />
      <button type="submit" onClick={handleUsernameSubmit}>
        Done!
      </button>
    </>
  );
};

export { Chat };

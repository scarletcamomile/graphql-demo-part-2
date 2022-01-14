import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../gql/queries/getMessages";
import { MessageForm } from "./MessageForm";
import { MESSAGE_SUB } from '../gql/subscriptions/messageSub';
import { isCatsModeVar } from '../index';

const OUTGOING = "message-outgoing";
const INCOMING = "message-incoming";

const Chat = () => {
  const [username, setUsernameValue] = useState("");
  const [isUsernameSet, setUsername] = useState(false);
  const handleUsernameSubmit = (e) => {
    if (username) setUsername(true);
  };
  const { data, loading, subscribeToMore } = useQuery(GET_MESSAGES);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        const newMessage = subscriptionData?.data?.newMessage;
        const updatedMessageList = Object.assign({}, prev, {
          messages: [...prev.messages, newMessage],
        });
        return updatedMessageList;
      }
    });
  }, [subscribeToMore]);

  const toggleCatsMode = () => {
    const current = isCatsModeVar();
    isCatsModeVar(!current);
  };

  if (loading) return "Loading...";

  return isUsernameSet ? (
    <>
      <div className={isCatsModeVar() ? "message-list message-list--with-cats" : "message-list"}>
        <button onClick={toggleCatsMode}>Add cats</button>
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

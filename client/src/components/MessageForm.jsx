import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../gql/mutations/addMessage";

const MessageForm = ({
  username,
}) => {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE);
  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({ variables: { body: message, author: username } });
    setMessage("");
  };

  return (
    <div>
        <form>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Enter message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Send
          </button>
        </form>
    </div>
  );
};

export { MessageForm };

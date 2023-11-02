import { Button } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChatMessageType } from "../../api/chatAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  endMessagesListening,
  sendMessage,
  startMessagesListening,
} from "../../redux/chatReducer";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";

export const ChatPage: React.FC = () => {
  return (
    <>
      <Chat />
    </>
  );
};

const Chat: React.FC = () => {
  //const [wsChannel, setWs] = useState<WebSocket | null>(null);

  /* useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log("close");
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener("close", closeHandler);
      ws?.close();

      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws.addEventListener("close", closeHandler);
      setWs(ws);
    }
    createChannel();
    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []); */
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(endMessagesListening());
    };
  }, []);
  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  return (
    <div style={{ height: "300px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} style={{ width: "30px" }} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

type MessageFormType = {
  messageForm: string;
};

const AddMessageForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<MessageFormType>();
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );
  const [msg, setMsg] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<MessageFormType> = (data) => {
    dispatch(sendMessage(msg));
    setMsg("");
    reset();
  };

  return (
    <form /* onSubmit={handleSubmit(onSubmit)} */>
      <input
        placeholder="Message"
        {...register("messageForm")}
        onChange={(e) => setMsg(e.currentTarget.value)}
        value={msg}
      />
      {/* <input value="Send message" type="submit" /> */}
      <Button
        /* disabled={ws === null || readyStatus !== "ready"} */
        onClick={handleSubmit(onSubmit)}
      >
        Send message
      </Button>
    </form>
  );
};

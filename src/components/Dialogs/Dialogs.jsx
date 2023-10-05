import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { useForm } from "react-hook-form";

function Dialogs(props) {
  let newMessage = React.createRef();
  function addMessage(msg) {
    props.addMessage(msg);
  }

  let newDialogsData = props.dialogs.dialogs.map((mem) => (
    <DialogItem name={mem.name} id={mem.id} key={mem.id} />
  ));

  let newMessages = props.dialogs.messages.map((msg) => (
    <Message data={msg.message} />
  ));

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data.newMsg);
    addMessage(data.newMsg);
    reset();
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_item}>{newDialogsData}</div>
      <div className={styles.messages}>{newMessages}</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="textarea" {...register("newMsg")} />
          <input value="Add message" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Dialogs;

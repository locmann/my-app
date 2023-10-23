import styles from "./Message.module.css";

type PropsType = {
  data: string;
};

function Message(props: PropsType) {
  return <div className={styles.message}>{props.data}</div>;
}

export default Message;

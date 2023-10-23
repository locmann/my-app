import { NavLink } from "react-router-dom";
import styles from "./DialogItem.module.css";

type PropsType = {
  id: number;
  name: string;
};

function DialogItem(props: PropsType) {
  let path = "/dialogs/" + props.id;
  return (
    <div className={styles.member}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
}

export default DialogItem;

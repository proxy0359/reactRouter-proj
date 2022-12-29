import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  return (
    <li className={classes.item}>
      <h3>{props.name}</h3>
      <p>{props.text}</p>
    </li>
  );
};

export default CommentItem;

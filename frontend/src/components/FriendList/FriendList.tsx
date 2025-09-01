import classes from "./FriendList.module.css"
import FriendBox from "../FriendBox/FriendBox";

function FriendList() {
  return (
    <>
      <div className={classes.friendList}>
        <div className={classes.listContainer}>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
          <FriendBox></FriendBox>
        </div>
      </div>
    </>
  )
}

export default FriendList;

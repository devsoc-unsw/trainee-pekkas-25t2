import classes from "./FriendBox.module.css"

function FriendBox() {
  return (
    <>
      <div className={classes.friendBox}>
        <div className={classes.friendIcon}></div>
        <div className={classes.friendName}>
          Friend Name
        </div>
      </div >
    </>
  )
}

export default FriendBox;

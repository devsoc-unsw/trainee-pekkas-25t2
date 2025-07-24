import classes from "./Navbar.module.css"
import friendIcon from "../../assets/friends_icon.png"
import todoIcon from "../../assets/todo_icon.png"
import packIcon from "../../assets/pack_icon.png"
import pokeballIcon from "../../assets/pokeball_icon.png"
import { useState } from 'react';

type Pages = "friend" | "todo" | "pokeball" | "pack"

function NavBar() {
  const [clicked, setClicked] = useState<Pages>("todo");

  const onClickHandler = (page: Pages) => {
    // todo: navigation

    setClicked(page);
  }

  return (
    <div className={classes.navbar}>
      <div 
        className={clicked === "todo" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
        onClick={() => onClickHandler("todo")}>
        <img 
          className={clicked === "todo" ? classes.itemClicked : classes.itemUnclicked} 
          src={todoIcon} 
          onClick = {() => onClickHandler("todo")}></img>
      </div>

      <div 
        className={clicked === "friend" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
        onClick={() => onClickHandler("friend")}>
        <img 
          className={clicked === "friend" ? classes.itemClicked : classes.itemUnclicked} 
          src={friendIcon} 
          onClick = {() => onClickHandler("friend")}></img>
      </div>

      <div 
        className={clicked === "pokeball" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
        onClick={() => onClickHandler("pokeball")}>
        <img 
          className={clicked === "pokeball" ? classes.itemClicked : classes.itemUnclicked} 
          src={pokeballIcon} 
          onClick = {() => onClickHandler("pokeball")}></img>
      </div>

      <div 
        className={clicked === "pack" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
        onClick={() => onClickHandler("pack")}>
        <img 
          className={clicked === "pack" ? classes.itemClicked : classes.itemUnclicked} 
          src={packIcon} 
          onClick = {() => onClickHandler("pack")}></img>
      </div>

    </div>
  )
}

export default NavBar;

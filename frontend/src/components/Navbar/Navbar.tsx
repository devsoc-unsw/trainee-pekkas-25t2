import classes from "./Navbar.module.css"
import friendIcon from "../../assets/friends_icon.png"
import todoIcon from "../../assets/todo_icon.png"
import packIcon from "../../assets/pack_icon.png"
import pokeballIcon from "../../assets/pokeball_icon.png"
import { useState } from 'react';
import { useNavigate } from "react-router"

type Pages = "friends" | "todo" | "pokemon" | "pack"

function NavBar() {
  // get the current URL
  const url = window.location.href
  const locationString = url.substring(url.lastIndexOf('/') + 1)

  const pageHash: Record<string, Pages> = {
    "friends": "friends",
    "todo": "todo",
    "pokemon": "pokemon",
    "pack": "pack",
  }
  const location = pageHash[locationString]

  const [clicked, setClicked] = useState<Pages>(location);
  const navigate = useNavigate();

  const onClickHandler = (page: Pages) => {
    setClicked(page);

    const pathHash: Record<Pages, string> = {
      todo: "/todo",
      friends: "/friends",
      pokemon: "/pokemon",
      pack: "/pack",
    }

    navigate(pathHash[page]);
  }

  return (
    <>
      <div className={classes.navbarWrapper}>
        <div className={classes.navbar}>
          <div
            className={clicked === "todo" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
            onClick={() => onClickHandler("todo")}>
            <img
              className={clicked === "todo" ? classes.itemClicked : classes.itemUnclicked}
              src={todoIcon}
              onClick={() => onClickHandler("todo")}></img>
          </div>

          <div
            className={clicked === "friends" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
            onClick={() => onClickHandler("friends")}>
            <img
              className={clicked === "friends" ? classes.itemClicked : classes.itemUnclicked}
              src={friendIcon}
              onClick={() => onClickHandler("friends")}></img>
          </div>

          <div
            className={clicked === "pokemon" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
            onClick={() => onClickHandler("pokemon")}>
            <img
              className={clicked === "pokemon" ? classes.itemClicked : classes.itemUnclicked}
              src={pokeballIcon}
              onClick={() => onClickHandler("pokemon")}></img>
          </div>

          <div
            className={clicked === "pack" ? classes.itemWrapperClicked : classes.itemWrapperUnclicked}
            onClick={() => onClickHandler("pack")}>
            <img
              className={clicked === "pack" ? classes.itemClicked : classes.itemUnclicked}
              src={packIcon}
              onClick={() => onClickHandler("pack")}></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar;

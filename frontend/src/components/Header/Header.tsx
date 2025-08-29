import classes from "./Header.module.css"

function Header() {
  return (
    <>
    <div className={classes.header}>
      <h1 className={classes.headerText}>
        HABITMON
      </h1>
    </div>

    {/** Div for black, pokemon-esque border btw header and page content */}
    <div className={classes.bottomPad}></div>
    </>
  )
}

export default Header;

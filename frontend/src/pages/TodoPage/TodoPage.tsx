import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";
import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import Timer from "../../components/Timer/Timer";
import classes from "./TodoPage.module.css";

function TodoPage() {
  return (
    <div className={classes.todoWrapper}>
      <Header />
      <div className={classes.leftRightWrapper}>
        <Timer/>
        <ActivePokemonCard/>
      </div>
      <Navbar />
    </div>
  )
}

export default TodoPage;

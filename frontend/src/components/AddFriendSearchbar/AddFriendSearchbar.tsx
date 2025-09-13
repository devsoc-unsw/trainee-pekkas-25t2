import classes from "./AddFriendSearchbar.module.css"
import searchIcon from "../../assets/search_icon.png"

function AddFriendSearchbar() {
	return (
		<>
			<div className={classes.searchbarWrapper}>
				<div className={classes.searchbar}>
					<img
						src={searchIcon}
						alt="search icon"
						className={classes.searchIcon}
					/>

					<input
						type="text"
						placeholder="Search for users..."
						className={classes.searchInput}
					/>
				</div>
			</div>
		</>
	)
}

export default AddFriendSearchbar;

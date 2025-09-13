import { useState } from "react";
import classes from "./AddFriendSearchbar.module.css"
import searchIcon from "../../assets/search_icon.png"

type friendBarProps = {
  onSearch: (query: string) => void; //callback function to ensure parent component searches
};

function AddFriendSearchbar({onSearch}:friendBarProps) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
    	e.preventDefault();
		const trimmedName = query.trim();
		if (!trimmedName) return;
		onSearch(trimmedName);
  	};

	return (
		<>
			<div className={classes.searchbarWrapper}>
				<div className={classes.searchbar}>
					<img
						src={searchIcon}
						alt="search icon"
						className={classes.searchIcon}
					/>
					<form className={classes.searchBarForm} onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Search for users..."
							className={classes.searchInput}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</form>
				</div>
			</div>
		</>
	)
}

export default AddFriendSearchbar;

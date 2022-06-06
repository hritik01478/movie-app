const SearchBox = (props) => {
    return (
        <div className="searchBox">
            <input value={props.value} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Type to search..." />
        </div>
    );
}

export default SearchBox;
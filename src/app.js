

class MovieNominations extends React.Component {
	render() {
		// const API_KEY = 'd73f30a6';
		return (
			<div>
				<Header />
				<Search />
				<Nomination />
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>Movie Nominations</h1>
				<p>The best of the best!</p>
			</div>
		);
	}
}

class Search extends React.Component {
	handleSearch(e) {
		e.preventDefault();
		
		const search = e.target.elements.search.value;

		if (search) {
			alert(search);
		}
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSearch}>
					<input type="text" name="search" />
					<button>Search</button>
				</form>
			</div>
		);
	}
}

class Nomination extends React.Component {

	render() {
		return (
			<div>
				<p>This where the nominations will go.</p>
			</div>
		)
	}
}
ReactDOM.render(<MovieNominations />, document.getElementById('app'));

// componentDidMount() {
// 	fetch('http://www.omdbapi.com/?apikey={API_KEY}&')
// }
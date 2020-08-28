class MovieNominations extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<search />
			</div>
		)
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
	render() {
		return (
			<div>
				<button>Search</button>
			</div>
		);
	}
}


ReactDOM.render(<MovieNominations />, document.getElementById('app'));
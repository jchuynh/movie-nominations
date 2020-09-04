console.log('app.js');

import axios from 'axios';

class MovieNominations extends React.Component {
	render() {
		console.log('movienom');
		// const API_KEY = 'd73f30a6';
		return (
			<div>
				<Header />
				<Search />
				<Movie />
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
		console.log('search');
		return (
			<div>
				<form onSubmit={this.handleSearch}>
					<input type="text" name="search" />
					<button>Search</button>
				</form>
				<p>This is where the results should be displayed.</p>
			</div>
		);
	}
}

class Movie extends React.Component {
	constructor(props){
		super(props);
			this.state = {
				movieInfo: {}
			};
	}

	componentDidMount() {
		console.log('component mount');
		axios
			.get(
				`http://www.omdbapi.com/?apikey=${d73f30a6}&i=${this.props.movieID}`)
			.then(res => res.data)
			.then(res => {this.setState({ movieInfo: res });
			});
	}
	render() {
		const {
			Title,
			Released
		} = this.state.movieInfo;

		return (
			<div>
				<h2>{Title} ({Released})</h2>
			</div>
		);
	}
}

class Nomination extends React.Component {

	render() {
		console.log('nom');
		return (
			<div>
				<p>This where the user nominations will go.</p>
				<button>Remove Nomination</button>
			</div>
		)
	}
}

ReactDOM.render(<MovieNominations />, document.getElementById('app'));

console.log('app.js');

// const API_KEY = process.env.REACT_APP_OMBd_API_KEY;

class MovieNominations extends React.Component {

	render() {
		console.log('movienom');
		return (
			<div>
				<Header />
				<MovieDisplay />
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

class MovieDisplay extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			movieData: {}
		};
	}

	ComponentDidMount() {
		axios
			// Allows the user to search for movies on multiple categories.
			.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${this.props.movieID}`)
			.then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
	}

	render() {
		console.log('display');
		const {Title, Released} = this.state.movieData;

		return ( 
			<div>
				<h2>{Title}</h2>
				<p>{Released}</p>
			</div>
		);	
	}
}

class MovieSearch extends React.Component {
	constructor(Props) {
		super(props);
		this.state = {
			movieList: [],
			searchTerm: ''
		};
	}

handleSearch(e) {
		e.preventDefault();
		axios
			.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${this.props.searchTerm}`)
			.then(res => res.data)
			.then(res => {
				if (!res.handleSearch) {
					this.setState({ movieList: [] });
					return
				}

				const movieList = res.handleSearch.map(movie.imdbID);
				this.setState({movieList});
		});
		
	};
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

class Nomination extends React.Component {

	render() {
		console.log('nom');
		return (
			<div>
				<p>This where the user nominations will go.</p>
				<button>Remove Nomination</button>
			</div>
		);
	}
}

ReactDOM.render(<MovieNominations />, document.getElementById('app'));

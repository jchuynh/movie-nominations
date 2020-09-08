console.log('app.js');

// const API_KEY = process.env.REACT_APP_OMBd_API_KEY;

// import axios from 'axios';

class MovieNominations extends React.Component {

	render() {
		console.log('movienom');
		return (
			<div>
				<Header />
				<MovieDisplay />
				<MovieSearch />
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
	constructor(props) {
		super(props);
		this.state = {
			movieList: [],
			searchTerm: ''
		}
		this.handleSearch = this.handleSearch.bind(this)
		this.handleUpdateInput = this.handleUpdateInput.bind(this)
	}

	handleSearch(e) {
		e.preventDefault();
		console.log('handleSearch : ', this.state.searchTerm);
		axios
			.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${this.state.searchTerm}`)
			.then(res => res.data)
			.then(res => {
				if (!res.handleSearch) {
					this.setState({ movieList: [] });
					return;
				}

				const movieList = res.handleSearch.map(movie.imdbID);
				this.setState({movieList});
		});
		
	};

	handleUpdateInput(e) {
		e.preventDefault();
		console.log('handleUpdateInput : ', this.state.searchTerm);
		this.setState({
			searchTerm: e.target.value
		});
	};

	
	render() {
		const { movieList } =  this.state;
		console.log('search-box');
		return (
			<div>
				<form onSubmit={this.handleSearch}>
					<input type='text' placeholder='Type Here' name='searchTerm'
					onChange = {this.handleUpdateInput}/>
					<button>Search</button>
				</form>
				{movieList.length > 0 ? (
                    movieList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find any movie. Please search again using
                        another search criteria.
					</p>
				)}
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

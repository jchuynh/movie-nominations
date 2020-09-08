// console.log('app.js is working');

const API_KEY = process.env.REACT_APP_OMBd_API_KEY;

// import axios from 'axios';

class MovieNominations extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<MovieSearch />
				<MovieDisplay />
				<Nomination />
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div className="container">
				<h1>Movie Nominations</h1>
				<p>The best of the best!</p>
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
		};
		// Added below so object can bind -- got undefined error
		this.handleSearch = this.handleSearch.bind(this)
		this.handleUpdateInput = this.handleUpdateInput.bind(this)
	}

	handleSearch(e) {
		e.preventDefault();
		// console.log('handleSearch : ', this.state.searchTerm);
		// Using Axios to help make the api request
		axios ({
			method: 'get',
			url: `https://www.omdbapi.com/?apikey=${API_KEY}&s=
				${this.state.searchTerm}`,
			responseType: 'json'
		})
			// looking at json file under a standard Search
			// If the search exsits, parse the imdbID to movieList arr
			// if the search is empty, re turn an empty movie list
			.then(res => res.data)
			.then(res => {if 
				(!res.Search) {
				this.setState({ movieList: [] });
				return;
				}
				//map the imdbID and save it 
				const movieList = res.Search.map(movie => movie.imdbID);
					this.setState({ movieList });
		});
	};

	handleUpdateInput(e) {
		// e.preventDefault();
		console.log('handleUpdateInput : ', this.state.searchTerm);
		this.setState({
			searchTerm: e.target.value
		});
	};

	
	render() {
		// console.log('handleSearch : ', this.state.searchTerm);
		const { movieList } = this.state;
		// console.log('movieList:', movieList);
		// if the length of the items in the movieList arr is > 0 
		// map the arr of movie to movieID
		// movieID will  be sent to <MovieDisplay /> into the API call
		return (
			<div>
				<form onSubmit={this.handleSearch}>
					<input type='text' placeholder='Type Here' 
						name='searchTerm'
						onChange={this.handleUpdateInput}/>
					<button type='submit'>Search</button>
				</form>
				{movieList.length > 0 ? (
                    movieList.map(movie => (
                        <MovieDisplay movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
						Wasn't able to find a movie. Please try another 
						search.
					</p>
				)}
			</div>
		);
	}
}


class MovieDisplay extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			movieData: {},
			nominationList: []
		};
		this.handleAddNomination = this.handleAddNomination.bind(this)
	}

	ComponentDidMount() {
		axios({
			method: 'get',
			// Search by imdbID to extract all info in json format
			url: `https://www.omdbapi.com/?apikey=${API_KEY}&i=
				${this.props.movieID}`,
			responseType: 'json'
		})	// something wrong here -- movieData showing {} empty
			// movieID and movieList checks out
			// movieID not connecting to get method?
			// Are keys an issue?
			.then(data => data.json())
            .then(data => {
				this.setState({ movieData: data });
			});
	}

	// When the user selects a movie to nominate,
	// User clicks button
	// movie gets added to Nomination list

	//MovidID showing up as undefined, cannot push undefined
	//NominationList is therefore empty
	handleAddNomination(movieID) {
		this.setState(() => {
			const nominationList = this.state.list.push(this.state.movieID)
			
		});
	}

	render() {
		console.log('movieData', this.state.movieData);
		console.log('movieID:', this.props.movieID);
		console.log('nominationList', this.state.nominationList)
		// Get only the Title and Released info from the most recent search
		const {Title, Year} = this.state.movieData;
		return ( 
			<div className="movieCard">
				<h2>{Title}</h2>
				<p>{Year}</p>
				<button onClick={this.handleAddNomination}>
					Add Nomination</button>
			</div>
		);	
	}
}

// Section where the movies that have been nominated live
class Nomination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieData: {},
			nominationList: []
		};
		this.handleRemoveNomination = this.handleRemoveNomination.bind(this)
	}

	// When user selects the Remove Nomination button
	// Make a copy of the array? No we are not saving the previous set
	// remove the array by index
	handleRemoveNomination(e) {
		e.preventDefault();
		this.setState(() => {
			const nominationList = this.state.nominationList
			.filter(movie => movie.id !== e)
			this.setState( {nominationList} )
		});
	}			
				
			
	render() {
		const {Title, Year} = this.state.movieData;
		return (
			<div className="movieCard">
				<h2>{Title}</h2>
				<p>{Year}</p>
				<h1>Here Are Your Nominations!</h1>
					<div className="movieCard">
						<button onClick={this.props.handleRemoveNomination}>
							Remove Nomination</button>
					</div>
			</div>
		);
	}
}

ReactDOM.render(<MovieNominations />, document.getElementById('app'));

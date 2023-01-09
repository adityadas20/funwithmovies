import React, { Component } from 'react';
import { movies } from './getMovies';

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currText: '',
            popularitySortOrder: '',
            ratingSortOrder: '',
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp = [];
        temp.push('All Genres');
        data.forEach((movieObj => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        }))
        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }
    handleClick = (genre) => {
        this.setState({
            currgen: genre
        })
    }
    handlePopularityOrder = () => {
        if (this.state.popularitySortOrder === 'desc') {
            let temp = this.state.movies;
            temp.sort(function (objA, objB) {
                return objA.popularity - objB.popularity;
            })
            this.setState({
                popularitySortOrder: 'asc',
                movies: [...temp]
            })
        }
        else {
            let temp = this.state.movies;
            temp.sort(function (objA, objB) {
                return objB.popularity - objA.popularity;
            })
            this.setState({
                popularitySortOrder: 'desc',
                movies: [...temp]
            })
        }
    }
    handleRatingOrder = () => {
        if (this.state.ratingSortOrder === 'desc') {
            let temp = this.state.movies;
            temp.sort(function (objA, objB) {
                return objA.vote_average - objB.vote_average;
            })
            this.setState({
                ratingSortOrder: 'asc',
                movies: [...temp]
            })
        }
        else {
            let temp = this.state.movies;
            temp.sort(function (objA, objB) {
                return objB.vote_average - objA.vote_average;
            })
            this.setState({
                ratingSortOrder: 'desc',
                movies: [...temp]
            })
        }
    }
    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }
    handleDelete = (id) => {
        console.log(id);
        let temp = this.state.movies.filter((movieObj) => { return movieObj.id != id });

        this.setState({
            movies: [...temp]
        })
        localStorage.setItem("movies-app", JSON.stringify(temp))
    }
    render() {
        // this.setState({ THIS IS INVALID as setState leads to render and render will again lead to setState hence running into an infinite loop
        //     genres: [...temp]
        // })
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let pages = Math.ceil(this.state.movies.length / this.state.limit);
        let pagesArr = [];
        for (let i = 1; i <= pages; i++) {
            pagesArr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;


        return (
            <>
                <div className='main'>
                    <div className='row'>
                        <div className='col-3'>
                            <ul class="list-group favourites-genres">
                                {
                                    this.state.genres.map((genre) => (
                                        this.state.currgen === genre ?
                                            <li class="list-group-item" style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }}>{genre}</li>
                                            :
                                            <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleClick(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-lg-9 favourites-table col-sm-12'>
                            <div className="row favourites-search-bars">
                                <input type='text' className='input-group-text' placeholder='Search' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                <input type='number' className='input-group-text' placeholder={`Rows count: ${this.state.limit}`} onChange={(e) => this.setState({ limit: e.target.value })} />
                            </div>
                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fa-solid fa-sort" onClick={this.handlePopularityOrder}></i>Popularity</th>
                                            <th scope="col"><i class="fa-solid fa-sort" onClick={this.handleRatingOrder}></i>Rating</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.movies.map((movieObj, index) => (
                                                ((index >= si && index < ei) && (this.state.currText === '' || movieObj.original_title.toLowerCase().includes(this.state.currText.toLowerCase())) && (this.state.currgen === 'All Genres' || genreids[movieObj.genre_ids[0]] == this.state.currgen)) ?
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} /> {movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                    :
                                                    <div></div>
                                            ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination" >
                                    {
                                        pagesArr.map((page) => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
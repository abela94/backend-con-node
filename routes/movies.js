const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
	const router = express.Router();
	app.use('/api/movies', router);

	const moviesServices = new MoviesService();

	router.get('/', async function (req, res, next) {
		const { tags } = req.query;
		try {
			const movies = await moviesServices.getMovies({ tags });

			res.status(200).json({
				data: movies,
				message: 'Movies listed',
			});
		} catch (err) {
			next(err);
		}
	});

	router.get('/:movieId', async function (req, res, next) {
		const { movieId } = req.params;
		try {
			const movies = await moviesServices.getMovie({ movieId });

			res.status(200).json({
				data: movies,
				message: 'Movie retrieved',
			});
		} catch (err) {
			next(err);
		}
	});

	router.post('/', async function (req, res, next) {
		const { body: movie } = req;
		try {
			const createdMovieId = await moviesServices.createMovie({ movie });

			res.status(201).json({
				data: createdMovieId,
				message: 'Movie created',
			});
		} catch (err) {
			next(err);
		}
	});

	router.put('/:movieId', async function (req, res, next) {
		const { movieId } = req.params;
		const { body: movie } = req;
		try {
			const updatedMovieId = await moviesServices.updateMovie({
				movieId,
				movie,
			});

			res.status(200).json({
				data: updatedMovieId,
				message: 'Movie updated',
			});
		} catch (err) {
			next(err);
		}
	});

	router.delete('/:movieId', async function (req, res, next) {
		const { movieId } = req.params;
		try {
			const deletedMovieId = await moviesServices.deleteMovie({ movieId });

			res.status(200).json({
				data: deletedMovieId,
				message: 'Movie deleted',
			});
		} catch (err) {
			next(err);
		}
	});
}

module.exports = moviesApi;

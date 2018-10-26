// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log('new connection');
//     res.write('Hello');
//     res.end();
// })

// console.log('connected');
import * as express from 'express';
// const express = require('express');
const app = express();

app.use(express.json());

// req == http request，res == http response
app.get('/', (req, res) => {
    res.send('Welcome to TOP 20 movies');
})

app.get('/api', (req, res) => {
    // res.send(req.params);
    res.json(movies);
})

// get movie with a given id in url
app.get('/api/movies/:id', (req, res) => {
    // res.send(req.params);
    const m = movies.find(e => e.id == req.params.id);
    // set http status as 404 if there is no movie with given id found in the array
    if(!m) {
        res.status(404).send('Ooops! No film found');
        return;
    }
    res.json(m);
})

// get movie with a given id in url by using query
app.get('/api/movies', (req, res) => {
    const m = movies.find(e => e.id == req.query.id);
    if(!m) {
        res.status(404).send('Ooops! No film found');
        return;
    }
    res.json(m);
})

// get movie with a given name in url by using query; 
// the url request is like: http://localhost3001/api/movies?name=xxx
app.get('/api/movies', (req, res) => {
    // res.send(req.params);
    const m = movies.find(e => e.name = req.query.name);
    console.log(m);
    // set http status as 404 if there is no movie with given id found in the array
    res.json(m);
})

// post a new movie
app.post('/api/movies', (req, res) => {
    // validation for req.body.name of short name or null
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Ooops! Name too short');
        return;
    }

    const newM = new Movie (movies.length + 1, req.body.name, req.body.year, req.body.director, req.body.rating,
        req.body.desp);
    // add new movie to movies 
    movies.push(newM);
    // convert it to json format
    res.json(newM);
})

// create Course class
export class Movie {
    constructor(public id:number, 
        public name:string, 
        public year: number,
        public director:string,
        public rating:number, 
        public desp:string) {}
}

const movies:Movie[] = [
    new Movie(1, "The Shawshank Redemption", 1994, 'Frank A. Darabont', 9.6, 
    'Fear Can Hold You Prisoner, Hope Can Set You Free'),
    new Movie(2, "Farewell My Concubine", 1993, 'Chen Kaige', 9.6, 
    'This is not simply a movie, it`s the LIFE'),
    new Movie(3, "Leon", 1994, 'Luc Besson', 9.4, 
    'Shape of my heart'),
    new Movie(4, "Forrest Gump", 1994, 'Robert Zemeckis', 9.4, 
    'Mama always said life was like a box of chocolates. You never know what you`re gonna get'),
    new Movie(5, "La vita è bella", 1997, 'Roberto Benigni', 9.5, 
    'Buongiorno, la mia principessa'), 
    new Movie(6, "Titanic", 1997, 'James Cameron', 9.3, 
    'He saved me,in every way that a person can be saved'),
    new Movie(7, "Spirited Away", 2001, 'Hayao Miyazaki', 9.3, 'Always with me'),
    new Movie(8, "Schindler's List", 1993, 'Steven Spielberg', 9.5, 
    'Save the World'),
    new Movie(9, "Inception", 2010, 'Christopher Nolan', 9.3, 
    'You`re waiting for a train, a train that will take you far away. You know where you hope this train will take you, but you can`t be sure. But it doesn`t matter - because we`ll be together'),
    new Movie(10, "WALL·E", 2008, 'Andrew Stanton', 9.3, 
    'I don`t want to survive. I want to live'), 
    new Movie(11, "Hachi: A Dog's Tale", 2009, 'Lasse Hallström', 9.3, 
    'Never forget anyone you loved'),
    new Movie(12, "3 Idiots", 2009, 'Rajkumar Hirani', 9.2, 
    'Life is about moving on,accepting changes, and looking forward to what makes you stronger and more complete'),
    new Movie(13, "The Legend of 1900", 1998, 'Giuseppe Tornatore', 9.2, 
    'We laughed and kept saying `See you soon`. But inside we both knew we`d never see each other again'),
    new Movie(14, "Les choristes", 2004, 'Christophe Barratier', 9.2, 'paper airplane'),
    new Movie(15, "A Chinese Odyssey Part Two - Cinderella", 1995, 'Jeffrey Lau', 9.2, 
    '一生所爱'), 
    new Movie(16, "The Truman Show", 1998, 'Peter Weir', 9.2, 
    'Good morning, and in case I don`t see ya, good afternoon, good evening, and good night!'),
    new Movie(17, "The Godfather", 1972, 'Francis Ford Coppola', 9.2, 
    'Because a man who doesn`t spend time with his family can never be a real man'),
    new Movie(18, "My Neighbor Totoro", 1988, 'Hayao Miyazaki', 9.1, 
    'Path of wind'),
    new Movie(19, "Interstellar", 2014, 'Christopher Nolan', 9.2, 
    'Do not go gentle into that good night'),
    new Movie(20, "Silenced", 2011, 'Dong-hyuk Hwang', 9.2, 
    'We can not change the world, but we can be not changed by the world')
];

app.listen(3001);
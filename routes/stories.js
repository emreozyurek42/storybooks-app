const express = require('express');
const router= express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


router.get('/', (req, res) => {
    Story.find({status: 'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index', {stories});
    }); 
});

router.get('/show/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(story => {
        res.render('stories/show', {story:story});
    })
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

router.post('/', (req, res) => {
 let allowCommnets;

 if(req.body.allowCommnets) {
     allowCommnets = true;
 } else {
     allowCommnets = false;
 }
 const newStory = {
     title: req.body.title,
     body: req.body.body,
     status: req.body.status,
     allowCommnets: allowCommnets,
     user: req.user.id
 }

 new Story(newStory)
 .save()
 .then(story => {
     res.redirect(`/stories/show/${story.id}`);
 })
});

module.exports = router;
'use strict';

const { Router, response } = require('express');
const Itinerary = require('../database/models/itineraryModel');

module.exports = {
    Router,
    response,
    Itinerary
}
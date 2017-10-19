var express = require('express');
var builder = require('xmlbuilder');
var router = express.Router();

var db = require('./db');
var Contact = require('./contact');

var user = {
	name : "",
	password : "",
	username : "",
	email : ""
}
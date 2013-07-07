/**
 * @jsx React.DOM
 */
var React = require('react-core').React;
var Application = require('../app/Application.jsx');

/**
 * TODO: Support IE8.
 */
document.addEventListener("DOMContentLoaded", function() {
  React.renderComponent(<Application />, document.getElementById('mainContainer'));
});

module.exports = {};

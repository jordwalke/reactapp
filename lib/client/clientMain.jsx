/**
 * @jsx React.DOM
 */
var React = require('react-core').React;
var Application = require('../components/Application.jsx');

// TODO: Use document ready event.
window.setTimeout(function() {
  React.renderComponent(<Application />, document.getElementById('mainContainer'));
});

module.exports = {};

/**
 * @jsx React.DOM
 */
var Widget = require('./Widget.jsx');
var React = require('react-core').React;

var Application = React.createClass({
  render: function() {
    var imgStyle = {
      marginLeft: '50%',
      position: 'relative',
      left: -360,
      marginTop: 50
    };
    return (
      <img src="ReactAppLogo.png" style={imgStyle}/>
    );
  }
});
module.exports = Application;

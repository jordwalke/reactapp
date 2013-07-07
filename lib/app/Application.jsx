/**
 * @jsx React.DOM
 */
var Widget = require('./Widget.jsx');
var React = require('react-core').React;

var Application = React.createClass({
  handleClick: function() {
    alert('You clicked this again!');
  },
  render: function() {
    var imgStyle = {
      marginLeft: '50%',
      position: 'relative',
      left: -360,
      marginTop: 50
    };
    return (
      <div onClick={this.handleClick}>
        <img src="ReactAppLogo.png" style={imgStyle}/>
      </div>
    );
  }
});
module.exports = Application;

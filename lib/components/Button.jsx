/**
 * @jsx React.DOM
 */
var React = require('reactjs').React;

var Button = React.createClass({
  handleClick: function(e) {
    alert('you clicked');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} classSet={{Button:true}}>
        Hello, this is a button
      </div>
    );
  }
});

module.exports = Button;

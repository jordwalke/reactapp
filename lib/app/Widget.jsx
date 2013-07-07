/**
 * @jsx React.DOM
 */
var React = require('react-core').React;

var Widget = React.createClass({
  handleClick: function(e) {
    alert('you clicked');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} classSet={{Widget:true}}>
        Hello, this is a Widget
      </div>
    );
  }
});

module.exports = Widget;

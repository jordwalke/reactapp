/**
 * @providesModule Button
 */
var React = require('React');

var Button = React.createClass({
  render: function() {
    return (
      <div classSet={{Button:true}}>
        Hello, this is a button
      </div>
    );
  }
});

module.exports = Button;

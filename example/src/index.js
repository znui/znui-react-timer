require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var timer = require('../../src/index');

znui.react.createApplication({
    render: <div>
        <timer.Timer />
        <timer.CountDownTimer value={'2020-09-17 13:01:00'} />
    </div>
});
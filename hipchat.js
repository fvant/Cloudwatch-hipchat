var hipchat = require('node-hipchat');
var HC_TOKEN = 'token';
var HC_ROOM = 1234;

exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    subject = event.Records[0].Sns.Subject;
    msg = JSON.parse(event.Records[0].Sns.Message);

    var HC = new hipchat(HC_TOKEN);

    var params = {
      room: HC_ROOM,
      from: 'Cloudwatch',
      message: subject+'<br><pre>'+JSON.stringify(msg.NewStateReason, null, 2)+'</pre>',
      color: 'red'
    };

    HC.postMessage(params, function(data) {
      // Message has been sent!
        context.succeed(event.Subject);
    });
};

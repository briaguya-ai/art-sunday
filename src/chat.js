// based on
// https://github.com/giambaJ/jChat/blob/1cc4475c55bcea3b8610e3577c593f2268b18ba4/v2/script.js
// https://github.com/giambaJ/jChat/blob/1cc4475c55bcea3b8610e3577c593f2268b18ba4/v2/utils.js#L21
import $ from "jquery";

function TwitchAPI(url) {
    return $.getJSON(url + (url.search(/\?/) > -1 ? '&' : '?') + 'client_id=' + client_id);
}

export const Chat = {
    info: {
        channel: null,
    },

    load: function(callback) {
        TwitchAPI('https://api.twitch.tv/v5/users?login=' + Chat.info.channel).done(function(res) {
            Chat.info.channelID = res.users[0]._id;

            callback(true);
        });
    },

    update: setInterval(function() {
        if (Chat.info.lines.length > 0) {
          console.log(Chat.info.lines.length);
        }
    }, 200),

    connect: function(channel) {
        Chat.info.channel = channel;
        var title = $(document).prop('title');
        $(document).prop('title', title + Chat.info.channel);

        Chat.load(function() {
            console.log('jChat: Connecting to IRC server...');
            var socket = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', { reconnectInterval: 2000 });

            socket.onopen = function() {
                console.log('jChat: Connected');
                socket.send('PASS blah\r\n');
                socket.send('NICK justinfan' + Math.floor(Math.random() * 99999) + '\r\n');
                socket.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
                socket.send('JOIN #' + Chat.info.channel + '\r\n');
            };

            socket.onclose = function() {
                console.log('jChat: Disconnected');
            };

            socket.onmessage = function(data) {
                data.data.split('\r\n').forEach(line => {
                    if (!line) return;
                    var message = window.parseIRC(line);
                    if (!message.command) return;

                    switch (message.command) {
                        case "PING":
                            socket.send('PONG ' + message.params[0]);
                            return;
                        case "JOIN":
                            console.log('jChat: Joined channel #' + Chat.info.channel);
                            return;
                        case "PRIVMSG":
                            if (message.params[0] !== '#' + channel || !message.params[1]) return;

                            var nick = message.prefix.split('@')[0].split('!')[0];

                            console.log(message.params[1]);

                            return;
                    }
                });
            };
        });
    }
};

;(function() {
    angular
        .module('chat')
        .factory('chatService', chatService);

    /*ngInject*/
    function chatService($firebaseArray, firebaseReference) {
        return {
            getMessages: getMessages,
            sendMessage: sendMessage,
            minimize: minimize,
            maximize: maximize,
            close: close
        };

        function getMessages(chatId) {
            return $firebaseArray(firebaseReference.child('dots/messages/' + chatId));
        }

        function sendMessage(chatId, uid, message) {
            firebaseReference.child('dots/messages/' + chatId)
                .push({
                    sender: uid,
                    message: message
                });
        }

        function minimize(myUid, chatId) {
            firebaseReference.child('dots/users/' + myUid + '/chats/' + chatId)
                .set(1);
        }

        function maximize(myUid, chatId) {
            firebaseReference.child('dots/users/' + myUid + '/chats/' + chatId)
                .set(2);
        }

        function close(myUid, chatId) {
            firebaseReference.child('dots/users/' + myUid + '/chats/' + chatId)
                .set(0);
        }
    }
})();
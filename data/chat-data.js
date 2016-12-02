/* globals module Promise */

module.exports = function (models) {
    let { Chat } = models;

    return {
        createChatMessage(user, answer, datetime) {
            let chatAnswer = new Chat({ user, answer, datetime });
            return new Promise((resolve, reject) => {
                chatAnswer.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(chatAnswer);
                });

            });
        }
    };
};
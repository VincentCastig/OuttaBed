const { Expo } = require('expo-server-sdk');
const axios = require("axios");

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

module.exports = {

    sendNotifications: () => {
//Create the messages that you want to send to clients
        let notifications = {};
        let quotes = {};

        const getData = async () => {
            await
            axios.get('http://get-up-now.herokuapp.com/get-quotes').then(res => {
                quotes = res.data;
            }).catch(error => {
                console.log('error ', error)
            });

            await
            axios.get('http://get-up-now.herokuapp.com/get-all-tokens').then(res => {
                notifications = res.data;
            }).catch(error => {
                console.log('error ', error)
            });

        };


        getData().then(() => {
            module.exports.sendMessages(notifications, quotes);
        });

    },

    sendActiveQuote: () => {
        const getQuoteId = () => {
            axios.get('http://get-up-now.herokuapp.com/get-quote-id').then(res => {
                console.log('res getQuoteId', res);
            }).catch(error => {
                console.log('error getQuoteId', error)
            });
        };

        getQuoteId().then(() => {
            axios.put('http://get-up-now.herokuapp.com/set-active-token').then(res => {
                console.log('res set-active-token', res);
            }).catch(error => {
                console.log('error set-active-token', error)
            });
        });
    },

    sendMessages: (notifications, quotes) => {
            let date = new Date();
            let currentHour = date.getHours();
            let currentMinute = date.getMinutes();
            let messages = [];
            for (let notification of notifications) {
                let hour = new Date(notification.device_time).getUTCHours();
                let minute = new Date(notification.device_time).getUTCMinutes();

                if (hour == currentHour && minute == currentMinute) {
                    console.log('we are in ', notification.token);
                    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
                    // Check that all your push tokens appear to be valid Expo push tokens
                    if (!Expo.isExpoPushToken(notification.token)) {
                        console.error(`Push token ${notification.token} is not a valid Expo push token`);
                        continue;
                    }
                    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                    let randomNumber = Math.floor(Math.random() * quotes.length);
                    messages.push({
                        to: notification.token,
                        sound: 'default',
                        body: quotes[randomNumber].quote,
                        title: quotes[randomNumber].author,
                        data: {withSome: 'data'},
                    })
                }
            }

        // The Expo push notification service accepts batches of notifications so
        // that you don't need to send 1000 requests to send 1000 notifications. We
        // recommend you batch your notifications to reduce the number of requests
        // and to compress them (notifications with similar content will get
        // compressed).
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                } catch (error) {
                    console.error(error);
                }
            }
        })();


// Later, after the Expo push notification service has delivered the
// notifications to Apple or Google (usually quickly, but allow the the service
// up to 30 minutes when under load), a "receipt" for each notification is
// created. The receipts will be available for at least a day; stale receipts
// are deleted.
//
// The ID of each receipt is sent back in the response "ticket" for each
// notification. In summary, sending a notification produces a ticket, which
// contains a receipt ID you later use to get the receipt.
//
// The receipts may contain error codes to which you must respond. In
// particular, Apple or Google may block apps that continue to send
// notifications to devices that have blocked notifications or have uninstalled
// your app. Expo does not control this policy and sends back the feedback from
// Apple and Google so you can handle it appropriately.
        let receiptIds = [];
        for (let ticket of tickets) {
            // NOTE: Not all tickets have IDs; for example, tickets for notifications
            // that could not be enqueued will have error information and no receipt ID.
            if (ticket.id) {
                receiptIds.push(ticket.id);
            }
        }

        let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        (async () => {
            // Like sending notifications, there are different strategies you could use
            // to retrieve batches of receipts from the Expo service.
            for (let chunk of receiptIdChunks) {
                try {
                    let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                    console.log(receipts);

                    // The receipts specify whether Apple or Google successfully received the
                    // notification and information about an error, if one occurred.
                    for (let receiptId in receipts) {
                        let {status, message, details} = receipts[receiptId];
                        if (status === 'ok') {
                            continue;
                        } else if (status === 'error') {
                            console.error(
                                `There was an error sending a notification: ${message}`
                            );
                            if (details && details.error) {
                                // The error codes are listed in the Expo documentation:
                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                // You must handle the errors appropriately.
                                console.error(`The error code is ${details.error}`);
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();

    }

};

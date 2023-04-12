module.exports = (io) => {
    const joined = function (payload) {
        const socket = this; // hence the 'function' above, as an arrow function will not work
        // ...
        console.log(`Received message from ${socket.id}: ${payload}`);
    };

    return {
        joined,
    }
}
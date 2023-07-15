//SIGNALR
const signalR = require("@microsoft/signalr");

//private var
let connected = false;

//obj
const hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl("http://localhost:41895/botshub")
    .build();

const isConnected = () => {
    if (hubConnection) {
        console.log(hubConnection.state);
        return connected;
    } else return false;
};

//connection
const initializeConnection = async () => {
    if (!isConnected()) {
        await hubConnection
            .start()
            .then(async () => {
                console.log("Connected!");
                connected = true;
            })
            .catch((err) => {
                connected = false;
                const connectionId = hubConnection.connection.connectionId;
                console.log(connectionId);
                console.error(err.toString());
            });
    }
};

const dispose = async () => {
    if (isConnected()) {
        await hubConnection.stop();
    }
};

//recive event
hubConnection.onclose(async (error) => {
    const connectionId = hubConnection.connection.connectionId;
    console.log(connectionId);
    console.error(err);
    await dispose();
});

//register custom recive event
const addListener = (method, cb) => {
    hubConnection.on(method, (...args) => {
        cb(...args);
    });
};

//out event
const invokeHubMethod = async (method, ...args) => {
    if (isConnected()) {
        await hubConnection.invoke(method, ...args);
    }
};

module.exports = {
    initializeConnection,
    dispose,
    addListener,
    invokeHubMethod,
};

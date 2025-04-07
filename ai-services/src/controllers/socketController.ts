import { DefaultEventsMap, Socket } from "socket.io";
import elberListener from "../listeners/elberListener";

const socketSetListeners = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    elberListener(socket)
}

export default socketSetListeners
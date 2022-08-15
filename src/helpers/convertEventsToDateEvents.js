import { parseISO } from "date-fns";


export const converEventsToDateEvents = ( events = [] ) => {
    
    return events.map( evento => {
        
        evento.end = parseISO(evento.end);
        evento.start = parseISO(evento.start);

        return evento;
    })
}
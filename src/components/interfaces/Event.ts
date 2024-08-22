  export interface IEvent {
    id:string;
    event: string;
    date: string; // ISO 8601 format: 'YYYY-MM-DDTHH:MM:SS'
    location: string;
    description: string;
    capacity: number;
  }
  export interface IEventCardProps {
    event: IEvent;
  }
 
  export interface IEventsState {
    events: Event[];
  }
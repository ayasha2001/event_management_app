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
    onEditClick: (event: IEvent) => void;
    onDeleteClick: (id: string) => void;
    setViewDetail: (view: boolean) => void;
    setSelectedEvent: (event: IEvent) => void;
  }
  export interface IEventListProps {
    events: IEvent[];
    isFetchingEvents: boolean;
    onEditClick: (event: IEvent) => void;
    onDeleteClick: (id: string) => void;
    setViewDetail: (view: boolean) => void;
    setSelectedEvent: (event: IEvent) => void;
  }
 
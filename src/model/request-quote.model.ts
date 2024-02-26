export interface RequestQuote {
  client: {
    name: string;
    email: string;
    phone: string;
  };
  messages: string;
  eventDetails: {
    date: Date;
    location?: string;
    type: string;
    personNumber: number;
  };
  workCenterID: string;
  workCenterName: string;
  userID: string;
}

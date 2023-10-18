export interface MessageBodyType {
  id: number;
  source: string
  text : string;
  timestamp: string;
}

export interface State {
  messages: MessageBodyType[];
  currentPage: number;
  isAtEnd: boolean;
  currentPageMessages: MessageBodyType[];
  paginationArray: number[];
}
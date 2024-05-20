export interface Card {
  uuid: string;
  url: string;
}

export interface Deck {
  code: string;
  cards: Card[];
}

export interface DeckSearchResponse extends Deck {
  result: "OK" | "NG";
}

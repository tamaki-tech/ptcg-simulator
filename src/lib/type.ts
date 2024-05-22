export interface Card {
  id: string;
  url: string;
}

export interface Deck {
  code: string;
  cards: Card[];
}

export interface DeckSearchResponse extends Deck {
  result: "OK" | "NG";
}

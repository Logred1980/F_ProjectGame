import Suit from "./CardTypes.Suit"
import Rank from "./CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
export function New(PlayerHand, EnemyHand, Deck, GameOver, Winner, PlayerWins, EnemyWins)
export default interface GameState {
  PlayerHand:FSharpList_T<{Suit:Suit,Rank:Rank}>;
  EnemyHand:FSharpList_T<{Suit:Suit,Rank:Rank}>;
  Deck:FSharpList_T<{Suit:Suit,Rank:Rank}>;
  GameOver:boolean;
  Winner:FSharpOption<string>;
  PlayerWins:number;
  EnemyWins:number;
}

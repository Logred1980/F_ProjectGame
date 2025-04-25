import Suit from "./CardTypes.Suit"
import Rank from "./CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
export function drawCard(deck:FSharpList_T<{Suit:Suit,Rank:Rank}>):[FSharpOption<{Suit:Suit,Rank:Rank}>, FSharpList_T<{Suit:Suit,Rank:Rank}>]
export function shuffleDeck(deck:FSharpList_T<{Suit:Suit,Rank:Rank}>):FSharpList_T<{Suit:Suit,Rank:Rank}>
export function createDecks(nrDeck:number):FSharpList_T<{Suit:Suit,Rank:Rank}>
export function oneDeck():FSharpList_T<{Suit:Suit,Rank:Rank}>

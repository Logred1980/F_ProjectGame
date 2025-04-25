import GameState from "./Project21Game.GameLogic.GameState"
import Suit from "./CardTypes.Suit"
import Rank from "./CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
export function decideWinner(state:GameState):GameState
export function drawCardForEnemy(state:GameState):GameState
export function drawCardForPlayer(state:GameState):GameState
export function calcScore(hand:FSharpList_T<{Suit:Suit,Rank:Rank}>):number
export function calcCardValue(card:{Suit:Suit,Rank:Rank}):number
export function startNewGame(deckCount:number, playerWins:FSharpOption<number>, enemyWins:FSharpOption<number>):GameState

import Doc from "../WebSharper.UI/WebSharper.UI.Doc"
import GameState from "./Project21Game.GameLogic.GameState"
import Var from "../WebSharper.UI/WebSharper.UI.Var`1"
import { Phase } from "./Project21Game.Client.Phase"
import Suit from "./CardTypes.Suit"
import Rank from "./CardTypes.Rank"
export function Main():Doc
export function renderGame(state:Var<GameState>, phase:Var<Phase>):Doc
export function drawCardView(card:{Suit:Suit,Rank:Rank}, visible:boolean):Doc
export function cardColor(card:{Suit:Suit,Rank:Rank}):string
export function cardToStr(card:{Suit:Suit,Rank:Rank}):string

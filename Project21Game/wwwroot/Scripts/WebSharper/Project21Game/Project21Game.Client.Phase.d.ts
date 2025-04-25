import GameState from "./Project21Game.GameLogic.GameState"
import Var from "../WebSharper.UI/WebSharper.UI.Var`1"
export function Playing(Item:Var<GameState>):Phase
export let StartScreen:Phase;
export interface StartScreen {
  $:0;
}
export interface Playing {
  $:1;
  $0:Var<GameState>;
}
export type Phase = (StartScreen | Playing)

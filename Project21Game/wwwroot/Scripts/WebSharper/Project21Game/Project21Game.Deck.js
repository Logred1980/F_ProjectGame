import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
import FSharpList from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1.js"
import Random from "../WebSharper.StdLib/System.Random.js"
import { sortBy, concat, replicate } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import $StartupCode_Deck from "./$StartupCode_Deck.js"
export function drawCard(deck){
  return deck.$==1?[Some(deck.$0), deck.$1]:[null, FSharpList.Empty];
}
export function shuffleDeck(deck){
  const rand=new Random();
  return sortBy(() => rand.Next_2(), deck);
}
export function createDecks(nrDeck){
  return concat(replicate(nrDeck, oneDeck()));
}
export function oneDeck(){
  return $StartupCode_Deck.oneDeck;
}

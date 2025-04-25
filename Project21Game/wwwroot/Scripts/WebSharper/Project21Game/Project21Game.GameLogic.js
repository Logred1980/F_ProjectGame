import { length, choose, ofArray } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import { New } from "./Project21Game.GameLogic.GameState.js"
import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
import { drawCard, shuffleDeck, createDecks } from "./Project21Game.Deck.js"
import FSharpList from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1.js"
import { sumBy } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.SeqModule.js"
export function decideWinner(state){
  const playerScore=calcScore(state.PlayerHand);
  const enemyScore=calcScore(state.EnemyHand);
  const playerCards=length(state.PlayerHand);
  const enemyCards=length(state.EnemyHand);
  const isValidScore=(score) => score>=17&&score<=21;
  const p=isValidScore(playerScore)?isValidScore(enemyScore)?playerScore>enemyScore?["You won!!!", state.PlayerWins+1, state.EnemyWins]:enemyScore>playerScore?["Enemy won...", state.PlayerWins, state.EnemyWins+1]:playerCards<enemyCards?["You won!!!", state.PlayerWins+1, state.EnemyWins]:enemyCards<playerCards?["Enemy won...", state.PlayerWins, state.EnemyWins+1]:["Draw!!!", state.PlayerWins+1, state.EnemyWins+1]:["You won!!!", state.PlayerWins+1, state.EnemyWins]:isValidScore(enemyScore)?["Enemy won... ", state.PlayerWins, state.EnemyWins+1]:["There is no winner...", state.PlayerWins, state.EnemyWins];
  return New(state.PlayerHand, state.EnemyHand, state.Deck, true, Some(p[0]), p[1], p[2]);
}
export function drawCardForEnemy(state){
  const m=drawCard(state.Deck);
  return m[0]==null?New(state.PlayerHand, state.EnemyHand, state.Deck, true, state.Winner, state.PlayerWins, state.EnemyWins):New(state.PlayerHand, FSharpList.Cons(m[0].$0, state.EnemyHand), m[1], state.GameOver, state.Winner, state.PlayerWins, state.EnemyWins);
}
export function drawCardForPlayer(state){
  const m=drawCard(state.Deck);
  return m[0]==null?New(state.PlayerHand, state.EnemyHand, state.Deck, true, state.Winner, state.PlayerWins, state.EnemyWins):New(FSharpList.Cons(m[0].$0, state.PlayerHand), state.EnemyHand, m[1], state.GameOver, state.Winner, state.PlayerWins, state.EnemyWins);
}
export function calcScore(hand){
  return sumBy(calcCardValue, hand);
}
export function calcCardValue(card){
  const m=card.Rank;
  return m.$==1?3:m.$==2?4:m.$==3?5:m.$==4?6:m.$==5?7:m.$==6?8:m.$==7?9:m.$==8?10:m.$==9?10:m.$==10?10:m.$==11?10:m.$==12?11:2;
}
export function startNewGame(deckCount, playerWins, enemyWins){
  const p=drawCard(shuffleDeck(createDecks(deckCount)));
  const p_1=drawCard(p[1]);
  const p_2=drawCard(p_1[1]);
  const p_3=drawCard(p_2[1]);
  return New(choose((x) => x, ofArray([p[0], p_1[0]])), choose((x) => x, ofArray([p_2[0], p_3[0]])), p_3[1], false, null, playerWins==null?0:playerWins.$0, enemyWins==null?0:enemyWins.$0);
}

import Var from "../WebSharper.UI/WebSharper.UI.Var.js"
import { StartScreen, Playing } from "./Project21Game.Client.Phase.js"
import Doc from "../WebSharper.UI/WebSharper.UI.Doc.js"
import Attr from "../WebSharper.UI/WebSharper.UI.Attr.js"
import { Handler } from "../WebSharper.UI/WebSharper.UI.Client.Attr.js"
import { startNewGame, calcScore, drawCardForPlayer, drawCardForEnemy, decideWinner } from "./Project21Game.GameLogic.js"
import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
import { map } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import { EmptyAttr } from "../WebSharper.UI/WebSharper.UI.Client.Attrs.js"
import { StartsWith } from "../WebSharper.StdLib/Microsoft.FSharp.Core.StringModule.js"
export function Main(){
  const phase=Var.Create_1(StartScreen);
  return Doc.BindView((currentPhase) => currentPhase.$==1?renderGame(currentPhase.$0, phase):Doc.Element("div", [Attr.Create("class", "d-flex flex-column")], [Doc.Element("h1", [], [Doc.TextNode("F# Game Project")]), Doc.Element("button", [Attr.Create("class", "btn btn-primary mt-3 align-self-start w-auto"), Handler("click", () =>() => phase.Set(Playing(Var.Create_1(startNewGame(1, Some(0), Some(0))))))], [Doc.TextNode("Blackjack")]), Doc.Element("button", [Attr.Create("class", "btn btn-primary mt-3 align-self-start w-auto"), Attr.Create("disabled", "disabled")], [Doc.TextNode("Coming soon...")])]), phase.View);
}
export function renderGame(state, phase){
  return Doc.Element("div", [], [Doc.Element("h2", [], [Doc.TextNode("Blackjack game")]), Doc.Element("div", [Attr.Create("class", "d-flex justify-content-around")], [Doc.Element("div", [], [Doc.Element("h3", [], [Doc.TextNode("Your score:")]), Doc.BindView((st) => Doc.TextNode(String(st.PlayerWins)), state.View), Doc.Element("div", [Attr.Create("class", "card-panel")], [Doc.TextNode("Cards: "), Doc.BindView((st) => Doc.Element("div", [], map((c) => drawCardView(c, true), st.PlayerHand)), state.View)]), Doc.BindView((st) => Doc.Element("div", [Attr.Create("style", "margin-top: 5px;")], [Doc.TextNode("SUM: "+String(calcScore(st.PlayerHand)))]), state.View)]), Doc.Element("div", [], [Doc.Element("h3", [], [Doc.TextNode("Enemy score:")]), Doc.BindView((st) => Doc.TextNode(String(st.EnemyWins)), state.View), Doc.Element("div", [Attr.Create("class", "card-panel")], [Doc.TextNode("Cards: "), Doc.BindView((st) => {
    const visible=st.GameOver;
    return Doc.Element("div", [], map((c) => drawCardView(c, visible), st.EnemyHand));
  }, state.View)]), Doc.BindView((st) => {
    const valueStr=st.GameOver?String(calcScore(st.EnemyHand)):"?";
    return Doc.Element("div", [Attr.Create("style", "margin-top: 5px;")], [Doc.TextNode("SUM: "+valueStr)]);
  }, state.View)])]), Doc.Element("div", [Attr.Create("class", "mt-3")], [Doc.BindView((st) => {
    const disabled=calcScore(st.PlayerHand)>=21||st.GameOver?Attr.Create("disabled", "disabled"):EmptyAttr();
    return Doc.Element("button", [Handler("click", () =>() => {
      const afterPlayer=drawCardForPlayer(state.Get());
      return state.Set(calcScore(afterPlayer.EnemyHand)<17&&!afterPlayer.GameOver?drawCardForEnemy(afterPlayer):afterPlayer);
    }), Attr.Create("class", "btn btn-info me-2"), disabled], [Doc.TextNode("Draw")]);
  }, state.View), Doc.BindView((st) => {
    const disabled=calcScore(st.PlayerHand)<17||st.GameOver?Attr.Create("disabled", "disabled"):EmptyAttr();
    return Doc.Element("button", [Handler("click", () =>() => {
      function enemyTurn(s){
        while(true)
          {
            if(calcScore(s.EnemyHand)<17&&!s.GameOver)s=drawCardForEnemy(s);
            else return s;
          }
      }
      return state.Set(decideWinner(enemyTurn(state.Get())));
    }), Attr.Create("class", "btn btn-success me-2"), disabled], [Doc.TextNode("Pass")]);
  }, state.View), Doc.Element("button", [Handler("click", () =>() => phase.Set(Playing(Var.Create_1(startNewGame(1, Some(state.Get().PlayerWins), Some(state.Get().EnemyWins)))))), Attr.Create("class", "btn btn-warning me-2")], [Doc.TextNode("New Round")]), Doc.Element("button", [Handler("click", () =>() => phase.Set(StartScreen)), Attr.Create("class", "btn btn-danger")], [Doc.TextNode("Game Over")])]), Doc.BindView((st) => {
    const m=st.Winner;
    if(m==null)return Doc.Element("div", [], []);
    else {
      const w=m.$0;
      return Doc.Element("div", [Attr.Create("class", "result-bar "+(StartsWith(w, "You won!!!")?"result-win":"result-lose"))], [Doc.TextNode("Round result: "+w)]);
    }
  }, state.View)]);
}
export function drawCardView(card, visible){
  const display=visible?cardToStr(card):"\ud83c\udca0";
  return Doc.Element("span", [Attr.Create("style", "color: "+(visible?cardColor(card):"gray")+"; font-size: 22px; padding: 5px;")], [Doc.TextNode(display)]);
}
export function cardColor(card){
  const m=card.Suit;
  return m.$==1?"red":m.$==2?"black":m.$==3?"black":"red";
}
export function cardToStr(card){
  const m=card.Rank;
  const m_1=card.Suit;
  return(m.$==1?"3":m.$==2?"4":m.$==3?"5":m.$==4?"6":m.$==5?"7":m.$==6?"8":m.$==7?"9":m.$==8?"10":m.$==9?"J":m.$==10?"Q":m.$==11?"K":m.$==12?"A":"2")+(m_1.$==1?"\u2666":m_1.$==2?"\u2663":m_1.$==3?"\u2660":"\u2665");
}

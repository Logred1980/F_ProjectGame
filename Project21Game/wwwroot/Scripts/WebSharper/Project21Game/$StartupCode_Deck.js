import { ofSeq } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import { delay, collect, map } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.SeqModule.js"
import { Lazy } from "../WebSharper.Core.JavaScript/Runtime.js"
let _c=Lazy((_i) => class $StartupCode_Deck {
  static {
    _c=_i(this);
  }
  static oneDeck;
  static {
    this.oneDeck=ofSeq(delay(() => collect((suit) => map((rank) =>({Suit:suit, Rank:rank}), [{$:0}, {$:1}, {$:2}, {$:3}, {$:4}, {$:5}, {$:6}, {$:7}, {$:8}, {$:9}, {$:10}, {$:11}, {$:12}]), [{$:0}, {$:1}, {$:2}, {$:3}])));
  }
});
export default _c;

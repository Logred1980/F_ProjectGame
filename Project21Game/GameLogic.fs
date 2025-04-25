namespace Project21Game

open WebSharper
open CardTypes
open Deck

[<JavaScript>]
module GameLogic =

    type GameState =
        {
            PlayerHand: Card list
            EnemyHand: Card list
            Deck: Card list
            GameOver: bool
            Winner: string option
            PlayerWins: int
            EnemyWins: int
        }

    let startNewGame (deckCount: int) (playerWins: int option) (enemyWins: int option) : GameState =
        let deck = createDecks deckCount |> shuffleDeck

        let (playerCard1, deck1) = drawCard deck
        let (playerCard2, deck2) = drawCard deck1
        let (enemyCard1, deck3) = drawCard deck2
        let (enemyCard2, deck4) = drawCard deck3

        let pw = defaultArg playerWins 0
        let ew = defaultArg enemyWins 0

        {
            PlayerHand = [playerCard1; playerCard2] |> List.choose id
            EnemyHand = [enemyCard1; enemyCard2] |> List.choose id
            Deck = deck4
            GameOver = false
            Winner = None
            PlayerWins = pw
            EnemyWins = ew
        }

    let calcCardValue card =
        match card.Rank with
        | Two -> 2 | Three -> 3 | Four -> 4 | Five -> 5 | Six -> 6
        | Seven -> 7 | Eight -> 8 | Nine -> 9 | Ten -> 10
        | Jack | Queen | King -> 10
        | Ace -> 11

    let calcScore hand =
        hand |> List.sumBy calcCardValue

    let drawCardForPlayer (state: GameState) : GameState =
        match drawCard state.Deck with
        | Some card, rest ->
            { state with
                PlayerHand = card :: state.PlayerHand 
                Deck = rest }
        | None, _ -> { state with GameOver = true }

    let drawCardForEnemy (state: GameState) : GameState =
        match drawCard state.Deck with
        | Some card, rest ->
            { state with
                EnemyHand = card :: state.EnemyHand
                Deck = rest }
        | None, _ -> { state with GameOver = true }

    let decideWinner (state: GameState) : GameState =
        let playerScore = calcScore state.PlayerHand
        let enemyScore = calcScore state.EnemyHand
        let playerCards = List.length state.PlayerHand
        let enemyCards = List.length state.EnemyHand

        let isValidScore score = score >= 17 && score <= 21

        let result, newPW, newEW =
            match isValidScore playerScore, isValidScore enemyScore with
            | true, false -> "You won!!!", state.PlayerWins + 1, state.EnemyWins
            | false, true -> "Enemy won... ", state.PlayerWins, state.EnemyWins + 1
            | false, false -> "There is no winner...", state.PlayerWins, state.EnemyWins
            | true, true ->
                if playerScore > enemyScore then
                    "You won!!!", state.PlayerWins + 1, state.EnemyWins
                elif enemyScore > playerScore then
                    "Enemy won...", state.PlayerWins, state.EnemyWins + 1
                else
                    if playerCards < enemyCards then
                        "You won!!!", state.PlayerWins + 1, state.EnemyWins
                    elif enemyCards < playerCards then
                        "Enemy won...", state.PlayerWins, state.EnemyWins + 1
                    else
                        "Draw!!!", state.PlayerWins + 1, state.EnemyWins + 1

        { state with GameOver = true; Winner = Some result; PlayerWins = newPW; EnemyWins = newEW }



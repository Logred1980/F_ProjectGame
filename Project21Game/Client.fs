namespace Project21Game

open WebSharper
open WebSharper.UI
open WebSharper.UI.Html
open WebSharper.UI.Client
open WebSharper.UI.Templating
open WebSharper.UI.Notation

open CardTypes
open GameLogic

[<JavaScript>]
module Templates =
    type MainTemplate = Template<"Main.html", ClientLoad.FromDocument, ServerLoad.WhenChanged>

[<JavaScript>]
module Client =

    type Phase =
        | StartScreen
        | Playing of Var<GameState>

    let cardToStr (card: Card) =
        let r = match card.Rank with
                | Two -> "2" | Three -> "3" | Four -> "4" | Five -> "5"
                | Six -> "6" | Seven -> "7" | Eight -> "8" | Nine -> "9"
                | Ten -> "10" | Jack -> "J" | Queen -> "Q" | King -> "K" | Ace -> "A"
        let s = match card.Suit with
                | Hearts -> "♥" | Diamonds -> "♦" | Clubs -> "♣" | Spades -> "♠"
        r + s

    let cardColor (card: Card) =
        match card.Suit with
        | Hearts | Diamonds -> "red"
        | Clubs | Spades -> "black"

    let drawCardView (card: Card) (visible: bool) =
        let display = if visible then cardToStr card else "🂠"
        let color = if visible then cardColor card else "gray"
        span [ attr.style $"color: {color}; font-size: 22px; padding: 5px;" ] [ text display ]

    let renderGame (state: Var<GameState>) (phase: Var<Phase>) =
        div [] [
            h2 [] [ text "Blackjack game" ]

            div [ attr.``class`` "d-flex justify-content-around" ] [

                div [] [
                    h3 [] [ text "Your score:" ]
                    Doc.BindView (fun st -> text (string st.PlayerWins)) state.View
                    div [ attr.``class`` "card-panel" ] [
                        text "Cards: "
                        Doc.BindView (fun st -> div [] (st.PlayerHand |> List.map (fun c -> drawCardView c true))) state.View
                    ]
                    Doc.BindView (fun st ->
                        div [ attr.style "margin-top: 5px;" ] [
                            text $"SUM: {calcScore st.PlayerHand}"
                        ]
                    ) state.View
                ]

                div [] [
                    h3 [] [ text "Enemy score:" ]
                    Doc.BindView (fun st -> text (string st.EnemyWins)) state.View
                    div [ attr.``class`` "card-panel" ] [
                        text "Cards: "
                        Doc.BindView (fun st ->
                            let visible = st.GameOver
                            div [] (st.EnemyHand |> List.map (fun c -> drawCardView c visible))
                        ) state.View
                    ]
                    Doc.BindView (fun st ->
                        let valueStr = if st.GameOver then string (calcScore st.EnemyHand) else "?"
                        div [ attr.style "margin-top: 5px;" ] [
                            text ("SUM: " + valueStr)
                        ]
                    ) state.View
                ]
            ]

            div [ attr.``class`` "mt-3" ] [
                Doc.BindView (fun st ->
                    let disabled =
                        if calcScore st.PlayerHand >= 21 || st.GameOver then
                            attr.disabled "disabled"
                        else
                            Attr.Empty

                    button [
                        on.click (fun el ev ->
                            let afterPlayer = drawCardForPlayer (!state)
                            let afterEnemy =
                                if calcScore afterPlayer.EnemyHand < 17 && not afterPlayer.GameOver then
                                    drawCardForEnemy afterPlayer
                                else afterPlayer
                            state.Value <- afterEnemy
                        )
                        attr.``class`` "btn btn-info me-2"
                        disabled
                        ] [ text "Draw" ]
                    ) state.View

                Doc.BindView (fun st ->
                    let disabled =
                        if calcScore st.PlayerHand < 17 || st.GameOver then
                            attr.disabled "disabled"
                        else
                            Attr.Empty

                    button [
                        on.click (fun el ev ->
                            let rec enemyTurn s =
                                if calcScore s.EnemyHand < 17 && not s.GameOver then
                                    enemyTurn (drawCardForEnemy s)
                                else s
                            let final = !state |> enemyTurn |> decideWinner
                            state.Value <- final
                        )
                        attr.``class`` "btn btn-success me-2"
                        disabled
                        ] [ text "Pass" ]
                    ) state.View

                (*button [ on.click (fun el ev ->
                    let shuffled = shuffleDeck (!state).Deck
                    state := { !state with Deck = shuffled }
                ); attr.``class`` "btn btn-secondary me-2" ] [ text "Deck Shuffling" ]*)

                button [ on.click (fun el ev ->
                    let newGame = Var.Create (startNewGame 1 (Some (!state).PlayerWins) (Some (!state).EnemyWins))
                    phase.Value <- Playing newGame
                ); attr.``class`` "btn btn-warning me-2" ] [ text "New Round" ]

                button [ on.click (fun el ev ->
                    phase.Value <- StartScreen
                ); attr.``class`` "btn btn-danger" ] [ text "Game Over" ]
            ]

            Doc.BindView (fun st ->
                match st.Winner with
                | Some w ->
                    let resultColorClass =
                        if w.StartsWith("You won!!!") then "result-win"
                        else "result-lose"
                    div [ attr.``class`` ("result-bar " + resultColorClass) ] [
                        text $"Round result: {w}"
                    ]
                | None -> div [] []
            ) state.View
        ]

    let Main () =
        let phase = Var.Create StartScreen

        Doc.BindView (fun currentPhase ->
            match currentPhase with
            | StartScreen ->
                div [ attr.``class`` "d-flex flex-column" ] [
                    h1 [] [ text "F# Game Project" ]
                    button [
                        attr.``class`` "btn btn-primary mt-3 align-self-start w-auto"
                        on.click (fun el ev ->
                            let gs = Var.Create (startNewGame 1 (Some 0) (Some 0))
                            phase.Value <- Playing gs
                        )
                    ] [ text "Blackjack" ]
                    button [
                        attr.``class`` "btn btn-primary mt-3 align-self-start w-auto"
                        attr.disabled "disabled"
                    ] [ text "Coming soon..." ]
                ]
            | Playing state ->
                renderGame state phase
        ) phase.View

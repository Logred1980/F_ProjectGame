namespace Project21Game

open System
open WebSharper
open CardTypes

[<JavaScript>]
module Deck =

    let oneDeck : Card list =
        [ for suit in [ Hearts; Diamonds; Clubs; Spades ] do
            for rank in [Two; Three; Four; Five; Six; Seven; Eight; Nine; Ten; Jack; Queen; King; Ace] do
              yield { Suit = suit; Rank = rank } ]

    let createDecks (nrDeck: int) : Card list =
        List.replicate nrDeck oneDeck |> List.concat
    
    let shuffleDeck (deck: Card list) : Card list = 
        let rand = Random()
        deck |> List.sortBy (fun _ -> rand.Next())

    let drawCard (deck: Card list) : Card option * Card list =
        match deck with
        | [] -> (None, [])
        | x::xs -> (Some x, xs)

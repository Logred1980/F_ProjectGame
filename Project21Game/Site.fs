namespace Project21Game

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/game">] Game
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Html

    let MenuBar (ctx: Context<EndPoint>) endpoint : Doc list =
        let ( => ) txt act =
            let isActive = if endpoint = act then "nav-link active" else "nav-link"
            li [attr.``class`` "nav-item"] [
                a [
                    attr.``class`` isActive
                    attr.href (ctx.Link act)
                ] [text txt]
            ]
        [
            "Home" => EndPoint.Home
            "Game" => EndPoint.Game
            "About" => EndPoint.About
        ]

    let Main ctx action (title: string) (body: Doc list) =
        Templates.MainTemplate()
            .Title(title)
            .MenuBar(MenuBar ctx action)
            .Body(body)
            .Doc()

module Site =
    open WebSharper.UI.Html

    open type WebSharper.UI.ClientServer

    let HomePage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.Home "Home" [
                h1 [] [text "Welcome"]
                h2 [] [text "to my F# study page!"]
                div [] [text "This is my study starter project."]
                div [] [text "Try the game menu item!"]
                p [] [text "Have a good game!"]
            ], 
            Bundle = "home"
        )
    let GamePage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.Game "Game" [
                div [] [client (Client.Main())]
            ],
            Bundle = "game"
        )

    let AboutPage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.About "About" [
                h1 [] [text "About this projekt"]
                div [] [text "This website is a project submitted for an F# course."]
                div [] [text "As of April 2025, it contains only one Blackjack game."]
                div [] [text "Further development is expected..."]
                div [] [text " "]
            ], 
            Bundle = "about"
        )

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
            | EndPoint.Game -> GamePage ctx
            | EndPoint.About -> AboutPage ctx
        )


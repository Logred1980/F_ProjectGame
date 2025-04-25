module CardTypes

    type Suit = 
        Hearts | Diamonds | Clubs | Spades
    type Rank = 
        | Two | Three | Four | Five | Six | Seven | Eight | Nine | Ten 
        | Jack | Queen | King | Ace
        
    type Card = { Suit: Suit; Rank: Rank }
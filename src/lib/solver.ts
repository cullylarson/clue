export enum PlayerCardState {
    Unknown,
    Maybe,
    Yes,
    No,
}

export enum Card {
    // characters
    White = 'White',
    Scarlet = 'Scarlet',
    Mustard = 'Mustard',
    Green = 'Green',
    Peacock = 'Peacock',
    Plum = 'Plum',

    // weapons
    Revolver = 'Revolver',
    Dagger = 'Dagger',
    Pipe = 'Pipe',
    Rope = 'Rope',
    Candlestick = 'Candlestick',
    Wrench = 'Wrench',

    // rooms
    Kitchen = 'Kitchen',
    Ballroom = 'Ballroom',
    Conservatory = 'Conservatory',
    DiningRoom = 'DiningRoom',
    BilliardRoom = 'BilliardRoom',
    Library = 'Library',
    Lounge = 'Lounge',
    Hall = 'Hall',
    Study = 'Study',
}

export enum ClaimAnswer {
    Yes,
    No,
}

interface Claim {
    cards: Array<Card>,
    refuter: string,
    answer: ClaimAnswer,
    cardShown: Card | null,
}

interface Game {
    me: string,
    myCards: Array<Card>,
    players: Array<string>,
    claims: Array<Claim>,
}

export enum SolutionState {
    InPlay,
    InPacket,
    Unknown,
}

interface SolutionResultPlayers {
    [key: string]: PlayerCardState,
}

interface SolutionResult {
    state: SolutionState,
    players: SolutionResultPlayers,
}

interface Solution {
    [key: string]: SolutionResult,
}

// assume the first player is 'me'
export const newGame = (players: Array<string>, myCards: Array<Card>, me: string): Game => ({
    players,
    me,
    myCards,
    claims: [],
})

export const addClaim = (claim: Claim) => (game: Game): Game => ({
    ...game,
    claims: [
        ...game.claims,
        claim,
    ],
})

export const getSolution = (game: Game): Solution => {
    const createEmptySolutionResult = (players: Array<string>): SolutionResult => ({
        state: SolutionState.Unknown,
        players: players.reduce((acc, player) => ({
            ...acc,
            [player]: PlayerCardState.Unknown,
        }), {}),
    })

    const setSolutionState = (solution: Solution): Solution => {
        // at least one player has the card
        const haveYes = (players: SolutionResultPlayers): boolean => {
            for(const playerCardState of Object.values(players)) {
                if(playerCardState === PlayerCardState.Yes) return true
            }

            return false
        }

        // no player has the card
        const allNo = (players: SolutionResultPlayers): boolean => {
            for(const playerCardState of Object.values(players)) {
                if(playerCardState !== PlayerCardState.No) return false
            }

            return true
        }

        const solutionCopy = {...solution}

        for(const [card, solutionResult] of Object.entries(solutionCopy)) {
            // someone has the card
            if(haveYes(solutionResult.players)) {
                solutionCopy[card].state = SolutionState.InPlay
            }
            else if(allNo(solutionResult.players)) {
                solutionCopy[card].state = SolutionState.InPacket
            }
            else {
                solutionCopy[card].state = SolutionState.Unknown
            }
        }

        return solutionCopy
    }

    // sets the indicated player's card state to yes and all other players card state to no
    const setPlayerCardStateYes = (playerName: string, players: SolutionResultPlayers): SolutionResultPlayers => {
        const playersCopy = {...players}

        for(const thisPlayerName of Object.keys(players)) {
            playersCopy[thisPlayerName] = thisPlayerName === playerName ? PlayerCardState.Yes : PlayerCardState.No
        }

        return playersCopy
    }

    const setMyCards = (game: Game) => (solution: Solution): Solution => {
        const solutionCopy = {...solution}

        for(const card of Object.values(Card)) {
            const isMine = game.myCards.includes(card)

            solutionCopy[card] = {
                // no need to set the state since it will be set in a later step
                ...solutionCopy[card],
                players: isMine
                    ? setPlayerCardStateYes(game.me, solutionCopy[card].players)
                    : {
                        ...solutionCopy[card].players,
                        [game.me]: PlayerCardState.No,
                    },
            }
        }

        return solutionCopy
    }

    // the solution with all of the answers for each player shown, but the solution state not yet set
    const setAnswers = (game: Game): Solution => game.claims.reduce((acc, claim) => {
        if(claim.answer === ClaimAnswer.Yes) {
            if(claim.cardShown === null) {
                // mark each card as maybe
                for(const card of claim.cards) {
                    acc[card].players[claim.refuter] = PlayerCardState.Maybe
                }

                return acc
            }
            else {
                // mark the card shown
                acc[claim.cardShown].players[claim.refuter] = PlayerCardState.Yes

                return acc
            }
        }
        else {
            // make each card as no
            for(const card of claim.cards) {
                acc[card].players[claim.refuter] = PlayerCardState.No
            }

            return acc
        }
    }, {
        [Card.White]: createEmptySolutionResult(game.players),
        [Card.Scarlet]: createEmptySolutionResult(game.players),
        [Card.Mustard]: createEmptySolutionResult(game.players),
        [Card.Green]: createEmptySolutionResult(game.players),
        [Card.Peacock]: createEmptySolutionResult(game.players),
        [Card.Plum]: createEmptySolutionResult(game.players),

        // weapons
        [Card.Revolver]: createEmptySolutionResult(game.players),
        [Card.Dagger]: createEmptySolutionResult(game.players),
        [Card.Pipe]: createEmptySolutionResult(game.players),
        [Card.Rope]: createEmptySolutionResult(game.players),
        [Card.Candlestick]: createEmptySolutionResult(game.players),
        [Card.Wrench]: createEmptySolutionResult(game.players),

        // rooms
        [Card.Kitchen]: createEmptySolutionResult(game.players),
        [Card.Ballroom]: createEmptySolutionResult(game.players),
        [Card.Conservatory]: createEmptySolutionResult(game.players),
        [Card.DiningRoom]: createEmptySolutionResult(game.players),
        [Card.BilliardRoom]: createEmptySolutionResult(game.players),
        [Card.Library]: createEmptySolutionResult(game.players),
        [Card.Lounge]: createEmptySolutionResult(game.players),
        [Card.Hall]: createEmptySolutionResult(game.players),
        [Card.Study]: createEmptySolutionResult(game.players),
    })

    const solutionWithAnswers = setAnswers(game)
    const solutionWithMyCards = setMyCards(game)(solutionWithAnswers)
    const solutionWithState = setSolutionState(solutionWithMyCards)

    return solutionWithState
}

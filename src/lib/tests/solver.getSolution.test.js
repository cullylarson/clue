import {newGame, addClaim, Card, getSolution, ClaimAnswer, SolutionState, PlayerCardState} from '../solver'

test('Gets a simple solution.', () => {
    const players = ['a', 'b']

    const myCards = [Card.Candlestick, Card.White, Card.Ballroom]

    const solution = newGame(players, myCards, 'a')
        |> addClaim({
            cards: [Card.Revolver, Card.Kitchen, Card.Plum],
            refuter: 'b',
            answer: ClaimAnswer.No,
            cardShown: null,
        })
        |> getSolution

    expect(solution).toEqual({
        [Card.White]: {
            state: SolutionState.InPlay,
            players: {
                a: PlayerCardState.Yes,
                b: PlayerCardState.No,
            },
        },
        [Card.Scarlet]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Mustard]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Green]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Peacock]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Plum]: {
            state: SolutionState.InPacket,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.No,
            },
        },

        // weapons
        [Card.Revolver]: {
            state: SolutionState.InPacket,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.No,
            },
        },
        [Card.Dagger]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Pipe]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Rope]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Candlestick]: {
            state: SolutionState.InPlay,
            players: {
                a: PlayerCardState.Yes,
                b: PlayerCardState.No,
            },
        },
        [Card.Wrench]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },

        // rooms
        [Card.Kitchen]: {
            state: SolutionState.InPacket,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.No,
            },
        },
        [Card.Ballroom]: {
            state: SolutionState.InPlay,
            players: {
                a: PlayerCardState.Yes,
                b: PlayerCardState.No,
            },
        },
        [Card.Conservatory]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.DiningRoom]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.BilliardRoom]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Library]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Lounge]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Hall]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
        [Card.Study]: {
            state: SolutionState.Unknown,
            players: {
                a: PlayerCardState.No,
                b: PlayerCardState.Unknown,
            },
        },
    })
})

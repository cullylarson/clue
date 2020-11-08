import {newGame, addClaim, Card, ClaimAnswer} from '../solver'

test('Adds a claim.', () => {
    const claim = {
        cards: [Card.Revolver, Card.Ballroom],
        refuter: 'b',
        answer: ClaimAnswer.Yes,
        cardShown: Card.White,
    }

    const players = ['a', 'b']

    const myCards = [Card.Candlestick]

    const game = newGame(players, myCards, 'a')

    expect(addClaim(claim)(game)).toEqual({
        me: 'a',
        players,
        myCards,
        claims: [
            claim,
        ],
    })
})

const PkSocket = require('../common/pk_socket')
const game = require('../common/game')
const events = {
  event_battle_score: require('./event_battle_score'),
  event_battle_start: require('./event_battle_start'),
  event_round_result: require('./event_round_result'),
  event_someone_join: require('./event_someone_join')
}

module.exports = async players => {
  const rooms = await Promise.all([
    game(players[0], {master: true}),
    game(players[1])
  ])
  rooms.map(room => new PkSocket({
    ...room,
    address: rooms[0].address,
    theme_id: rooms[0].theme_id,
    events
  }))
}

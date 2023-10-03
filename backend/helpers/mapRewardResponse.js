// map rewards response shape that is sent to the client
const mapRewardResponse = (reward) => {
  const { availableAt, redeemedAt, expiresAt } = reward
  return { availableAt, redeemedAt, expiresAt }
}

module.exports = mapRewardResponse
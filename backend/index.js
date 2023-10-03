const express = require('express')
const app = express()
const port = 3000

const getData = require('./helpers/getData')
const overwriteData = require('./helpers/overwriteData')
const isValidDateString = require('./helpers/isValidDateString')
const getDatesOfTheWeek = require('./helpers/getDatesOfTheWeek')
const getNextDate = require('./helpers/getNextDate')
const formatDDMMYYYY = require('./helpers/formatDDMMYYYY')
const mapRewardResponse = require('./helpers/mapRewardResponse')

const sendError = (res, message, statusCode = 400) => {
  return res.status(statusCode).send({
    error: {
      message
    }
  })
}

app.get('/users/:id/rewards', async (req, res) => {
  const { id } = req.params
  const { at } = req.query

  if(!at) {
    return sendError(res, 'Please specify date using "at" query parameter')
  }

  if(!isValidDateString(at))
    return sendError(res, 'Invalid date')

  const date = new Date(at)
  const allUsers = await getData('users.json')
  const allRewards = await getData('rewards.json')
  const existingUser = allUsers.find(user => user.id === id)

  const datesOfTheWeek = getDatesOfTheWeek(date)
  const newUser = { id }

  const rewards = datesOfTheWeek.map(dateString => {
    return {
      userId: newUser.id,
      availableAt: dateString,
      redeemedAt: null,
      expiresAt: getNextDate(new Date(dateString))
    }
  })

  if(!existingUser) {

    await overwriteData('users.json', [...allUsers, newUser])
    await overwriteData('rewards.json', [...allRewards, ...rewards])
    return res.send({
      data: rewards.map(reward => mapRewardResponse(reward))
    })
  } else {
    const datesOfTheWeek = getDatesOfTheWeek(date)
    const existingRewards = allRewards.filter(reward => {
      return datesOfTheWeek.map(date => formatDDMMYYYY(date)).includes(formatDDMMYYYY(reward.availableAt))
    })

    if(existingRewards.length > 0) {
      return res.send({
        data: existingRewards.map(reward => mapRewardResponse(reward))
      })
    } else {
      await overwriteData('rewards.json', [...allRewards, ...rewards])
      return res.send({
        data: rewards.map(reward => mapRewardResponse(reward))
      })
    }
  }
})

app.patch('/users/:id/rewards/:date/redeem', async (req, res) => {
  const { id, date } = req.params

  const currentTime = new Date()

  if(!isValidDateString(date))
    return sendError(res, 'Invalid date')

  const allRewards = await getData('rewards.json')

  const rewardIdx = allRewards.findIndex(reward => {
    return reward.userId === id && formatDDMMYYYY(reward.availableAt) === formatDDMMYYYY(date)
  })

  if(rewardIdx === -1)
    return sendError(res, 'Reward not found', 404)

  if(allRewards[rewardIdx].redeemedAt !== null)
    return sendError(res, 'This reward is already redeemed', 409)

  if(currentTime > new Date(allRewards[rewardIdx].expiresAt))
    return sendError(res, 'This reward is already expired', 410)

  allRewards[rewardIdx].redeemedAt = currentTime.toISOString()

  await overwriteData('rewards.json', allRewards)

  return res.send({
    data: mapRewardResponse(allRewards[rewardIdx])
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
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

  // if date (at query parameter) is not specified
  if(!at) {
    return sendError(res, 'Please specify date using "at" query parameter')
  }

  if(!isValidDateString(at))
    return sendError(res, 'Invalid date')

  const date = new Date(at)
  // get all the users and rewards data and check for existing user
  const allUsers = await getData('users.json')
  const allRewards = await getData('rewards.json')
  const existingUser = allUsers.find(user => user.id === id)

  // get dates of the week for the specified date
  const datesOfTheWeek = getDatesOfTheWeek(date)
  const newUser = { id }

  // create rewards data
  const rewards = datesOfTheWeek.map(dateString => {
    return {
      userId: newUser.id,
      availableAt: dateString,
      redeemedAt: null,
      expiresAt: getNextDate(new Date(dateString)).toISOString()
    }
  })

  if(!existingUser) {
    // if user does not exist, add the user and rewards to the data store
    await overwriteData('users.json', [...allUsers, newUser])
    await overwriteData('rewards.json', [...allRewards, ...rewards])

    // return the rewards data without the userId property
    return res.send({
      data: rewards.map(reward => mapRewardResponse(reward))
    })
  } else {
    // if user exists, check if rewards exist first
    const existingRewards = allRewards.filter(reward => {
      return datesOfTheWeek.map(date => formatDDMMYYYY(date)).includes(formatDDMMYYYY(reward.availableAt))
    })

    if(existingRewards.length > 0) {
      // if rewards exist (for that week), just return the rewards without the userId property
      return res.send({
        data: existingRewards.map(reward => mapRewardResponse(reward))
      })
    } else {
      // if rewards don't exist, save them to the data store
      await overwriteData('rewards.json', [...allRewards, ...rewards])
      // return the rewards without the userId property
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

  // get all the rewards first from the data store
  const allRewards = await getData('rewards.json')

  // look for the reward with the available date as the id
  const rewardIdx = allRewards.findIndex(reward => {
    return reward.userId === id && formatDDMMYYYY(reward.availableAt) === formatDDMMYYYY(date)
  })

  // if the reward is not found, send appropriate error message and and status code
  if(rewardIdx === -1)
    return sendError(res, 'Reward not found', 404)

  // if the reward is already redeemed, send appropriate error message and and status code
  if(allRewards[rewardIdx].redeemedAt !== null)
    return sendError(res, 'This reward is already redeemed', 409)

  // if the reward is already expired, send appropriate error message and and status code
  if(currentTime > new Date(allRewards[rewardIdx].expiresAt))
    return sendError(res, 'This reward is already expired', 410)

  // if everything is ok, update the reward, set the redeemedAt property
  allRewards[rewardIdx].redeemedAt = currentTime.toISOString()

  // save it
  await overwriteData('rewards.json', allRewards)

  // return it
  return res.send({
    data: mapRewardResponse(allRewards[rewardIdx])
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
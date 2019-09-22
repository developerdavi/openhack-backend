const { testAI, compare, train } = require('../TeamMatchingAI')
const users = require('../Model/users')
const Teams = require('../Model/teams')

function arr_diff(a1, a2) {
  let xa1 = []
  let xa2 = []

  for (let i = 0; i < a1.length; i++) {
    const element = a1[i]
    if (element) xa1.push(element._id || element)
  }

  for (let i = 0; i < a2.length; i++) {
    const element = a2[i]
    if (element) xa2.push(element._id || element)
  }

  let result = a1
    .filter(x => !xa2.includes(x._id))
    .concat(
      a2.filter(x => {
        if (x) {
          if (x._id) return !xa1.includes(x._id)
          return !xa1.includes(x)
        }
        return false
      })
    )

  return result
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const getCommonMatch = matches => {
  let chosen = []
  let better = { match: 0, user: {} }

  for (let member in matches) {
    // console.log(`MEMBER: ${member}`)
    if (!chosen[member]) chosen[member] = []
    chosen[member].push(matches[member])
  }

  // console.log(`chosen.length: ${chosen.length} | matches.length: ${matches.length}`)
  // console.log(matches)

  for (let i in chosen) {
    const user = chosen[i]

    // console.log(user)

    let sum = 0

    for (let j = 0; j < user.length; j++) {
      sum += user[j].match
    }

    // console.log(sum)

    if (sum > better.match) better = { match: sum, user: user[0] }
  }

  // console.log(better)
  return better
}

const teamMatching = async () => {
  const teams = []
  const matched = []
  let participants = await users.find({ type: 'participant' })
  participants = shuffle(participants)

  let not_matched = arr_diff(participants, matched)

  await Teams.deleteMany()

  while (not_matched.length > 0) {
    const user = not_matched[0]
    matched.push(user._id)
    const team = { number: teams.length + 1, members: [], matchRate: 0 }
    team.members.push(user)

    // console.log(user)

    not_matched = arr_diff(participants, matched)

    let matching_rate = 0
    let other_users = []
    let random_users = []
    let random = Number.parseInt(Math.random() * not_matched.length)

    if (random + 15 > not_matched.length) {
      if (random - 15 < 0) {
        random = 0
      } else {
        random -= 15
      }
    }

    // console.log(`RANDOM = ${random}`)

    random_users = not_matched.slice(random, random + 15)

    // console.log(random_users)

    
    for (let x = 0; x < team.members.length; x++) {
      let member = await team.members[x]
      
      let matches = {}

      if (team.members.length == 5 || not_matched.length == 0) break

      for (let i = 0; i < random_users.length; i++) {
        let other_user = await random_users[i]

        if (!other_user.tech_info) {
          if (other_user.user) other_user = other_user.user
          else continue
        } else if (!member.tech_info) {
          if (member.user) member = member.user
          else continue
        }

        if (matched.includes(other_user._id)) continue

        let match = await compare(member, other_user)

        // console.log(match)

        if (!matches[other_user._id]) matches[other_user._id] = {}

        matches[other_user._id] = { match, user: other_user }
      }

      let better = getCommonMatch(matches).user

      random_users = random_users.filter(v => v._id != better._id)

      matched.push(better.user._id)
      other_users.push(better.user)
      matching_rate += better.match
      team.members.push(better.user)

      not_matched = arr_diff(participants, matched)
    }

    for (let i = 0; i < team.members.length; i++) {
      team.members[i] = team.members[i]._id
    }

    team.matchRate = matching_rate

    teams.push(team)
  }

  // console.log('FINISHED', teams)

  await Teams.create(teams)

  return teams
}

module.exports = {
  test: async (req, res) => {
    let docs = await users.find({ type: 'participant' })

    testAI(docs).then(data => {
      res.json({ original: docs, results: data })
    })
  },
  match: async (req, res) => {
    await train()

    res.json(await teamMatching())
  }
}

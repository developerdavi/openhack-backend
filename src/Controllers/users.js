const users = require('../Model/users')

module.exports = {
  index: async (req, res) => {
    const docs = await users.find()

    res.json({ data: docs })
  },
  get: async (req, res) => {
    const { id } = req.params

    try {
      const user = await users.findById(id)
      res.json(user)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  create: async (req, res) => {
    const user = req.body

    try {
      await users.create(user)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  update: async (req, res) => {
    const user = req.body

    user.updatedAt = undefined

    try {
      await users.findByIdAndUpdate(user._id, user)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await users.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  createRandomUsers: async (req, res) => {
    const names = [
      'Maria',
      'José',
      'João',
      'Lucas',
      'Aaron',
      'John',
      'Steve',
      'Bill',
      'Donald',
      'Michael',
      'Jack',
      'Gabriel',
      'Luana',
      'Alexandre',
      'Luke'
    ]

    const languages = ['Javascript', 'PHP', 'C++', 'C#', 'C', 'Python', 'Java']

    const areas = ['back-end', 'front-end', 'ux', 'ui', 'business']

    const all_users = []

    for (let i = 0; i < 50; i++) {
      let new_user = {}
      new_user.type = 'participant'
      new_user.name = names[Number.parseInt(Math.random() * names.length)]
      new_user.email = `${new_user.name}${Number.parseInt(
        Math.random() * 51
      )}${Number.parseInt(Math.random() * 25)}@${
        Math.random() > 0.5 ? 'shawee' : 'gmail'
      }.com`
      new_user.tech_info = {}
      new_user.tech_info.programmingLanguages = []

      for (let i = 0; i < 2; i++) {
        let random = Number.parseInt(Math.random() * languages.length)
        if (
          !new_user.tech_info.programmingLanguages.includes(languages[random])
        ) {
          new_user.tech_info.programmingLanguages[i] = languages[random]
        } else {
          while (
            new_user.tech_info.programmingLanguages.includes(languages[random])
          ) {
            random = Number.parseInt(Math.random() * languages.length)
          }
          new_user.tech_info.programmingLanguages[i] = languages[random]
        }
      }

      let random = Number.parseInt(Math.random() * areas.length)
      new_user.tech_info.area = areas[random]
      new_user.tech_info.experience = Number.parseInt(Math.random() * (10 + 1))
      new_user.tech_info.interest = Math.random() > 0.5 ? 'Win' : 'Learn'

      all_users.push(new_user)
    }

    await users.create(all_users)
    
    res.json(await users.find())
  },
  deleteMassive: async (req, res) => {
    await users.deleteMany({ _id: { $ne: '5d815f0267e40639871c3250' } })
    res.sendStatus(204)
  }
}

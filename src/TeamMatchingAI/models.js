const tf = require('@tensorflow/tfjs')

const GENERATIONS = 700

class ExperienceAI {
  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 1,
      inputShape: [1],
      activation: 'hardSigmoid'
    }))

    model.add(tf.layers.dense({
      units: 4,
      activation: 'linear'
    }))

    model.add(tf.layers.dense({
      units: 2,
      activation: 'linear'
    }))

    model.add(tf.layers.dense({
      units: 1
    }))

    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'sgd'
    })

    return model
  }

  train() {
    const model = this.compile()

    // input layer
    const xs = tf.tensor([
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10],
      [0]
    ], [12, 1])

    // output layer
    const ys = tf.tensor([
      [0],
      [0],
      [0.3],
      [0.4],
      [0.5],
      [0.6],
      [0.7],
      [1],
      [1],
      [1],
      [1],
      [0]
    ], [12, 1])

    return new Promise(async resolve => {
      let loss = 0
      console.log('[ExperienceAI] Training')
      for (let index = 0; index < GENERATIONS; index++) {
        const response = await model.fit(xs, ys, { shuffle: true })
        loss = response.history.loss[0]
      }
      console.log('[ExperienceAI] Finished training')
      console.log('[ExperienceAI] Loss = ' + loss)
      this.model = model
      resolve(loss)
    })
  }

  run(_data) {
    if (!this.model) {
      console.log('MODEL NOT FOUND')
      return 0
    }
    const model = this.model
    return new Promise(resolve => {
      const data = tf.tensor2d([_data])
      const prediction = model.predict(data)
      resolve(prediction.dataSync())
    })
  }
}
class LanguagesAI {
  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 1,
      inputShape: [1],
      activation: 'hardSigmoid'
    }))

    model.add(tf.layers.dense({
      units: 4,
      activation: 'linear'
    }))

    model.add(tf.layers.dense({
      units: 2,
      activation: 'linear'
    }))

    model.add(tf.layers.dense({
      units: 1
    }))

    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'sgd'
    })

    return model
  }

  async train() {
    const model = this.compile()

    // input layer
    const xs = tf.tensor([
      [1],
      [0],
    ], [2, 1])

    // output layer
    const ys = tf.tensor([
      [1],
      [0],
    ], [2, 1])

    return new Promise(async resolve => {
      let loss = 0
      console.log('[LanguagesAI] Training')
      for (let index = 0; index < GENERATIONS; index++) {
        const response = await model.fit(xs, ys, { shuffle: true })
        loss = response.history.loss[0]
      }
      console.log('[LanguagesAI] Finished training')
      console.log('[LanguagesAI] Loss = ' + loss)
      this.model = model
      resolve(loss)
    })
  }

  run(_data) {
    return new Promise(resolve => {
      const data = tf.tensor2d([_data])
      const prediction = this.model.predict(data)
      resolve(prediction.dataSync())
    })
  }
}

module.exports = { ExperienceAI, LanguagesAI }
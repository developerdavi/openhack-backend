const tf = require('@tensorflow/tfjs')

class ExperienceAI {
  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 4,
      inputShape: [1],
      activation: 'hardSigmoid'
    }))

    model.add(tf.layers.dense({
      units: 4,
      inputShape: [1],
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
      [1],
      [0.8],
      [.7],
      [0.6],
      [0.5],
      [0.4],
      [0.3],
      [0],
      [0],
      [0],
      [0],
      [1]
    ], [12, 1])

    return new Promise(async resolve => {
      for (let index = 0; index < 1000; index++) {
        const response = await model.fit(xs, ys, { shuffle: true })
        console.log(response.history.loss)
      }
      this.model = model
      resolve()
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

class CompareAI {
  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 4,
      inputShape: [1],
      activation: 'hardSigmoid'
    }))

    model.add(tf.layers.dense({
      units: 4,
      inputShape: [1],
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
      [1],
      [0.8],
      [.7],
      [0.6],
      [0.5],
      [0.4],
      [0.3],
      [0],
      [0],
      [0],
      [0],
      [1]
    ], [12, 1])

    return new Promise(async resolve => {
      for (let index = 0; index < 10000; index++) {
        const response = await model.fit(xs, ys, { shuffle: true })
        console.log(response.history.loss)
      }
      this.model = model
      resolve()
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

module.exports = { ExperienceAI, CompareAI }
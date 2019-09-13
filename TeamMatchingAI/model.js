const tf = require('@tensorflow/tfjs-node')

class LanguagesAI {

  constructor(data) {
    this.data = data
  }

  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 4,
      inputShape: [2]
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

  run() {
    const model = this.compile()

    // 1 = JS
    // 2 = Python
    // 3 = PHP

    // input layer
    const xs = tf.tensor2d([
      [1, 2],
      [1, 1],
      [1, 3],
      [2, 2],
      [2, 3],
      [3, 3]
    ])

    // output layer
    const ys = tf.tensor2d([
      0, 1, 0, 1, 0, 1
    ])

    model.fit(xs, ys, {
      epochs: 1
    }).then(() => {
      
      const data = tf.tensor2d([this.data])

      const prediction = model.predict(data)
      return prediction

    })
  }
}

module.exports = { LanguagesAI }
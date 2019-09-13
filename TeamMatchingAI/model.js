const tf = require('@tensorflow/tfjs')

class ExperienceAI {

  constructor(data) {
    this.data = data
  }

  compile() {
    const model = tf.sequential()

    model.add(tf.layers.dense({
      units: 1,
      inputShape: [1]
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
      [10]
    ], [11, 1])

    // output layer
    const ys = tf.tensor([
      [10],
      [9.5],
      [9],
      [8.5],
      [0.6],
      [0.5],
      [0.4],
      [0],
      [0],
      [0],
      [0]
    ], [11, 1])

    return new Promise (resolve => {
      model.fit(xs, ys, {
        epochs: 200
      }).then(async () => {
        
        const data = tf.tensor2d([this.data])
  
        const prediction = model.predict(data)
        resolve(prediction.dataSync())
  
      })
    })

  }
}

module.exports = { ExperienceAI }
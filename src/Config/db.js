// MONGODB
const mongoose = require('mongoose')

var db = mongoose.connection

const __mongoURL = `mongodb+srv://root:${process.env.MONGOPWD}@cluster0-sefq2.gcp.mongodb.net/test?retryWrites=true&w=majority`

db.on('error', (e) => console.log('[SERVER] MongoDB connection error!', e))
db.once('open', () => {
  console.log('[SERVER] MongoDB conected!')
})

mongoose.connect(
  __mongoURL,
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }
)
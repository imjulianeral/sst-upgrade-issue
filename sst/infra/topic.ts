import path from 'node:path'

const topic = new sst.aws.SnsTopic('Test')

topic.subscribe({
  runtime: 'nodejs20.x',
  handler: path.join('..', 'lambda', 'src', 'index.handler'),
})

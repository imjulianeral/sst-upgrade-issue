import path from 'node:path'

const vpc = new sst.aws.Vpc('TestVpc')
const cluster = new sst.aws.Cluster('TestCluster', { vpc })

cluster.addService('TestService', {
  public: {
    ports: [{ listen: '80/http' }],
  },
  image: {
    dockerfile: path.join('..', 'http-server', 'cmd', 'main', 'Dockerfile'),
    context: path.join('..', 'http-server'),
  },
  dev: {
    command: 'go run main.go',
  },
})

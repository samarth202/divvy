const os = require('os');
const cluster = require('cluster');

const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker', worker.id, ' has exitted.');
    });
  } else {
    require('./bin/www');
  }
} else {
  require('./bin/www');
}

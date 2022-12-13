const gulp = require('gulp')
const scp = require('gulp-scp2')
const readlineSync = require('readline-sync')
const TEST_privateKey = require('fs').readFileSync('rsa-test.key')
const TEST_IP = '47.95.232.139'
const TEST_DEST = '/www/175media_www/admin'
const PROD_IP = '39.106.75.112'
const PROD_DEST = '/home/wwwroot/master/www.superhub.com.cn'

gulp.task('TEST_DEPLOY', () => {
  if (readlineSync.keyInYN('Do you want deploy?')) {
    // 'Y' key was pressed.
    console.log('Deploying test env...')
    return gulp.src(['./dist/**']).pipe(scp({
      username: 'root',
      port: 22,
      dest: TEST_DEST,
      host: TEST_IP,
      privateKey: TEST_privateKey
    })).on('error', function(err) {
      console.log(err)
    })
  } else {
    console.log('Canceled')
  }
})

// 部署到生产服务器
gulp.task('PROD_DEPLOY', () => {
  const password = readlineSync.question('Password?\n', { hideEchoBack: true })
  if (password) {
    console.log('Deploying production env...')
    return gulp.src(['./dist/**']).pipe(scp({
      username: 'root',
      port: 22,
      dest: PROD_DEST,
      host: PROD_IP,
      password
    })).on('error', function(err) {
      console.log(err)
    })
  } else {
    console.log('Canceled')
  }
})

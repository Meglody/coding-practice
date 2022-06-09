// 实现1 递归
// 模拟请求
const request = (url: string) => {
  return new Promise(resolve => {
    console.log(`开始请求: ${url}`)
    setTimeout(() => {
      resolve(`请求${url}完成`)
    }, 1000);
  }).then(res => {
    console.log(`结束任务: ${res}`)
  })
}

const urls = ['baidu.com', 'bilibili.com', 'taobao.com', 'bytedance.com', 'microsoft.com', 'qq.com', 'bing.com']
const pool = []
const max = 3

const addTask = (url: string) => {
  const task = request(url)
  pool.push(task)
  console.log(`当前并发数: ${pool.length}`)
  task.then(() => {
    pool.splice(pool.indexOf(task), 1)
    console.log(`当前并发数: ${pool.length}`)
    if(pool.length < max && urls.length){
      const newUrl = urls.shift()
      addTask(newUrl)
    }
  })
}

const fn1 = () => {
  while(pool.length < max){
    const url = urls.shift()
    addTask(url)
  }
}

// fn1()

// 实现2 Promise.race
const fn2 = async() => {
  while(urls.length){
    const newUrl = urls.shift()
    const task = request(newUrl)
    pool.push(task)
    console.log(`当前并发数: ${pool.length}`)
    task.then(() => {
      pool.splice(pool.indexOf(task), 1)
      console.log(`当前并发数: ${pool.length}`)
    })
    if(pool.length === max){
      await Promise.race(pool)
    }
  }
}

fn2()

// 这个只在必要的时候使用，平时调用接口报错就报错，不管他

async function task(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export default task;

/* eslint-disable max-len */

// Reference:
// https://qiita.com/mori_goq/items/5b01666cff5134f821bd

// Asynchronous function that resolves successfully
const fetchDataResolve = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('tarosuke');
  }, 10);
});

// Asynchronous function that rejects with an error
const fetchDataReject = () => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error('something bad happened'));
  }, 10);
});

describe('verify asynchronous success', () => {
  it.concurrent('test 1', () => fetchDataResolve().then((data) => {
    expect(data).toBe('tarosuke');
  }));

  it.concurrent('test 2', () => expect(fetchDataResolve()).resolves.toBe('tarosuke'));

  it.concurrent('test 3', async () => {
    await expect(fetchDataResolve()).resolves.toBe('tarosuke');
  });

  it.concurrent('test 4', async () => {
    await expect(fetchDataResolve()).resolves.toBe('tarosuke');
  });
});

describe('verify asynchronous failure', () => {
  it.concurrent('test 1', () => fetchDataReject().catch((data) => {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(data.message).toBe('something bad happened');
  }));

  it.concurrent('test 2', () => expect(fetchDataReject()).rejects.toThrow('something bad happened'));

  it.concurrent('test 3', async () => {
    await expect(fetchDataReject()).rejects.toThrow('something bad happened');
  });

  it.concurrent('test 4', async () => {
    //
    // Ensure that the assertion is called once
    // (If the asynchronous function succeeds, the catch block will not be executed and the test will be considered successful, so it is recommended to include this)
    //
    expect.assertions(1);

    try {
      await fetchDataReject();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe('something bad happened');
    }
  });
});

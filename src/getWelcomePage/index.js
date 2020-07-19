exports.handler = (event, context, callback) => {
  // Log http request

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  }

  const req = http.request(
    `https://api.github.com/repos/maxios/khaledmaher/actions/workflows/${process.env.WORKFLOW_ID}/dispatches`,
    options,
    (res) => {
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html'
        },
        body: res
      };

      return callback(null, response);
    }
  );

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(JSON.stringify({
    ref: 'master'
  }))

  req.end()
};

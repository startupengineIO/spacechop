import bodyParser from 'body-parser';
import express from 'express';
import matchPath from 'react-router/matchPath';
import url from 'url';

export default (port, handler, routePath = '/*') => new Promise((resolve) => {
  if (!handler) {
    throw new Error('handler is required in createMockServer');
  }

  const app = express();
  app.use(bodyParser.json());
  let next;

  app.use('/*', (req, res) => {
    const { pathname } = url.parse(req.originalUrl);
    const match = matchPath(pathname, { path: routePath });
    if (match) {
      handler({ ...req, params: match.params }, res);
      if (next) {
        next(pathname);
      }
    } else {
      res.end();
    }
  });

  let server;
  server = app.listen(port, () => {
    resolve({
      close: () => new Promise((closeResolve) => {
        server.close(closeResolve);
      }),

      waitForPath: (path, timeout = 1000) => {
        return new Promise((innerResolve, reject) => {
          // Create a timeout if we are waiting for too long.
          const t = setTimeout(() => {
            next = null;
            reject('Timeout in waitForPath');
          }, timeout);

          // Create a method that is called by the server when receiving request.
          next = (pathname) => {
            if (!path || matchPath(pathname, { path })) {
              next = null;
              clearTimeout(t);
              innerResolve();
            }
          };
        });
      },
    });
  });
});

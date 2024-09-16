// Note this object is purely in memory.
// It will be reset each time the server restarts.
const users = {};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf-8'),
  };

  response.writeHead(status, headers);

  if(request.method !== 'HEAD') {
    response.write(content);
  }
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 201, newUser);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  }

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  updateUser,
  notFound,
};

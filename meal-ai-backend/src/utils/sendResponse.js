export const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// - Accepts a response object, status code, and data.
// - Sets headers to indicate JSON output.
// - Sends the JSON payload and closes the connection.



export const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
};


// - Preparing an empty container (body = "").
// (- In raw Node, the request body doesn’t arrive all at once.
// - It comes in chunks (pieces of data).
// - That’s why you start with let body = "".
// )
// - Filling it with chunks from the request.
// - At the end, parsing it into a JSON object.
// - If parsing fails, you throw an error.

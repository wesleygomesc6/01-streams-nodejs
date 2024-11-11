export async function json(req, res) {
  //lida com json de entrada e devolve os dados em json
  //middleware é um intermediador
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}

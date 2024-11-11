import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1 * 3.14;
    console.log("nTranformado", transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const all = Buffer.concat(buffers).toString();
  console.log(all);

  return res.end(all);
  //return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);

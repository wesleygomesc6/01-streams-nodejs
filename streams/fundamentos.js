import { Readable, Writable, Transform } from "node:stream";

class OneToHandredStrem extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 3.14);
    callback();
  }
}

new OneToHandredStrem()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByStream());

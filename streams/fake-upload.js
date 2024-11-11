import { Readable } from "node:stream";

class OneToHandredStrem extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  duplex: "half",
  body: new OneToHandredStrem(),
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });

const express = require("express");
const opentelemetry = require("@opentelemetry/api");

const PORT = process.env.PORT || "8000";
const app = express();

app.get("/", (req, res) => {

  const tracer = opentelemetry.trace.getTracer(
    'Accounting'
  );
  tracer.startActiveSpan("code-execution-started" , span => {
    span.setAttribute('data', `{
      message:"Response sended",
      value:"Hello world"
    }`)
    span.end();

  });

  

  res.send("Hello World");
});

app.post("/test", (req,res) => {
  const tracer = opentelemetry.trace.getTracer(
    'Accounting'
  );

  tracer.startActiveSpan("code-execution-started" , span => {
    span.setAttribute('data', `{
      message:"Response sended",
      value:"Hello world post request"
    }`)
    span.end();

  });

  res.json({data:{message:"Hello world"}});

})

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
const http = require("http");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/health",
  timeout: 2000
};

const req = http.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error("Health endpoint returned non-200 status");
    process.exit(1);
  }

  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.status !== "UP") {
        console.error("Service health status is not UP");
        process.exit(1);
      }
      console.log("Service health check passed");
      process.exit(0);
    } catch (err) {
      console.error("Invalid JSON response");
      process.exit(1);
    }
  });
});

req.on("error", () => {
  console.error("Service not reachable on port 3000");
  process.exit(1);
});

req.end();

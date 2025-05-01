// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "july-2025",
        script: "npm",
        args: "run dev",
        env: {
          PORT: 3554
        }
      }
    ]
  };
  
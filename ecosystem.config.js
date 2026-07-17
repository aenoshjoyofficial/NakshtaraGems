module.exports = {
  apps: [
    {
      name: "nakshatra-storefront",
      cwd: "./apps/user",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "nakshatra-admin",
      cwd: "./apps/admin",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

const path = require("path");

module.exports = [
  {
    title: "cnpc 活动中心",
    projectPath: path.join(__dirname, "cnpc-phone"),
    type: "system",
    admin: false,
    design: "phone",
    ssr: false,
    outPath: "cnpc/h5"
  },
  {
    title: "cnpc 管理中心",
    projectPath: path.join(__dirname, "cnpc-mgr"),
    type: "cnpc",
    admin: true,
    design: "desktop",
    ssr: false,
    outPath: "cnpc/admin"
  },
];

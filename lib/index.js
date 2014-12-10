module.exports = {
  Client: require("./client"),
  Call: require("./call"),
  Account: require("./account"),
  Application: require("./application"),
  AvailableNumber: require("./availableNumber"),
  Bridge: require("./bridge"),
  Conference: require("./conference"),
  ConferenceMember: require("./conferenceMember"),
  Error: require("./error"),
  Media: require("./media"),
  Message: require("./message"),
  NumberInfo: require("./numberInfo"),
  PhoneNumber: require("./phoneNumber"),
  Recording: require("./recording")
};

require("./compatibility")(module.exports);

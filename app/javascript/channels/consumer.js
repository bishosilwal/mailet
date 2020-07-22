// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable"
var cable_url = "ws://" + window.location.host + "/cable"
export default createConsumer(cable_url)

//import {currentuser} from '../actions/AuthActions.js'

var intlData = require("json!../assets/locale-data/language.json");

export default {
  getIntlMessage(path) {
    const pathParts = path.split(".");
    let message;
    try {
      message = pathParts.reduce((obj, pathPart) => obj[pathPart], intlData);
    } finally {
      if (message === undefined) {
        throw new ReferenceError("Could not find Intl message: " + path);
      }
    }
    return message;
  },

  get(path, values) {
    //path = currentuser.location + "." + path;
    path = "ko_KR." + path

    const pathParts = path.split(".")
    var message
    try {
      message = pathParts.reduce((obj, pathPart) => obj[pathPart], intlData);
      if (values) {
        Object.keys(values).forEach((key) => {
          message = message.replace(`{${key}}`, values[key])
        })
      }
    } finally {
      if (message === undefined) {
        message = "undefined"
      }
    }
    return message
  }
}

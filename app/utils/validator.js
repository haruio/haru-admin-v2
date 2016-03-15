/**
 * Created by jungenpark on 3/9/16.
 */

export default {

  emailcheck(strValue) {
    var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    //입력을 안했으면
    if (strValue.length === 0) {
      return true
    }
    //이메일 형식에 맞지않으면
    if (!strValue.match(regExp)) {
      return true
    }
    return false
  }
}

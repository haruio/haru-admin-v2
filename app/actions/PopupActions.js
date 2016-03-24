/**
 * Created by jungenpark on 3/22/16.
 */
import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

const PopupActions = {
  openPopup(key, props = {}) {
    AppDispatcher.handleViewAction({
      type: AppConstants.OPEN_POPUP,
      result: {key, props}
    })
  },
  closePopup(key) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLOSE_POPUP,
      result: {key}
    })
  },
  closeALLPopup() {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLOSE_ALL_POPUP
    })
  }
}

export default PopupActions

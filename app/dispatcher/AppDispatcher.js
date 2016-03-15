import { Dispatcher } from 'flux'
import assign from 'object-assign'

import debug from 'debug'
const log = debug('application:dispactcher')

/**
 * AppDispatcher
 */
const AppDispatcher = assign(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function (action) {
    if (process.env.NODE_ENV !== 'production') {
      // Logging all actions is useful for figuring out mistakes in code.
      // All data that flows into our application comes in form of actions.
      // Actions are just plain JavaScript objects describing “what happened”.
      // Think of them as newspapers.
      if (action.error) {
        log(action)
      } else {
        log(action)
      }

    }

    this.dispatch(action)
  }
})

export default AppDispatcher

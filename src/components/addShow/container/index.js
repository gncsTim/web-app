import { connect } from 'react-redux'
import AddEvent from '../component'
import { pushRouteWihtDebounce } from 'rdx/actions'

const mapState = (state) => ({
    addShowRequest: state.addShowRequest
})

const mapDispatch = (dispatch) => ({
    pushRoute: () => {
        dispatch(pushRouteWihtDebounce(2000)('/'))
    }
})

const connector = connect(mapState, mapDispatch)

export default connector(AddEvent)

import { connect } from 'react-redux'
import PrivacyComponent from './component' 
import { saveEssentialData, loadPrivacy, removeNotification} from './actions'

const mapState = state => ({
    showPrivacy: state.privacy.showPrivacy
})

const mapDispatch = (dispatch) => ({
    loadPrivacy: () => dispatch(loadPrivacy()),
    saveEssentialData: () => dispatch(saveEssentialData()),
    removeNotification: () => dispatch(removeNotification())
})

export default connect(mapState, mapDispatch)(PrivacyComponent)

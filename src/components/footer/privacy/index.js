import { connect } from 'react-redux'
import PrivacyComponent from './component' 
import { saveEssentialData, loadPrivacy} from './actions'

const mapState = state => ({
    showPrivacy: state.privacy.showPrivacy
})

const mapDispatch = (dispatch) => ({
    loadPrivacy: () => dispatch(loadPrivacy()),
    saveEssentialData: () => dispatch(saveEssentialData())
})

export default connect(mapState, mapDispatch)(PrivacyComponent)

import { connect } from 'react-redux'
import PrivacyComponent from './component' 
import { saveEssentialData, loadPrivacy} from './actions'

const mapDispatch = (dispatch) => ({
    loadPrivacy: () => dispatch(loadPrivacy()),
    saveEssentialData: () => dispatch(saveEssentialData())
})

export default connect(null, mapDispatch)(PrivacyComponent)

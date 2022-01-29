import Welcome from '../component/Welcome';
import Explore from '../component/Explore';

function LandingPage() {
    return(
        <div className="lp-bg">
            <div className="lp-container">
                <div className="lp-left">
                <Welcome/>
                </div>
                <div className="lp-right">
                <Explore/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
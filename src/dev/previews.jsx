import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import WelcomeScreen from "@/screens/WelcomeScreen.jsx";
import HistorySection from "@/sections/HistorySection.jsx";
import HomeSection from "@/sections/HomeSection.jsx";
import App from "@/App.jsx";
import CulturesSection from "@/sections/CulturesSection.jsx";
import SecretSection from "@/sections/SecretSection.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/WelcomeScreen">
                <WelcomeScreen/>
            </ComponentPreview>
            <ComponentPreview path="/HistorySection">
                <HistorySection/>
            </ComponentPreview>
            <ComponentPreview path="/HomeSection">
                <HomeSection/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/CulturesSection">
                <CulturesSection/>
            </ComponentPreview>
            <ComponentPreview path="/SecretSection">
                <SecretSection/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
import HeroScreen from "../components/Hero";
import AboutScreen from "../components/About";
import WorkScreen from "../components/Works";
import SkillsScreen from "../components/Skills";

export default function HomeScreen() {
    return(
        <main>
            <HeroScreen />
            <AboutScreen />
            <SkillsScreen />
            <WorkScreen />
            <div className='fd-home-layer'></div>
        </main>
    );
}
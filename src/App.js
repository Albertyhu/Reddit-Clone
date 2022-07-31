import React, { useState, useContext } from 'react'; 
import RenderThread from './thread/renderThread.js'; 
import RenderNavBar from './navBar/navBar.js'; 
import { AppContext } from './components/contextItem.js'; 
import { sampleUser, threads } from './helperTools/dummyData.js'; 
import RenderFeed from './feed/renderFeed.js'; 

function App() {
    const [normalMode, setNormal] = useState(true)

    const DefaultTheme = {
        //PanelBackgroundColor applies to the navbar 
        PanelBackgroundColor: "#ffffff",
        SearchBarBackgroundColor: "#f6f7f8",
        MainBackgroundColor: "#dae0e6",
        TextColor: "#222222",
        SoftTextColor: "#848787",
        ActiveColor: "#0079d3",
        InactiveC: "#828485",
        ButtonBackgroundC: "#0079d3",
        ButtonBackgroundCHover: "#1B90E7", 
        ButtonTextC: "#ffffff",
        InvertedButtonBackgroundC: "rgba(0, 0, 0, 0)", 
        InvertedButtonBackgroundCHover: "rgba(0, 0, 0, 0.1)", 
        InvertedButtonTextC: "#0079d3", 
        InvertedButtonBorder: "1px solid #0079d3"
    }
    const DarkTheme = {
        PanelBackgroundColor: "#1a1a1b",
        SearchBarBackgroundColor: "#272729",
        MainBackgroundColor: "#030303",
        TextColor: "#d4d7d9",
        SoftTextColor: "#646566",
        ActiveColor: "#d4d7d9",
        InactiveC: "#818384", 
        ButtonBackgroundC: "#d7dadc",
        ButtonBackgroundCHover: "#D1D1D1", 
        ButtonTextC: "#1a1a1b",
        InvertedButtonBackgroundC: "rgba(255, 255, 255, 0)",
        InvertedButtonBackgroundCHover: "rgba(255, 255, 255, 0.1)",
        InvertedButtonTextC: "#d7dadc",
        InvertedButtonBorder: "1px solid #d7dadc"
    }

    const context = {
        DefaultTheme, 
        DarkTheme, 
        normalMode,
        setNormal,
        userData: sampleUser[0], 
    }
    return (
        <AppContext.Provider value={context}>
            <RenderNavBar />
            <div id="EmptyDiv" style={{ height: "50px", width: "100%", resize: "none", }}></div>
            {/* <RenderThread threadID='SGASEFxgs423' /> */}
              <RenderFeed data={threads} />
        </AppContext.Provider>
  );
}

export default App;

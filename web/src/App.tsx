import React from 'react';
import {SessionsRoute} from "./modules/sessions/SessionsRoute";
import {ThemeProvider} from "@introist/react-foundation/v2";
import {RpcProvider} from "./rpc/RpcProvider";

function App() {
    return (
        <div>
            <RpcProvider>
                <ThemeProvider>
                    <SessionsRoute/>
                </ThemeProvider>
            </RpcProvider>
        </div>
    );
}

export default App;

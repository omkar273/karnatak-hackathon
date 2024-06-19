import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import persistStore from "redux-persist/es/persistStore";
import {PersistGate} from "redux-persist/integration/react";
import App from "./App";
import store from "./common/redux/store";
import "./index.css";
import {AiAssistantProvider} from "@sista/ai-assistant-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<div>
		{/* app */}
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<AiAssistantProvider apiKey="pk-sista-b15fbf62-3bfa-4f4e-a27c-2a50ea26f7ce">
					<App/>
				</AiAssistantProvider>
			</PersistGate>
		</Provider>
		
		{/* toast container */}
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			transition={Bounce}
		/>
	</div>
)

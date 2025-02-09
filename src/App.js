import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateLink from './CreateLink';
import ViewSession from './components/ViewSession';
import About from './About';
function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<Navigate to="/create" replace />} />
						<Route path="/create" element={<CreateLink />} />
						<Route path="/about" element={<About />} />
						<Route path="/session/:token" element={<ViewSession />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;

//Import components for the routes
import Home from './pages/Home';
import Lives from './pages/Lives';
import WriteQuestion from './pages/WriteQuestion'
import CheckQuestion from './pages/CheckQuestion'
import UploadVideo from './pages/UploadVideo';

export const adminRoutes = [
	{
		path: "/home",
		element: <Home />
	},
	{
		path: "/upload-video",
		element: <UploadVideo />
	},
	{
		path: "/write-question",
		element: <WriteQuestion />
	},
	{
		path: "/check-questions",
		element: <CheckQuestion />
	},
	{
		path: "/lives",
		element: <Lives />
	},
]

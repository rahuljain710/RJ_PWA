import { useLocation } from 'react-router-dom';

const useGTMPageView = () => {
    const location = useLocation();

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'pageview',
            page: location.pathname + location.search,
        });
    }, [location]);
};

/*
Import and render <GTMHead /> in your main app component (e.g., in App.js or App.jsx), ideally as high as possible in the component tree.

3. Ensure SPA Pageview Tracking

Since PWA Kit is a single-page application, you must manually trigger GTM pageview events on route changes:


*/

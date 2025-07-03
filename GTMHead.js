import { useEffect } from 'react';

const GTM_ID = 'GTM-XXXXXXX'; // Replace with your GTM ID

const GTMHead = () => {
    useEffect(() => {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null;
};

export default GTMHead;

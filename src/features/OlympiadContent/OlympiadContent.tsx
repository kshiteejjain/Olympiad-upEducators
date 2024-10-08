import { Suspense, lazy, useState, useEffect, ComponentType } from 'react';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import { fetchUserOlympiadData } from '../../utils/firebaseUtils'; // Import the utility function

import './OlympiadContent.css';

// Retrieve olympiad prefix from localStorage
const olympdPrefix = JSON.parse(localStorage.getItem('olympd_prefix') || '{}');

// Dynamically load components based on olympiadName
const loadComponent = (componentName: string) => lazy(() => import(`./${olympdPrefix.olympiadName || 'm24'}/${componentName}.tsx`));

// Load components
const AboutOlympiad = loadComponent('AboutOlympiad');
const ReferEarn = loadComponent('ReferEarn');
const Awards = loadComponent('Awards');
const FAQ = loadComponent('FAQ');
const LiveMasterClass = loadComponent('LiveMasterClass');
const Report = loadComponent('Report');
const AboutUpEducators = loadComponent('AboutUpEducators');
const CoursesForEducators = loadComponent('CoursesForEducators');
const CheckExamSystem = loadComponent('CheckExamSystem');

// Map paths to components
const componentMap: Record<string, ComponentType<any>> = {
    '/AboutOlympiad': AboutOlympiad,
    '/ReferEarn': ReferEarn,
    '/Awards': Awards,
    '/FAQ': FAQ,
    '/LiveMasterClass': LiveMasterClass,
    '/Report': Report,
    '/AboutUpEducators': AboutUpEducators,
    '/CoursesForEducators': CoursesForEducators,
    '/CheckExamSystem': CheckExamSystem
};

// Default component to display
const DefaultComponent = AboutOlympiad;

const OlympiadContent = () => {
    const [CurrentComponent, setCurrentComponent] = useState<ComponentType<any>>(DefaultComponent);
    const [olympiads, setOlympiads] = useState<string[]>([]); // State to store Olympiad names
    const olympiadName = olympdPrefix.olympiad;

    useEffect(() => {
        // Check if the component has been loaded for the first time
        const isFirstLoad = localStorage.getItem('isFirstLoad');

        if (!isFirstLoad) {
            localStorage.setItem('isFirstLoad', 'true');
            window.location.reload();
        }

        const fetchData = async () => {
            if (!olympiadName) {
                try {
                    const email = olympdPrefix.email;
                    if (email) {
                        const data = await fetchUserOlympiadData(email);
                        // Extract Olympiad names from the fetched user data
                        const userOlympiads = data.flatMap(user => user.olympiad || []);
                        setOlympiads(Array.from(new Set(userOlympiads))); // Remove duplicates
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            }
        };

        fetchData();
    }, [olympiadName]); // Dependency array includes olympiadName to re-run effect if it changes

    useEffect(() => {
        if (olympiadName) {
            const path = `/${olympiadName}`; // Dynamic path for the component
            const newComponent = componentMap[path] || DefaultComponent;
            setCurrentComponent(newComponent);
        }
    }, [olympiadName]); // Set CurrentComponent based on olympiadName

    const handlePathChange = (path: string) => {
        // Update the current component based on the path
        const newComponent = componentMap[path] || DefaultComponent;
        setCurrentComponent(newComponent);
    };

    const handleOlympiadClick = (selectedOlympiad: string) => {
        const storedData = localStorage.getItem('olympd_prefix');
        const olympadPrefix = storedData ? JSON.parse(storedData) : { olympiad: [] };
    
        // Replace the existing olympiad array with the new selection
        olympadPrefix.olympiad = [selectedOlympiad];
        
        // Save the updated object to localStorage
        localStorage.setItem('olympd_prefix', JSON.stringify(olympadPrefix));
    
        // Reload the window to reflect changes
        window.location.reload();
    };
    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageNavigation navPath={handlePathChange} />
            {/* Render the Olympiad data if olympiadName is not set */}
            {!olympiadName &&  olympiads.length > 1 ? (
                <>
                    <div className="content">
                        <h2>Available Olympiads</h2>
                        <ul className='fetched-olympiads'>
                            {olympiads.length > 0 ? (
                                olympiads.map((olympiad, index) => {
                                    const olympiadLabel = olympiad === 's24' ? 'Science 2024'
                                        : olympiad === 'm24' ? 'Maths 2024'
                                            : olympiad;

                                    return (
                                        <li key={index} onClick={() => handleOlympiadClick(olympiad)}>
                                            {olympiadLabel}
                                        </li>
                                    );
                                })
                            ) : (
                                <CurrentComponent />
                            )}
                        </ul>

                    </div>
                </>
            ) : (
                <CurrentComponent />
            )}
        </Suspense>
    );
};

export default OlympiadContent;

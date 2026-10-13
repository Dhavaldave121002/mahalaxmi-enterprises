import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export const RouterProvider = ({ children }) => {
  // Read current path from window.location or default to '/'
  const getPath = () => {
    // If hash routing is used (e.g. #/collections/textile), parse hash, otherwise pathname
    if (window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState(getPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getPath());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to) => {
    if (!to) return;
    if (to.startsWith('http')) {
      window.open(to, '_blank');
      return;
    }
    if (to.startsWith('#') && !to.startsWith('#/')) {
      // Anchor scroll
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Update history
    try {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.location.hash = '#' + to;
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const Link = ({ to, children, className = '', activeClassName = '', onClick, ...props }) => {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));

  const handleClick = (e) => {
    if (to.startsWith('http')) return;
    if (to.startsWith('#') && !to.startsWith('#/')) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const combinedClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <a href={to} onClick={handleClick} className={combinedClass} {...props}>
      {children}
    </a>
  );
};

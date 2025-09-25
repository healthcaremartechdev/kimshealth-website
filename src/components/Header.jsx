"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import HederCorporate from './HeaderCorporate';
import HeaderUnit from './HederUnit';
import { ToastContainer } from 'react-toastify';

const Header = ({ hospital }) => {
  const [activeHospital, setActiveHospital] = useState(hospital);

  
  // cookies
  const loc = Cookies.get("systemLocation") ? JSON.parse(Cookies.get("systemLocation")) : "";
  const lang = Cookies.get("systemLang") ? JSON.parse(Cookies.get("systemLang")) : "";

  // Override hospital from URL param if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hospitalParam = params.get("hospital");

    if (hospitalParam) {
      setActiveHospital(hospitalParam);
    }
  }, [hospital]);

  // Sidebar & dropdown handler
  useEffect(() => {
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    const hamburger = document.querySelector('#hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const handlers = [];

    const hamburgerClickHandler = () => {
      hamburger?.classList.toggle('active');
      sidebar?.classList.toggle('active');
      overlay?.classList.toggle('active');
      document.body.style.overflow = sidebar?.classList.contains('active') ? 'hidden' : '';
    };

    hamburger?.addEventListener('click', hamburgerClickHandler);

    dropdownItems.forEach((dropdown) => {
      const menuItem = dropdown.querySelector('.menu-item');

      if (menuItem) {
        const handler = (e) => {
          e.stopPropagation();

          dropdownItems.forEach((other) => {
            if (other !== dropdown) {
              other.classList.remove('open');
              const otherSubmenu = other.querySelector('.submenu');
              otherSubmenu?.classList.remove('open');
            }
          });

          dropdown.classList.toggle('open');
          const submenu = dropdown.querySelector('.submenu');
          submenu?.classList.toggle('open');
        };

        menuItem.addEventListener('click', handler);
        handlers.push({ element: menuItem, handler });
      }
    });

    return () => {
      // Clean up all attached listeners safely
      hamburger?.removeEventListener('click', hamburgerClickHandler);

      handlers.forEach(({ element, handler }) => {
        element?.removeEventListener('click', handler);
      });
    };
  }, []);

  if (loc.default === true) {
    return (
      <>
        <ToastContainer position='bottom-center' />
        <HederCorporate hospital={activeHospital} />
      </>
    );
  } else {
    return (
      <>
        <ToastContainer position='bottom-center' />
        <HeaderUnit hospital={activeHospital} />
      </>
    );
  }
};

export default Header;

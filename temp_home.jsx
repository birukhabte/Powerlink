import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Phone, MapPin, AlertTriangle, Globe, ChevronDown, Bell, Info, Calendar, Minimize2, Maximize2, X, Wrench, Moon, Sun } from 'lucide-react';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import useAnnouncements from '../hooks/useAnnouncements';
import powerlink from '../assets/powerlink.avif';
import logo1 from '../assets/logo1.jpg';
import image from '../assets/image.png';
import './HomeImage.css';

import axios from 'axios';

// ... (keep imports)

const Home = () => {
    const [activeNav, setActiveNav] = useState('home');
    const [language, setLanguage] = useState('en');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAnnouncementsCollapsed, setIsAnnouncementsCollapsed] = useState(false);
    
    // Use the custom hook to fetch announcements
    const { announcements, loading, error, refetch } = useAnnouncements();
    
    // Debug logging
    console.log('ðŸ  Home component - Announcements state:', {
        announcements,
        loading,
        error,
        count: announcements.length
    });

    const translations = {
        en: {
            home: 'Home',
            about: 'About Us',
            services: 'Services',
            contact: 'Contact',
            login: 'Login',
            register: 'Register',
            welcome: 'Welcome to',
            tagline: 'Your digital platform for reporting outages, tracking repairs, and managing electricity services with real-time updates.',
            custLogin: 'Customer Login',
            newReg: 'New Registration',
            outageMap: 'Live Outage Map',
            emergency: 'Emergency Hotline: 955',
            f1: 'Real-time Reporting',
            f2: 'Mobile Friendly',
            f3: '24/7 Support',
            footerTagline: 'Your digital platform for reporting outages, tracking repairs, and managing electricity services with real-time updates.',
            rights: 'All rights reserved',
            announcementTitle: 'Announcements',
            viewAll: 'View All',
            collapsedMsg: 'You have new announcements'
        },
        am: {
            home: 'á‹‹áŠ“ áŒˆáŒ½',
            about: 'áˆµáˆˆ áŠ¥áŠ›',
            services: 'áŠ áŒˆáˆáŒáˆŽá‰¶á‰½',
            contact: 'á‹«áŒáŠ™áŠ•',
            login: 'á‹­áŒá‰¡',
            register: 'á‹­áˆ˜á‹áŒˆá‰¡',
            welcome: 'áŠ¥áŠ•áŠ³áŠ• á‹ˆá‹°',
            tagline: 'á‹¨áŠ¤áˆŒáŠ­á‰µáˆªáŠ­ áˆ˜á‰†áˆ«áˆ¨áŒ¥áŠ• áˆªá–áˆ­á‰µ á‹¨áˆšá‹«á‹°áˆ­áŒ‰á‰ á‰µá£ áŒ¥áŒˆáŠ“á‹Žá‰½áŠ• á‹¨áˆšáŠ¨á‰³á‰°áˆ‰á‰ á‰µ áŠ¥áŠ“ á‹¨áŠ¤áˆŒáŠ­á‰µáˆªáŠ­ áŠ áŒˆáˆáŒáˆŽá‰¶á‰½áŠ• á‰ á‰…áŒ½á‰ á‰µ á‹¨áˆšá‹«áˆµá‰°á‹³á‹µáˆ©á‰ á‰µ á‹²áŒ‚á‰³áˆ á•áˆ‹á‰µáŽáˆ­áˆ',
            custLogin: 'á‹¨á‹°áŠ•á‰ áŠ› áˆ˜áŒá‰¢á‹«',
            newReg: 'áŠ á‹²áˆµ áˆá‹áŒˆá‰£',
            outageMap: 'á‹¨á‰€áŒ¥á‰³ áˆ˜á‰†áˆ«áˆ¨áŒ¥ áŠ«áˆ­á‰³',
            emergency: 'á‹¨áŠ á‹°áŒ‹ áŒŠá‹œ áˆµáˆáŠ­á¡ 955',
            f1: 'á‰€áŒ¥á‰³ áˆªá–áˆ­á‰µ áˆ›á‹µáˆ¨áŒŠá‹«',
            f2: 'áˆˆáˆµáˆáŠ­ áˆá‰¹',
            f3: 'á‹¨24/7 á‹µáŒ‹á',
            footerTagline: 'áˆˆá‰°áˆ»áˆˆá‰½ áŠ¢á‰µá‹®áŒµá‹« áˆ˜á‰¥áˆ«á‰µ áŠ¥áŠ“á‰ áˆ«áˆˆáŠ•á¢',
            rights: 'áˆ˜á‰¥á‰± á‰ áˆ…áŒ á‹¨á‰°áŒ á‰ á‰€ áŠá‹',
            announcementTitle: 'áˆ›áˆµá‰³á‹ˆá‰‚á‹«á‹Žá‰½',
            viewAll: 'áˆáˆ‰áŠ•áˆ á‹­áˆ˜áˆáŠ¨á‰±',
            collapsedMsg: 'áŠ á‹²áˆµ áˆ›áˆµá‰³á‹ˆá‰‚á‹«á‹Žá‰½ áŠ áˆ‰á‹Žá‰µ'
        }
    };

    const navLinks = [
        { id: 'home', label: translations[language].home, href: '/', isLink: true },
        { id: 'about', label: translations[language].about, href: '#about' },
        { id: 'services', label: translations[language].services, href: '#services' },
        { id: 'contact', label: translations[language].contact, href: '#contact' },
    ];

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-800'}`}>
            {/* Navigation */}
            <nav className={`flex items-center p-3 shadow-md sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-[#0802A3] border-b border-[#06018a]' : 'bg-white'}`}>
                {/* Logo Section */}
                <Link
                    to="/"
                    onClick={() => {
                        setActiveNav('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center space-x-3 w-1/4 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <img src={logo1} alt="PowerLink Logo" className="h-12 w-auto object-contain" />
                    <span className="text-2xl font-bold text-[#00B7B5] tracking-tight">PowerLink</span>
                </Link>

                {/* Navigation Links - Centered */}
                <div className="flex-1 flex justify-center space-x-8 font-medium">
                    {navLinks.map((link) => (
                        link.isLink ? (
                            <Link
                                key={link.id}
                                to={link.href}
                                onClick={() => {
                                    setActiveNav(link.id);
                                    if (link.id === 'home') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className={`pb-1 transition-all duration-300 border-b-2 ${activeNav === link.id
                                    ? 'text-[#0802A3] border-[#0802A3]'
                                    : isDarkMode ? 'text-gray-200 border-transparent hover:text-[#0802A3]' : 'text-[#0802A3] border-transparent hover:border-[#0802A3]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={() => setActiveNav(link.id)}
                                className={`pb-1 transition-all duration-300 border-b-2 ${activeNav === link.id
                                    ? 'text-[#0802A3] border-[#0802A3]'
                                    : isDarkMode ? 'text-gray-200 border-transparent hover:text-[#0802A3]' : 'text-[#0802A3] border-transparent hover:border-[#0802A3]'
                                    }`}
                            >
                                {link.label}
                            </a>
                        )
                    ))}
                </div>

                {/* Auth & Language Buttons - Right Side */}
                <div className="flex items-center space-x-4 w-1/4 justify-end">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Language Selector */}
                    <div className={`relative group px-3 py-2 flex items-center space-x-1 cursor-pointer transition-colors border rounded-lg ${isDarkMode ? 'text-gray-200 border-gray-400 hover:border-white hover:text-white' : 'text-[#0802A3] border-gray-300 hover:border-[#0802A3]'}`}>
                        <Globe size={18} />
                        <span className="text-sm font-semibold">{language === 'en' ? 'EN' : 'áŠ áˆ›'}</span>
                        <ChevronDown size={14} />

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full right-0 mt-2 w-32 border shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] bg-white border-gray-100`}>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors flex items-center justify-between ${language === 'en'
                                        ? 'text-[#0802A3] font-bold bg-blue-50/50'
                                        : 'text-gray-700'
                                    }`}
                            >
                                English {language === 'en' && <div className="w-1.5 h-1.5 bg-[#0802A3] rounded-full"></div>}
                            </button>
                            <button
                                onClick={() => setLanguage('am')}
                                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors flex items-center justify-between ${language === 'am'
                                        ? 'text-[#0802A3] font-bold bg-blue-50/50'
                                        : 'text-gray-700'
                                    }`}
                            >
                                áŠ áˆ›áˆ­áŠ› {language === 'am' && <div className="w-1.5 h-1.5 bg-[#0802A3] rounded-full"></div>}
                            </button>
                        </div>
                    </div>

                    <Link to="/login" className={`px-4 py-2 font-semibold transition ${isDarkMode ? 'text-white hover:text-gray-200' : 'text-[#0802A3] hover:text-[#06018a]'}`}>
                        {translations[language].login}
                    </Link>
                    <Link to="/register" className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${isDarkMode ? 'bg-white text-[#0802A3] hover:bg-gray-100' : 'bg-[#0802A3] text-white hover:bg-[#06018a]'}`}>
                        {translations[language].register}
                    </Link>
                </div>
            </nav>
            {/* Hero Section */}
            <main className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
                {/* Left Half - Content */}
                <div className={`w-full lg:w-1/2 min-h-[50vh] lg:h-screen flex flex-col items-center justify-center px-6 text-center relative ${isDarkMode ? 'bg-black' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'}`}>
                    <div className="relative z-10 max-w-4xl">
                    <motion.h1
                        className="text-5xl md:text-6xl font-medium text-white mb-6 drop-shadow-2xl relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Welcome to - Letter by letter animation with continuous effects */}
                        <motion.span className="inline-block">
                            {translations[language].welcome.split('').map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block"
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                        rotateX: -90
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, -3, 0],
                                        rotateX: 0,
                                        textShadow: [
                                            "0px 0px 5px rgba(255, 255, 255, 0.3)",
                                            "0px 0px 15px rgba(255, 255, 255, 0.6)",
                                            "0px 0px 5px rgba(255, 255, 255, 0.3)"
                                        ]
                                    }}
                                    transition={{
                                        opacity: { duration: 0.6, delay: index * 0.1 },
                                        rotateX: { duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 },
                                        y: {
                                            duration: 2 + (index * 0.2),
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.1 + 2
                                        },
                                        textShadow: {
                                            duration: 3 + (index * 0.1),
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.1 + 1
                                        }
                                    }}
                                    whileHover={{
                                        scale: 1.3,
                                        color: "#00B7B5",
                                        y: -10,
                                        textShadow: "0px 0px 20px rgba(0, 183, 181, 1)",
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.span>
                        {' '}

                        {/* PowerLink Ethiopia - Continuous animations */}
                        <motion.span
                            className="text-[#00B7B5] inline-block"
                            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                            animate={{
                                opacity: 1,
                                scale: [1, 1.05, 1],
                                rotateY: 0,
                                textShadow: [
                                    "0px 0px 10px rgba(0, 183, 181, 0.5)",
                                    "0px 0px 30px rgba(0, 183, 181, 1)",
                                    "0px 0px 50px rgba(0, 183, 181, 0.8)",
                                    "0px 0px 30px rgba(0, 183, 181, 1)",
                                    "0px 0px 10px rgba(0, 183, 181, 0.5)"
                                ]
                            }}
                            transition={{
                                opacity: { duration: 1.2, delay: translations[language].welcome.length * 0.1 + 0.3 },
                                rotateY: { duration: 1.2, delay: translations[language].welcome.length * 0.1 + 0.3, type: "spring", stiffness: 80 },
                                scale: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: translations[language].welcome.length * 0.1 + 2
                                },
                                textShadow: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: translations[language].welcome.length * 0.1 + 1.5
                                }
                            }}
                            whileHover={{
                                scale: 1.15,
                                textShadow: "0px 0px 40px rgba(0, 183, 181, 1)",
                                filter: "brightness(1.5)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.span
                                className="inline-block"
                                animate={{
                                    rotateZ: [0, 1, -1, 0],
                                    y: [0, -2, 0, 2, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: translations[language].welcome.length * 0.1 + 2
                                }}
                            >
                                PowerLink
                            </motion.span>
                            {' '}
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: [0, -8, 0],
                                    rotateZ: [0, -1, 1, 0]
                                }}
                                transition={{
                                    opacity: { duration: 0.8, delay: translations[language].welcome.length * 0.1 + 1 },
                                    x: { duration: 0.8, delay: translations[language].welcome.length * 0.1 + 1, type: "spring", stiffness: 120 },
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: translations[language].welcome.length * 0.1 + 3
                                    },
                                    rotateZ: {
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: translations[language].welcome.length * 0.1 + 2.5
                                    }
                                }}
                            >
                                Ethiopia
                            </motion.span>
                        </motion.span>

                        {/* Multiple decorative elements with continuous animations */}
                        <motion.span
                            className="absolute -top-6 -right-6 text-yellow-400 text-3xl"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                scale: [1, 1.3, 1],
                                rotate: [0, 360],
                                x: [0, 5, -5, 0],
                                y: [0, -3, 3, 0]
                            }}
                            transition={{
                                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 3 },
                                rotate: { duration: 8, repeat: Infinity, ease: "linear", delay: 2 },
                                x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3.5 },
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 4 }
                            }}
                        >
                            âš¡
                        </motion.span>

                        {/* Additional floating elements */}
                        <motion.span
                            className="absolute -top-2 -left-8 text-blue-400 text-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.8, 1.2, 0.8],
                                rotate: [0, -360],
                                x: [0, -3, 3, 0],
                                y: [0, 5, -5, 0]
                            }}
                            transition={{
                                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 4 },
                                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 4 },
                                rotate: { duration: 10, repeat: Infinity, ease: "linear", delay: 3 },
                                x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4.5 },
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 5 }
                            }}
                        >
                            ðŸ’¡
                        </motion.span>

                        <motion.span
                            className="absolute -bottom-4 right-12 text-green-400 text-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0.6, 1, 0.6],
                                scale: [1, 1.4, 1],
                                rotate: [0, 180, 360],
                                x: [0, 8, -8, 0],
                                y: [0, -6, 6, 0]
                            }}
                            transition={{
                                opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 5 },
                                scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 5 },
                                rotate: { duration: 12, repeat: Infinity, ease: "linear", delay: 4 },
                                x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 5.5 },
                                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 6 }
                            }}
                        >
                            ðŸ”‹
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto drop-shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: "easeOut"
                        }}
                    >
                        {translations[language].tagline}
                    </motion.p>

                    {/* Emergency Badge */}
                    {/* <div className="inline-flex bg-red-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-10 items-center shadow-xl border border-red-400 animate-fade-in-up [animation-delay:400ms]">
                        <AlertTriangle className="text-yellow-300 mr-3" size={24} />
                        <span className="font-bold text-lg">{translations[language].emergency}</span>
                    </div> */}

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.6,
                            ease: "easeOut"
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/login" className="px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-2xl transform transition-all text-lg">
                                {translations[language].custLogin}
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/register" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-xl hover:bg-white/20 font-bold transform transition-all text-lg">
                                {translations[language].newReg}
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/outage-map" className="px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold shadow-2xl flex items-center transform transition-all text-lg">
                                <MapPin className="mr-2" /> {translations[language].outageMap}
                            </Link>
                        </motion.div>
                    </motion.div>
                    </div>
                </div>

                {/* Announcement Card - Right Side */}
                <div className={`hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-in-out ${isAnnouncementsCollapsed ? 'w-12 h-12 overflow-hidden' : 'w-80 h-auto'}`} style={{ right: 'calc(50% + 1rem)' }}>
                    {isAnnouncementsCollapsed ? (
                        <button
                            onClick={() => setIsAnnouncementsCollapsed(false)}
                            className="bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all animate-bounce flex items-center justify-center"
                            title={translations[language].announcementTitle}
                        >
                            <Bell size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></span>
                        </button>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[500px] animate-fade-in-right">
                            <div className="p-4 bg-blue-600/30 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-white">
                                    <Bell size={20} className="animate-pulse" />
                                    <h2 className="font-bold text-lg">{translations[language].announcementTitle}</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                                    <button
                                        onClick={() => setIsAnnouncementsCollapsed(true)}
                                        className="text-white/60 hover:text-white transition-colors p-1"
                                    >
                                        <Minimize2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-y-auto p-4 space-y-4 scrollbar-hide flex-1">
                                {loading ? (
                                    <div className="text-center text-white/60 py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/60 mx-auto mb-2"></div>
                                        <p className="text-sm">Loading announcements...</p>
                                    </div>
                                ) : error ? (
                                    <div className="text-center text-red-400 py-8">
                                        <AlertTriangle size={24} className="mx-auto mb-2" />
                                        <p className="text-sm">{error}</p>
                                        <button 
                                            onClick={refetch}
                                            className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
                                        >
                                            Try again
                                        </button>
                                    </div>
                                ) : announcements.length === 0 ? (
                                    <div className="text-center text-white/60 py-8">
                                        <Bell size={24} className="mx-auto mb-2" />
                                        <p className="text-sm">No announcements available</p>
                                    </div>
                                ) : (
                                    announcements.map((announcement) => (
                                        <div key={announcement.id} className="group p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/10 cursor-default">
                                            <div className="flex items-start space-x-3">
                                                <div className={`mt-1 p-1.5 rounded-lg ${
                                                    announcement.type === 'error' || announcement.type === 'warning' 
                                                        ? 'bg-red-500/20 text-red-500' 
                                                        : announcement.type === 'warning' 
                                                        ? 'bg-amber-500/20 text-amber-500' 
                                                        : 'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                    {announcement.type === 'error' || announcement.type === 'warning' ? (
                                                        <AlertTriangle size={14} />
                                                    ) : announcement.type === 'warning' ? (
                                                        <Wrench size={14} />
                                                    ) : (
                                                        <Info size={14} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-semibold text-sm truncate">{announcement.title}</h3>
                                                    <p className="text-gray-300 text-xs mt-1 line-clamp-3 leading-relaxed">
                                                        {announcement.content}
                                                    </p>
                                                    <div className="flex items-center mt-2 text-[10px] text-gray-400">
                                                        <Calendar size={10} className="mr-1" />
                                                        {announcement.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-white/10 bg-white/5">
                                <button className="w-full py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center justify-center space-x-1">
                                    <span>{translations[language].viewAll}</span>
                                    <ChevronDown size={14} className="-rotate-90" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Announcement Section - At the bottom of Hero */}
                <div className="lg:hidden w-full mt-12 px-2 animate-fade-in-up [animation-delay:1000ms]">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                        <div className="p-3 bg-blue-600/30 border-b border-white/10 flex items-center justify-between text-white">
                            <div className="flex items-center space-x-2">
                                <Bell size={18} />
                                <h2 className="font-bold text-sm">{translations[language].announcementTitle}</h2>
                            </div>
                            <button
                                onClick={() => setIsAnnouncementsCollapsed(!isAnnouncementsCollapsed)}
                                className="text-white/60 hover:text-white transition-colors p-1"
                            >
                                {isAnnouncementsCollapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                            </button>
                        </div>
                        {!isAnnouncementsCollapsed && (
                            <div className="flex overflow-x-auto p-3 gap-4 snap-x scrollbar-hide">
                                {loading ? (
                                    <div className="min-w-[280px] text-center text-white/60 py-8">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/60 mx-auto mb-2"></div>
                                        <p className="text-xs">Loading...</p>
                                    </div>
                                ) : error ? (
                                    <div className="min-w-[280px] text-center text-red-400 py-8">
                                        <AlertTriangle size={20} className="mx-auto mb-2" />
                                        <p className="text-xs">{error}</p>
                                    </div>
                                ) : announcements.length === 0 ? (
                                    <div className="min-w-[280px] text-center text-white/60 py-8">
                                        <Bell size={20} className="mx-auto mb-2" />
                                        <p className="text-xs">No announcements</p>
                                    </div>
                                ) : (
                                    announcements.map((announcement) => (
                                        <div key={announcement.id} className="min-w-[280px] snap-center p-3 bg-white/5 rounded-xl border border-white/10">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-white font-semibold text-sm truncate">{announcement.title}</h3>
                                                <span className="text-[10px] text-gray-400">{announcement.date}</span>
                                            </div>
                                            <p className="text-gray-300 text-xs line-clamp-2">{announcement.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* About Section */}
            <About isDarkMode={isDarkMode} />

            {/* Services Section */}
            <Services isDarkMode={isDarkMode} />

            {/* Contact Section */}
            <Contact isDarkMode={isDarkMode} />

            {/* Footer */}
            <footer className={`${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white py-12 px-6 text-center`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-2xl font-bold mb-4">PowerLink Ethiopia</div>
                    <p className="text-gray-400 mb-6">{translations[language].footerTagline}</p>
                    <div className="border-t border-gray-800 pt-8 text-gray-500">
                        <p>Â© 2024 PowerLink Ethiopia â€¢ {translations[language].rights} â€¢ {translations[language].emergency} â€¢ support@powerlink.et</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;


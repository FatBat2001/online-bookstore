import { Link } from "react-router-dom"
import "../styling/style.css"

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-inner-container">
                <div className="px-6 pt-8">
                    <div className="section-1">
                        <Link to={"/dashboard/books/"} className="logo">
                            <svg className="svg-1 stroke-svg" version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="138.000000pt" height="138.000000pt" viewBox="0 0 138.000000 138.000000"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,138.000000) scale(0.100000,-0.100000)"
                                    fill="#000000" stroke="none">
                                    <path d="M277 1193 c-4 -3 -7 -156 -7 -338 l0 -332 62 -13 c113 -22 199 -83
246 -175 l21 -40 1 344 0 344 -31 48 c-39 61 -109 125 -162 150 -41 18 -117
26 -130 12z"/>
                                    <path d="M968 1175 c-73 -18 -176 -65 -255 -117 l-63 -40 0 -360 0 -359 47 36
c75 57 219 124 321 148 l92 22 0 342 0 343 -42 -1 c-24 0 -69 -7 -100 -14z"/>
                                    <path d="M102 723 l3 -376 250 -84 c340 -113 330 -113 670 0 l250 84 3 376 c1
208 -1 377 -5 377 -3 0 -21 -5 -40 -12 l-33 -12 -2 -340 -3 -340 -209 -68
c-192 -61 -214 -66 -253 -58 -27 6 -59 7 -84 1 -37 -8 -45 -6 -102 28 -78 48
-178 88 -284 114 l-83 20 0 322 0 321 -33 12 c-18 7 -37 12 -40 12 -4 0 -6
-169 -5 -377z"/>
                                </g>
                            </svg>
                        </Link>
                        <Link to={-1} className="search-button">
                            <svg className="svg-2 stroke-svg stroke-gray-300" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.25 6.75L4.75 12L10.25 17.25" />
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.25 12H5" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="px-6 pt-4">
                    <hr className="hr-1" />
                </div>
                <div className="px-6 pt-4">
                    <ul className="sidebar-menu">
                        <li className>
                            <div className="sidebar-menu-item">
                                <div className="sidebar-menu-item-custom">
                                    <div className="container-svg">
                                        <svg className="svg-1 stroke-svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9.25H13.75V5" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 15.25H14.25" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 12.25H14.25" />
                                        </svg>
                                    </div>
                                    <Link to={"books/"} className="itemLink w-100">Books</Link>
                                </div>
                            </div>
                            <div className="dropdown-container">
                                <ul className="sidebar-dropdown">
                                    <li>
                                        <Link to={"books/add_book"} className="sidebar-dropdown-item">Add Book</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className>
                            <div className="sidebar-menu-item">
                                <div className="sidebar-menu-item-custom">
                                    <div className="container-svg">
                                        <svg className="svg-1 stroke-svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9.25H13.75V5" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 15.25H14.25" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 12.25H14.25" />
                                        </svg>
                                    </div>
                                    <Link to={"/dashboard/borrowReq/"} className="itemLink w-100">Borrows Request</Link>
                                </div>
                            </div>
                            <div className="dropdown-container">
                                <ul className="sidebar-dropdown">
                                    <li>
                                        <Link to={"borrowReq/history"} className="sidebar-dropdown-item">Borrows History</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className>
                            <div className="sidebar-menu-item">
                                <div className="sidebar-menu-item-custom">
                                    <div className="container-svg">
                                        <svg className="svg-1 stroke-svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9.25H13.75V5" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 15.25H14.25" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 12.25H14.25" />
                                        </svg>
                                    </div>
                                    <Link to={"/dashboard/accountReq/"} className="itemLink w-100">Accounts Request</Link>
                                </div>
                            </div>
                            <div className="dropdown-container">
                                <ul className="sidebar-dropdown">
                                    <li>
                                        <Link to={"accountReq/history"} className="sidebar-dropdown-item">Accounts History</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="px-6 pt-8">
                    <hr className="hr-1" />
                </div>
            </div>
        </div>

    )
}

export default Sidebar

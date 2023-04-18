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
                                    <Link to={"books/"} className="itemLink">Books</Link>
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
                                    <a href="#" className="itemLink">Borrow Requests</a>
                                </div>
                            </div>
                            <div className="dropdown-container">
                                <ul className="sidebar-dropdown">
                                    <li>
                                        <a href="#" className="sidebar-dropdown-item">Requests History</a>
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
                                    <a href="#" className="itemLink">Accounts Requests</a>
                                </div>
                            </div>
                            <div className="dropdown-container">
                                <ul className="sidebar-dropdown">
                                    <li>
                                        <a href="#" className="sidebar-dropdown-item">Accounts History</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="px-6 pt-8">
                    <hr className="hr-1" />
                </div>
                <div className="px-6 pt-4 pb-8">
                    <ul className="list-type-none">
                        <li className="sidebar-menu-item">
                            <div className="container-svg">
                                <svg className="svg-1 stroke-svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.1191 5.61336C13.0508 5.11856 12.6279 4.75 12.1285 4.75H11.8715C11.3721 4.75 10.9492 5.11856 10.8809 5.61336L10.7938 6.24511C10.7382 6.64815 10.4403 6.96897 10.0622 7.11922C10.006 7.14156 9.95021 7.16484 9.89497 7.18905C9.52217 7.3524 9.08438 7.3384 8.75876 7.09419L8.45119 6.86351C8.05307 6.56492 7.49597 6.60451 7.14408 6.9564L6.95641 7.14408C6.60452 7.49597 6.56492 8.05306 6.86351 8.45118L7.09419 8.75876C7.33841 9.08437 7.3524 9.52216 7.18905 9.89497C7.16484 9.95021 7.14156 10.006 7.11922 10.0622C6.96897 10.4403 6.64815 10.7382 6.24511 10.7938L5.61336 10.8809C5.11856 10.9492 4.75 11.372 4.75 11.8715V12.1285C4.75 12.6279 5.11856 13.0508 5.61336 13.1191L6.24511 13.2062C6.64815 13.2618 6.96897 13.5597 7.11922 13.9378C7.14156 13.994 7.16484 14.0498 7.18905 14.105C7.3524 14.4778 7.3384 14.9156 7.09419 15.2412L6.86351 15.5488C6.56492 15.9469 6.60451 16.504 6.9564 16.8559L7.14408 17.0436C7.49597 17.3955 8.05306 17.4351 8.45118 17.1365L8.75876 16.9058C9.08437 16.6616 9.52216 16.6476 9.89496 16.811C9.95021 16.8352 10.006 16.8584 10.0622 16.8808C10.4403 17.031 10.7382 17.3519 10.7938 17.7549L10.8809 18.3866C10.9492 18.8814 11.3721 19.25 11.8715 19.25H12.1285C12.6279 19.25 13.0508 18.8814 13.1191 18.3866L13.2062 17.7549C13.2618 17.3519 13.5597 17.031 13.9378 16.8808C13.994 16.8584 14.0498 16.8352 14.105 16.8109C14.4778 16.6476 14.9156 16.6616 15.2412 16.9058L15.5488 17.1365C15.9469 17.4351 16.504 17.3955 16.8559 17.0436L17.0436 16.8559C17.3955 16.504 17.4351 15.9469 17.1365 15.5488L16.9058 15.2412C16.6616 14.9156 16.6476 14.4778 16.811 14.105C16.8352 14.0498 16.8584 13.994 16.8808 13.9378C17.031 13.5597 17.3519 13.2618 17.7549 13.2062L18.3866 13.1191C18.8814 13.0508 19.25 12.6279 19.25 12.1285V11.8715C19.25 11.3721 18.8814 10.9492 18.3866 10.8809L17.7549 10.7938C17.3519 10.7382 17.031 10.4403 16.8808 10.0622C16.8584 10.006 16.8352 9.95021 16.8109 9.89496C16.6476 9.52216 16.6616 9.08437 16.9058 8.75875L17.1365 8.4512C17.4351 8.05308 17.3955 7.49599 17.0436 7.1441L16.8559 6.95642C16.504 6.60453 15.9469 6.56494 15.5488 6.86353L15.2412 7.09419C14.9156 7.33841 14.4778 7.3524 14.105 7.18905C14.0498 7.16484 13.994 7.14156 13.9378 7.11922C13.5597 6.96897 13.2618 6.64815 13.2062 6.24511L13.1191 5.61336Z" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12Z" />
                                </svg>
                            </div>
                            <a href="#" className="itemLink">Settings</a>
                        </li>
                        <li className="sidebar-menu-item">
                            <div className="container-svg">
                                <svg className="svg-3 stroke-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                </svg>
                            </div>
                            <a href="#" className="itemLink">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar

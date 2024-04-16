// Libraries
import React from 'react'

// Components

// Styling
import './MainNav.scss'
import { IconGear, IconList, IconMessage, IconOpenFile, IconQuestionCircle, IconSignOut } from '../Utils/Icons'


function MainNav() {
	return (
		<div>
			{/* Mobile Menu */}
			<nav className="mobile_menu lg:hidden py-6 px-6 border-b">
				<div className="flex items-center justify-between">
					<button className="navbar-burger flex items-center rounded focus:outline-none">
						<svg className="text-white chatter_bg hover:chatter_input_hover block h-10 w-10 p-2 rounded" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</button>
				</div>
			</nav>

			{/* Regular Nav */}
			<div className="hidden lg:block navbar-menu relative z-50">
				<div className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-white border-r overflow-y-auto">
					<div className="flex items-center px-6 pb-6 mb-6 lg:border-b border-black-50 text-center">
						<a className="font-semibold chatter_text" href="#">
							Chatter.ai
						</a>
					</div>
					<div className="px-4 pb-6">
						<h3 className="mb-2 text-xs uppercase text-gray-500 font-medium text-start">CONVERSATIONS</h3>
						<ul className="mb-8 text-sm font-medium">

							<li>
								<a className="flex items-center pl-3 py-3 pr-4 text-white chatter_bg rounded" href="#">
									<span className="inline-block mr-3 h-4 w-4">
										<IconMessage/>
									</span>
									<span>Dashboard</span>
								</a>
							</li>	
						</ul>

						<h3 className="mb-2 text-xs uppercase text-gray-500 font-medium text-start">Secondary</h3>
						<ul className="text-sm font-medium">
							<li>
								<a className="flex items-center pl-3 py-3 pr-2 text-gray-500 hover:chatter_hover rounded" href="#">
									<span className="inline-block mr-3">
										<IconQuestionCircle/>
									</span>
									<span>Support Center</span>
								</a>
							</li>
							<li>
								<a className="flex items-center pl-3 py-3 pr-4 text-gray-500 hover:chatter_hover rounded" href="#">
									<span className="inline-block mr-3">
										<IconOpenFile/>
									</span>
									<span>File Manager</span>
								</a>
							</li>
							<li>
								<a className="flex items-center pl-3 py-3 pr-4 text-gray-500 hover:chatter_hover rounded" href="#">
									<span className="inline-block mr-3">
										<IconList/>
									</span>
									<span>Data List</span>
								</a>
							</li>
						</ul>

						<div className="pt-8 text-sm font-medium">
							<a className="flex items-center pl-3 py-3 pr-2 text-gray-500 hover:chatter_hover rounded" href="#">
								<span className="inline-block mr-4">
									<IconGear/>
								</span>
								<span>Settings</span>
							</a>
							<a className="flex items-center pl-3 py-3 pr-2 text-gray-500 hover:chatter_hover rounded" href="#">
								<span className="inline-block mr-4">
									<IconSignOut className='text-gray-500'/>
								</span>
								<span>Log Out</span>
							</a>
						</div>
					</div>
				</nav>
			</div>
			<div className="mx-auto lg:ml-80"></div>
		</div>
	)
}
export default MainNav
import { FaUser, FaUsers, FaCalendarAlt, FaSearch, FaBell, FaComments } from 'react-icons/fa';
import { MdOutlineGroup } from 'react-icons/md';

export default function Sidebar() {
  return (
    <aside className="bg-surface text-white w-64 h-screen p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm text-muted mb-2">COMMUNITIES</h2>
          <div className="space-y-2">
            <button className="w-full text-left hover:text-accent">Valorant LFG</button>
            <button className="w-full text-left hover:text-accent">TH Ignition</button>
            <button className="w-full text-left hover:text-accent">Discover</button>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-muted mb-2">COMPETITIVE</h2>
          <div className="space-y-2">
            <a href="/scrims" className="flex items-center gap-2 hover:text-accent">
              <MdOutlineGroup /> Scrims
            </a>
            <a href="/teams" className="flex items-center gap-2 hover:text-accent">
              <FaUsers /> Teams & Players
            </a>
            <a href="/calendar" className="flex items-center gap-2 hover:text-accent">
              <FaCalendarAlt /> Calendars
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-muted mb-2">UTILITIES</h2>
          <div className="space-y-2">
            <a href="/search" className="flex items-center gap-2 hover:text-accent">
              <FaSearch /> Search
            </a>
            <a href="/notifications" className="flex items-center gap-2 hover:text-accent">
              <FaBell /> Notifications
            </a>
            <a href="/chats" className="flex items-center gap-2 hover:text-accent">
              <FaComments /> Chats
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <a href="/profile" className="flex items-center gap-2 hover:text-accent">
          <FaUser /> Me
        </a>
        <a href="/teams/settings" className="flex items-center gap-2 hover:text-accent">
          <FaUsers /> Chiz Borger Academy
        </a>
      </div>
    </aside>
  );
}

import ProfileHero from './components/ProfileHero'
import ProfileNavTabs from './components/ProfileNavTabs'
import FeaturedWork from './components/FeaturedWork'
import Skills from './components/Skills'
import TopSkills from './components/TopSkills'
import Badges from './components/Badges'
import SettingsSections from './components/SettingsSections'

const Settings = () => {
  return (
    <div className="flex flex-col space-y-8 bg-gray-50/50 min-h-full p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Hero Profile Banner & Information */}
      <ProfileHero />

      {/* Profile Navigation Tabs */}
      <ProfileNavTabs />

      {/* Featured Work, Skills & Sidebar Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Featured Work & Skills */}
        <div className="lg:col-span-2 space-y-8">
          <FeaturedWork />
          <Skills />
        </div>

        {/* Right Section: Top Skills & Badges */}
        <div className="lg:col-span-1 space-y-6">
          <TopSkills />
          <Badges />
        </div>
      </div>

      {/* Dashboard Settings Options */}
      <SettingsSections />
    </div>
  )
}

export default Settings

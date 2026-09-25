import homeIcon from '@/shared/assets/icons/home.svg'
import AddVideoIcon from '@/shared/assets/icons/arrow-top.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import YourVideosIcon from '@/shared/assets/icons/your-videos.svg'

const linkItems = [
  {
    title: 'Home',
    href: '/',
    linkIcon: homeIcon,
  },

  {
    title: 'Add video',
    href: '/editor/addVideo',
    linkIcon: AddVideoIcon,
  },

  {
    title: 'Profile',
    href: '/profile/123',
    linkIcon: ProfileIcon,
  },

  {
    title: 'Your videos',
    href: '/myVideos',
    linkIcon: YourVideosIcon,
  },
]

export default linkItems
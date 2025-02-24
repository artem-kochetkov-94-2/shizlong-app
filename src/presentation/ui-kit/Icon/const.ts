import { ReactComponent as FavoriteIcon } from './assets/favorite.svg';
import { ReactComponent as FavoriteOutlineIcon } from './assets/favorite-outline.svg';
import { ReactComponent as ProfileIcon } from './assets/profile.svg';
import { ReactComponent as TimeIcon } from './assets/time.svg';
import { ReactComponent as StarIcon } from './assets/star.svg';
import { ReactComponent as LocationIcon } from './assets/location.svg';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as FilterIcon } from './assets/filter.svg';
import { ReactComponent as QRCodeIcon } from './assets/qr-code.svg';
import { ReactComponent as RouteIcon } from './assets/route.svg';
import { ReactComponent as ArrowLeftIcon } from './assets/arrow-left.svg';
import { ReactComponent as ArrowBottomIcon } from './assets/arrow-bottom.svg';
import { ReactComponent as CrossIcon } from './assets/cross.svg';
import { ReactComponent as SettingsIcon } from './assets/settings.svg';
import { ReactComponent as AbonementIcon } from './assets/abonement.svg';
import { ReactComponent as BellIcon } from './assets/bell.svg';
import { ReactComponent as ProfileCircleIcon } from './assets/profile-circle.svg';
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as ArrowRightIcon } from './assets/arrow-right.svg';
import { IconName } from './types';

export const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  favorite: FavoriteIcon,
  'favorite-outline': FavoriteOutlineIcon,
  profile: ProfileIcon,
  time: TimeIcon,
  star: StarIcon,
  location: LocationIcon,
  calendar: CalendarIcon,
  search: SearchIcon,
  filter: FilterIcon,
  'qr-code': QRCodeIcon,
  route: RouteIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-bottom': ArrowBottomIcon,
  cross: CrossIcon,
  settings: SettingsIcon,
  abonement: AbonementIcon,
  bell: BellIcon,
  'profile-circle': ProfileCircleIcon,
  card: CardIcon,
  'arrow-right': ArrowRightIcon,
};

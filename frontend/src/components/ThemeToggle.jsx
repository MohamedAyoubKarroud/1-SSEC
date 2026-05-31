import { useTheme } from '../hooks/useTheme.js';
import { Icon } from './icons.jsx';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Activer le mode clair' : 'Activer le mode sombre';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {isDark ? <Icon.Sun /> : <Icon.Moon />}
    </button>
  );
}

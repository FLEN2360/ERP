import { cn } from '@/lib/utils';

interface KeyProps extends Omit<React.ComponentProps<'kbd'>, 'children'> {
  code: string;
}

const keyMap: Record<string, string> = {
  Shift: '⇧',
  Ctrl: '⌃',
  Alt: '⌥',
  Meta: '⌘',
  Enter: '↵',
  Backspace: '⌫',
  Delete: '⌦',
  ArrowLeft: '←',
  ArrowRight: '→',
  ArrowUp: '↑',
  ArrowDown: '↓',
  PageUp: '⇞',
  PageDown: '⇟',
  Home: '↖',
  End: '↘',
  Tab: '⇥',
  Escape: 'ESC',
  Space: '␣',
  CapsLock: '⇪',
  ScrollLock: '⇨',
  NumLock: '⇥',
  PrintScreen: '⇲',
  Pause: '⏸',
  Insert: '↩',
};

export const Key: React.FC<KeyProps> = ({ code, className, ...props }) => {
  return (
    <kbd
      className={cn(`
        grid h-5 min-w-5 place-items-center rounded border border-b-2
        bg-current/4 px-1 text-xs leading-0 font-medium opacity-80
      `, className)}
      {...props}
    >
      {keyMap[code] ?? code}
    </kbd>
  );
};
Key.displayName = 'Key';

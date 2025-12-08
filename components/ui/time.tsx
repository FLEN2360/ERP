import moment from 'moment';

import 'moment/locale/zh-tw';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

moment.locale('zh-TW');

interface TimeProps extends Exclude<React.ComponentProps<'time'>, 'dateTime' | 'children'> {
  value: moment.MomentInput;
  format?: string;
  relative?: boolean;
  tooltip?: boolean;
};

export const Time: React.FC<TimeProps> = ({ value, format = 'YYYY/MM/DD HH:mm:ss', relative = false, tooltip = true, className, ...props }) => {
  const time = moment(value);

  const element = (
    <time
      data-slot="time"
      dateTime={time.toISOString()}
      className={cn(tooltip && 'underline decoration-dashed underline-offset-2', className)}
      {...props}
    >
      {relative ? time.fromNow() : time.format(format)}
    </time>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {element}
        </TooltipTrigger>
        <TooltipContent>{time.toISOString()}</TooltipContent>
      </Tooltip>
    );
  }

  return element;
};

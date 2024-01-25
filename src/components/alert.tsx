import { Icon } from '@/components/icon';

type AlertProps = {
  message: string;
};

export const Alert = ({ message }: AlertProps) => {
  return (
    <div className=" pb-4 text-center">
      <div
        className="flex items-center rounded border border-red-400 bg-red-50 p-2 text-sm text-red-500 md:rounded-full"
        role="alert"
        data-testid="login-error"
      >
        <span className="mr-2 px-2 py-1">
          <Icon
            id={`icon-error`}
            sprite="/svg-sprites/icons.svg"
            aria-hidden="true"
            className="h-auto w-6"
          />
        </span>
        <span className="flex-auto text-left font-medium">{message}</span>
      </div>
    </div>
  );
};

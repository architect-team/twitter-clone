import { PropsWithChildren } from 'react';
import { classNames } from './utils';

export type PageHeaderProps = PropsWithChildren<{
  actions?: React.ReactNode;
  tabs?: [
    {
      name: string;
      href: string;
      current?: boolean;
    }
  ];
}>;

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <div
      className={classNames(
        'relative border-b border-gray-200 pb-5 px-4 sm:px-6 lg:px-8',
        props.tabs && props.tabs.length > 0 ? 'sm:pb-0' : ''
      )}
    >
      <div className="md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">
          {props.children}
        </h1>
        {props.actions && (
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            {props.actions}
          </div>
        )}
      </div>
      {props.tabs && props.tabs.length > 0 && (
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              defaultValue={props.tabs.find((tab) => tab.current)?.name}
            >
              {props.tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {props.tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import Ranking from './Ranking/Ranking';
import Schedule from './Schedule/Schedule';
import ToDoList from './ToDo/ToDoList';
import Button from '@/components/Button';
import SettingIcon from '@/icons/setting.svg';
import ExitIcon from '@/icons/exit.svg';
import GroupIcon from '@/icons/group.svg';

function page() {
  return (
    <div className="m-7">
      <div className="flex justify-between">
        <div className="flex pt-3 pl-2">
          <GroupIcon width={36} height={36} />
          <div className="pl-2 text-2xl font-bold">하얀마음109</div>
        </div>
        <div>
          <Button className="p-1 mb-3 mr-3 rounded-small bg-primary">
            <SettingIcon alt="settingIcon" width={36} height={36} />
          </Button>
          <Button className="p-1 mb-3 rounded-small bg-hover hover:bg-warning">
            <ExitIcon alt="settingIcon" width={36} height={36} />
          </Button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Ranking />
      </div>
      <div className="flex justify-between w-full h-[500px]">
        <Schedule />
        <ToDoList />
      </div>
    </div>
  );
}

export default page;

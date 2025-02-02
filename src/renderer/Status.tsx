import recordIcon from '../../assets/icon/record-icon.png';
import eyeIcon from  '../../assets/icon/sleep-icon.png';
import errorIcon from  '../../assets/icon/error-icon.png';
import watchIcon from  '../../assets/icon/watch-icon.png';
import savingIcon from '../../assets/icon/saving-icon.png';
import { useState, useEffect } from 'react';
import { AppStatus } from 'main/types';

type IconStyle = 'small' | 'big';

type StatusMessageObjectType = {
  title: string,
  style: IconStyle,
  icon: string,
};

const statusMessages: { [key: number]: StatusMessageObjectType } = {
  [AppStatus.WaitingForWoW]: { style: 'small', icon: eyeIcon,    title: 'Waiting for WoW to start' },
  [AppStatus.Recording]:     { style: 'big',   icon: recordIcon, title: 'Recording' },
  [AppStatus.InvalidConfig]: { style: 'small', icon: errorIcon,  title: 'Failed to launch, check config is valid' },
  [AppStatus.ReadyToRecord]: { style: 'small', icon: watchIcon,  title: 'Ready and waiting'},
  [AppStatus.SavingVideo]:   { style: 'small', icon: savingIcon, title: 'Saving video' },
};

export default function Status() {

  const [status, setStatus] = useState(AppStatus.WaitingForWoW);

  /**
   * Update status handler.
   */
   useEffect(() => {
    window.electron.ipcRenderer.on('updateStatus', (status) => {
      setStatus(status as AppStatus);
    });
  }, []);

  const message = statusMessages[status];

  return (
    <div id="status">
      <img id={ message.style + '-icon' } title={ message.title } alt="icon" src={ message.icon }/>
    </div>
  );
}
